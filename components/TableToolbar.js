export default function TableToolbar({ search, onSearch, columns, hiddenColumns, setHiddenColumns, onAdd }) {
    const toggleColumn = (col) => {
      setHiddenColumns((prev) =>
        prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
      );
    };
  
    return (
      <div className="flex justify-between mb-4 items-center gap-1">
        <div className="flex space-x-2">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
            className="p-2 border rounded"
          />
          <button onClick={onAdd} className="px-4 py-1 bg-green-500 text-white rounded">
            + Add User
          </button>
        </div>
        <div className="flex space-x-2">
          {columns.map((col) => (
            <button
              key={col}
              onClick={() => toggleColumn(col)}
              className={`px-2 py-1 border rounded ${hiddenColumns.includes(col) ? 'bg-gray-300' : 'bg-blue-100'}`}
            >
              {hiddenColumns.includes(col) ? `Show ${col}` : `Hide ${col}`}
            </button>
          ))}
        </div>
      </div>
    );
  }  