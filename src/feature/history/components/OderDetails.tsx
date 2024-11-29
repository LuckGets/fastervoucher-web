import { useState } from 'react';
import VoucherTicket from './VoucherTicket';

interface Voucher {
  no: string;
  isUse: boolean;
  expireDate: string;
  useDate?: string;
}

interface OrderDetailProps {
  orderDetail: {
    src: string;
    name: string;
    restaurant: string;
    quantity: number;
    free?: number;
    vouchers: Voucher[];
    freeVoucher?: Voucher[];
  };
}

const OrderDetails = ({ orderDetail }: OrderDetailProps) => {
  const [open, setOpen] = useState(false);

  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  const handleOnClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        onClick={handleOnClick}
        className="z-20 flex w-full cursor-pointer items-center space-x-4 rounded-2xl bg-[#E1E1E1] p-3"
      >
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={orderDetail.src}
            alt="pic"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 justify-between">
          <div className="flex flex-grow flex-col justify-center gap-2">
            <h1 className="text-sm text-text">
              {truncateText(orderDetail.name, 20)}
            </h1>
            <h1 className="text-xs text-basicGray">
              {truncateText(orderDetail.restaurant, 25)}
            </h1>
          </div>

          <div className="flex flex-col items-end gap-1 text-xs text-[#3F3F3F]">
            <p>X {orderDetail.quantity}</p>
            {orderDetail.free && <p>Free {orderDetail.free}</p>}
          </div>
        </div>
      </div>
      {open && (
        <VoucherTicket
          vouchers={orderDetail.vouchers}
          freeVouchers={orderDetail.freeVoucher} // Passing free vouchers
        />
      )}
    </>
  );
};

export default OrderDetails;
