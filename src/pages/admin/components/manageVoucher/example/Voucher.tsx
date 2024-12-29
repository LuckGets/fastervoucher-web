import { useParams } from 'react-router-dom';
import useVoucherStore from '@/stores/voucher-store';
import { ShoppingCart } from 'lucide-react';
import VoucherCost from './VoucherCost';
import VoucherDetail from './VoucherDetail';
import useSettingStore from '@/stores/setting-store';

const Voucher = () => {
  const { id } = useParams<{ id: string }>();
  const { color } = useSettingStore();
  const { vouchers } = useVoucherStore();
  const voucher = vouchers.find((v) => v.id === Number(id));

  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  if (!voucher) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-lg font-semibold">Voucher not found</h1>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#F7F3ED]">
      <div className="flex flex-col overflow-auto">
        <div className="p-4">
          <VoucherCost />
          <VoucherDetail />
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
