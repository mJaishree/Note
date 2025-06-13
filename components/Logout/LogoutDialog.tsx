import Loader from "../Loader/Loader";

interface LogoutDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function LogoutDialog({ isOpen, onConfirm, onCancel, loading = false }: LogoutDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Confirm Logout
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader size="sm" color="text-white" text="Logging out..." />
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
