/* eslint-disable react/prop-types */
import { Voucher as Vouchers } from '@/stores/voucher-store';
import { ShoppingCart } from 'lucide-react';
import VoucherCost from './VoucherCost';
import VoucherDetail from './VoucherDetail';
import useSettingStore from '@/stores/setting-store';

interface VoucherProps {
  voucher: Vouchers;
}

const Voucher: React.FC<VoucherProps> = ({ voucher }) => {
  const { color } = useSettingStore();

  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#F7F3ED]">
      <div className="flex flex-col overflow-auto">
        <div className="p-4">
          <VoucherCost voucher={voucher} />
          <VoucherDetail voucher={voucher} />
        </div>
      </div>

      <div className="mt-auto w-full bg-[#F7F3ED] p-4 shadow-lg">
        <button
          style={bgColor}
          className="flex w-full items-center justify-center gap-4 rounded-lg p-2 text-white"
        >
          <ShoppingCart />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Voucher;
