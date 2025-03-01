import React from "react";

function ApproveConfirmationAlert({
                                      showConfirm,
                                      setShowConfirm,
                                      approveId,
                                      setApproveId,
                                      closing,
                                      setClosing,
                                      onConfirm
                                  }) {
    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setShowConfirm(false);
            setClosing(false);
            setApproveId(null);
        }, 400);
    };

    return (
        showConfirm && (
            <div
                className="fixed inset-0 bg-opacity-30 flex items-start justify-center z-50 pt-4"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        handleClose();
                    }
                }}
            >
                <div className={`bg-gradient-to-br from-green-800 to-emerald-900/80 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 w-11/12 max-w-md ${closing ? 'transform -translate-y-full' : 'transform translate-y-0'} transition-transform duration-400 ease-in-out relative overflow-hidden`}>
                    {/* Close Button (X) */}
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-gray-300 hover:text-white p-1 hover:bg-gray-700/50 rounded-full transition-all duration-300 backdrop-blur-sm"
                    >
                        <span className="text-lg">×</span>
                    </button>

                    {/* Checkmark Icon (for approval) */}
                    <div className="flex justify-center mb-4 pt-4">
                        <svg
                            className="w-10 h-10 text-green-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    {/* Confirmation Text */}
                    <h3 className="text-lg font-semibold text-white text-center mb-6 px-4">
                        Are you sure you want to approve this report?
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
                            className="px-4 py-2 bg-green-600/80 text-white rounded-full hover:bg-green-700/80 transition-all duration-300 backdrop-blur-sm shadow-md"
                        >
                            Yes, I'm sure
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default ApproveConfirmationAlert;