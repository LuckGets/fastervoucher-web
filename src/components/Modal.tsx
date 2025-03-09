import { X } from 'lucide-react';

interface ModalProps {
  handleCloseBtn: () => void;
  children: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ handleCloseBtn, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex max-h-[80vh] w-full max-w-[80vw] flex-col gap-3 overflow-x-auto rounded-lg bg-[#F7F3ED] p-6 shadow-lg">
        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-black"
          onClick={handleCloseBtn}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
