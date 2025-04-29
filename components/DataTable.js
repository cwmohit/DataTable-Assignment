import { useState, useEffect } from 'react';
import ModalForm from './ModalForm';
import ConfirmDialog from './ConfirmDialog';
import TableToolbar from './TableToolbar';
import { apiService } from '@/lib/apiService';

export default function DataTable() {
  const [data, setData] = useState([]);
  const [columns] = useState(["id", "name", "email"]);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0); // Keep track of the total number of items for pagination
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    try {
      const res = await apiService.get('users'); // Fetch all users data
      setData(res.data);
      setTotal(res.data.length); // Set total to the length of the full data
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered data based on search term
  const filteredData = data.filter((row) => {
    return columns.some((col) => {
      return row[col] && row[col].toString().toLowerCase().includes(search.toLowerCase());
    });
  });

  // Sorting the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0;
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate the sorted data
  const paginatedData = sortedData.slice((page - 1) * limit, page * limit);

  const handleDelete = async (id) => {
    try {
      await apiService.delete(`users/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting data:', err);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editData) {
        await apiService.put(`users/${editData.id}`, formData);
      } else {
        await apiService.post('users', formData);
      }
      setOpenForm(false);
      fetchData();
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };

  const toggleSort = (col) => {
    if (sortBy === col) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(col);
      setSortOrder('asc');
    }
  };

  const visibleColumns = columns.filter((col) => !hiddenColumns.includes(col));

  return (
    <div className="p-4">
      <TableToolbar
        search={search}
        onSearch={setSearch}
        columns={columns}
        hiddenColumns={hiddenColumns}
        setHiddenColumns={setHiddenColumns}
        onAdd={() => {
          setEditData(null);
          setOpenForm(true);
        }}
      />

      <table className="w-full border">
        <thead>
          <tr>
            {visibleColumns.map((col) => (
              <th
                key={col}
                onClick={() => toggleSort(col)}
                className="cursor-pointer p-2 border-b"
              >
                {col.toUpperCase()} {sortBy === col ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
              </th>
            ))}
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id}>
              {visibleColumns.map((col) => (
                <td key={col} className="p-2 border-b">{row[col]}</td>
              ))}
              <td className="p-2 border-b space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setEditData(row);
                    setOpenForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => setConfirmDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div className="px-4 py-2">Page {page}</div>
        <button
          disabled={(page * limit) >= total}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal for Create/Edit */}
      {openForm && (
        <ModalForm
          initialData={editData}
          onClose={() => setOpenForm(false)}
          onSave={handleSave}
        />
      )}

      {/* Confirm Dialog for Delete */}
      {confirmDelete && (
        <ConfirmDialog
          onConfirm={() => {
            handleDelete(confirmDelete);
            setConfirmDelete(null);
          }}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}