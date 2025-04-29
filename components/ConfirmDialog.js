export default function ConfirmDialog({ onConfirm, onCancel }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-64 space-y-4 text-center">
          <p>Are you sure you want to delete?</p>
          <div className="flex justify-center space-x-4">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </div>
        </div>
      </div>
    );
  }  