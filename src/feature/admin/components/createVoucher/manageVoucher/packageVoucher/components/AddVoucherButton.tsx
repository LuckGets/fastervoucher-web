import { Plus } from 'lucide-react';

const AddVoucherToPackageButton = ({
  text,
  handleOnClick,
}: {
  text: string;
  handleOnClick: () => void;
}) => {
  return (
    <button
      onClick={handleOnClick}
      className="flex w-full items-center justify-center gap-2 rounded-full border bg-[#E1E1E1] p-2 pl-7 text-[#888888]"
    >
      <Plus className="h-5 w-5" />
      {text}
    </button>
  );
};

export default AddVoucherToPackageButton;
