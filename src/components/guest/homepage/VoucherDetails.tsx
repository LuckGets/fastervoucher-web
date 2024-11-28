import { ShoppingCart, X } from 'lucide-react';
import VoucherCost from './VoucherCost';
import VoucherTerm from './VoucherTerm';

interface VoucherDetailsProps {
  onClose: () => void;
}

const VoucherDetails = ({ onClose }: VoucherDetailsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-4 flex max-h-[80vh] w-full max-w-xl flex-col overflow-y-auto rounded-lg bg-white shadow-lg">
        <button
          className="absolute right-2 top-2 text-xl font-bold text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 md:w-7" />
        </button>
        <div className="p-6">
          <VoucherCost />
          <VoucherTerm />
        </div>
        <div className="sticky bottom-0 w-full bg-white p-4 shadow-lg">
          <button className="flex w-full items-center justify-center gap-4 rounded-lg bg-primary p-2 text-white">
            <ShoppingCart />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetails;
