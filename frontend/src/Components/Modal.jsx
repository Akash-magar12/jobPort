/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-lg w-full max-w-xl mx-4 p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
