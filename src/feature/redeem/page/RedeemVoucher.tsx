import useSettingStore from '@/stores/setting-store';
import { CalendarDays, Clock3 } from 'lucide-react';

const RedeemVoucher = () => {
  const { color } = useSettingStore();
  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  return (
    <div className="mt-4 px-6">
      <h1 className="text-center text-xl font-semibold text-error">
        For Staff
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mx-4 mt-6 text-center text-2xl font-semibold">
          Premium Sushi & Seafood Buffet Dinner
        </h1>
        <h2 className="pt-4 text-xl font-semibold">ไทยเที่ยวไทย #71</h2>
        <h3 className="text-[#888888]">Promotion</h3>
        <h3 className="my-8 text-[#888888]">The Emerald Coffee Shop</h3>
      </div>
      <div className="my-9 flex items-center justify-center">
        <button
          className="flex w-[80%] items-center justify-center gap-4 rounded-full py-3 text-white"
          style={bgColor}
        >
          Redeem
        </button>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 py-8">
        <div>
          <h1>Order No: P49567945</h1>
        </div>
        <div>
          <h1>Voucher No: E2024BDN-080</h1>
        </div>
        <div className="flex items-center justify-center gap-2 pt-8">
          <h1>Expire: </h1>
          <h1 className={`flex items-center gap-1`}>
            <CalendarDays className="w-4" />
            30/12/2024
            {/* {voucher.expireDate
              ? new Date(voucher.expireDate).toLocaleDateString('en-GB')
              : 'N/A'} */}
          </h1>
          <h1 className={`flex items-center gap-1`}>
            <Clock3 className="w-4" />
            23:59
            {/* {voucher.expireDate
              ? new Date(voucher.expireDate).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
              : 'N/A'} */}
          </h1>
        </div>
      </div>
      <h1 className="mt-10 text-center text-xs text-[#F87171]">
        Note: Once the voucher is redeemed, it cannot be canceled.
      </h1>
    </div>
  );
};

export default RedeemVoucher;
