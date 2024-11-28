import { X } from 'lucide-react';
import VoucherCost from './VoucherCost';

interface VoucherDetailsProps {
  onClose: () => void;
}

const VoucherDetails = ({ onClose }: VoucherDetailsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-4 flex w-full max-w-xl flex-col items-center rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-2 top-2 text-xl font-bold text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 md:w-7" />
        </button>
        <VoucherCost />
      </div>
    </div>
  );
};

export default VoucherDetails;
