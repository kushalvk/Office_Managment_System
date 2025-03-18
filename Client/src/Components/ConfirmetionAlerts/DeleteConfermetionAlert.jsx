import React from "react";

function DeleteConfirmationAlert({
                                     showConfirm,
                                     setShowConfirm,
                                     deleteId,
                                     setDeleteId,
                                     closing,
                                     setClosing,
                                     onConfirm
                                 }) {
    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setShowConfirm(false);
            setClosing(false);
            setDeleteId(null);
        }, 400);
    };

    return (
        showConfirm && (
            <div
                className="fixed inset-0 bg-opacity-30 flex items-start justify-center z-50 pt-4"
                onClick={(e) => {
                    // Close the modal if clicking outside the modal content
                    if (e.target === e.currentTarget) {
                        handleClose();
                    }
                }}
            >
                <div className={`bg-gradient-to-br from-gray-800 to-indigo-900/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10 w-11/12 max-w-md ${closing ? 'transform -translate-y-full' : 'transform translate-y-0'} transition-transform duration-400 ease-in-out relative overflow-hidden`}>
                    {/* Close Button (X) */}
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-gray-300 hover:text-white p-1 hover:bg-gray-700/50 rounded-full transition-all duration-300 backdrop-blur-sm"
                    >
                        <span className="text-lg">×</span>
                    </button>

                    {/* Trash Icon */}
                    <div className="flex justify-center mb-4 pt-4">
                        <svg
                            className="w-10 h-10 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </div>

                    {/* Confirmation Text */}
                    <h3 className="text-lg font-semibold text-white text-center mb-6 px-4">
                        Are you sure you want to delete this Data?
                    </h3>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 pb-4">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-500/80 text-white rounded-full hover:bg-gray-600/80 transition-all duration-300 backdrop-blur-sm shadow-md"
                        >
                            No, cancel
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                handleClose();
                            }}
                            className="px-4 py-2 bg-red-600/80 text-white rounded-full hover:bg-red-700/80 transition-all duration-300 backdrop-blur-sm shadow-md"
                        >
                            Yes, I'm sure
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default DeleteConfirmationAlert;