import ChangePassForm from '../../../../../feature/user/components/ChangePassForm';
import { X } from 'lucide-react';

interface ChangPasswordProps {
  setChangeOpen: (open: boolean) => void;
}

const ChangPassword = ({ setChangeOpen }: ChangPasswordProps) => {
  const handleClose = () => {
    setChangeOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="flex w-[40%] flex-col rounded-xl bg-[#F7F3ED] p-4 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="flex h-8 w-8 items-center justify-center self-end rounded-full text-text hover:bg-[#D9D9D9]"
          onClick={handleClose}
        >
          <X />
        </button>
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Change Password
        </h2>
        <h3 className="text-center text-basicGray">
          Password Must contain at least 6 character
        </h3>
        <ChangePassForm />
      </div>
    </div>
  );
};

export default ChangPassword;
