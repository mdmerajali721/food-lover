import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full z-10 p-4">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>

        {/* Modal Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
