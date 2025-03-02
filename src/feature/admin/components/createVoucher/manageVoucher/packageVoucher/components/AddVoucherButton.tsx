import { Plus } from 'lucide-react';

const AddVoucherToPackageButton = ({
  handleOnClick,
}: {
  handleOnClick: () => void;
}) => {
  return (
    <button
      onClick={handleOnClick}
      className="flex w-full items-center justify-center gap-2 rounded-full border bg-[#E1E1E1] p-2 pl-7 text-[#888888]"
    >
      <Plus className="h-5 w-5" />
      Add Voucher Free
    </button>
  );
};

export default AddVoucherToPackageButton;
