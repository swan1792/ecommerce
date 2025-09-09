import React from "react";

const Modal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
        <h3 className="text-lg font-semibold mb-4">Notice</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
