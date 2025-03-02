import { X } from 'lucide-react';

interface ModalProps {
  handleCloseBtn: () => void;
  children: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ handleCloseBtn, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-[30%] flex-col items-center gap-3 rounded-lg bg-[#F7F3ED] px-10 py-14 shadow-lg">
        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-black"
          onClick={handleCloseBtn}
        >
          <X />
          {children}
        </button>
      </div>
    </div>
  );
};

export default Modal;
