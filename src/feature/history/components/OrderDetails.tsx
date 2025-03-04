import { useState } from 'react';
import VoucherTicket from './VoucherTicket';
import { motion } from 'framer-motion';

export interface OrderItemDetail {
  id: string;
  qrcodeImagePath: string;
  code: string;
  usableAt: string;
  usableExpiredAt: string;
  redeemedAt: string | null;
  detail: {
    voucherId: string;
    title: string;
    price: number;
    category: string;
    img: string;
    package: {
      title: string;
      packageId: string;
      quotaVoucher: {
        id: string;
        deletedAt: string | null;
      };
    };
  } | null;
}

interface OrderDetailsProps {
  orderDetail: OrderItemDetail;
  voucher: number;
}

const OrderDetails = ({ orderDetail, voucher }: OrderDetailsProps) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text || text.length === 0) {
      return '';
    }
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleOnClick = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={() => handleOnClick(orderDetail?.id)}
        className="z-20 flex w-full cursor-pointer items-center space-x-4 rounded-2xl bg-[#E1E1E1] p-3"
      >
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={orderDetail?.detail?.img || 'https://placeholder.pics/svg/300'}
            alt="pic"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 justify-between">
          <div className="flex flex-grow flex-col justify-center gap-2">
            <h1 className="text-sm text-text">
              {truncateText(orderDetail?.detail?.title, 20) || 'Voucher'}
            </h1>
            <h1 className="text-xs text-basicGray">
              {truncateText(orderDetail?.detail?.category, 25) || 'Category'}
            </h1>
            {orderDetail.redeemedAt && (
              <p className="text-xs text-basicGray">
                Redeemed At:{' '}
                {new Date(orderDetail?.redeemedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-4 text-xs text-[#3F3F3F]">
            <p>X {voucher}</p>
          </div>
        </div>
      </motion.div>
      {openIndex === orderDetail.id && (
        <VoucherTicket
          openIndex={openIndex === orderDetail?.id ? 0 : null}
          orderDetail={orderDetail}
          voucher={voucher}
        />
      )}
    </>
  );
};

export default OrderDetails;
