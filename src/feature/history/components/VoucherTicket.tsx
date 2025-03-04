import { CalendarDays, Clock3 } from 'lucide-react';
import { useState } from 'react';
import VoucherModal from './VoucherModal';
import { motion, Variants } from 'framer-motion';
import { OrderItemDetail } from './OrderDetails';

interface VoucherWrapperProps {
  openIndex: number | null;
  orderDetail: OrderItemDetail;
  voucher: number;
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const VoucherTicket = ({
  openIndex,
  orderDetail,
  voucher,
}: VoucherWrapperProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] =
    useState<OrderItemDetail | null>(null);

  const isExpired = (expireDate: string) => {
    const currentDate = new Date();
    const expirationDate = new Date(expireDate);
    return expirationDate < currentDate;
  };

  const handleOnClick = (orderDetail: OrderItemDetail) => {
    console.log('click :>> ', orderDetail);
    setSelectedVoucher(orderDetail);
    setOpenModal(true);
  };

  return (
    <motion.div
      className="relative z-10 -mt-10 rounded-2xl border border-t-0 p-4"
      initial="closed"
      animate={openIndex !== null ? 'open' : 'closed'}
      style={{ pointerEvents: openIndex !== null ? 'auto' : 'none' }}
    >
      <div className="mt-10">
        <motion.div
          variants={itemVariants}
          className={`flex justify-between p-2 text-xs`}
        >
          <div className="flex flex-col gap-1">
            <p>
              {voucher}. Voucher No: {orderDetail?.id}
            </p>
          </div>

          <div className="flex flex-col items-end justify-between">
            {orderDetail?.redeemedAt !== null ? (
              <div className="flex items-center gap-2 text-basicGray">
                <h1 className="flex items-center gap-1">
                  <CalendarDays className="w-4" />
                  {orderDetail?.redeemedAt
                    ? new Date(orderDetail?.redeemedAt).toLocaleDateString(
                        'en-GB',
                      )
                    : 'N/A'}
                </h1>
                <h1 className="flex items-center gap-1">
                  <Clock3 className="w-4" />
                  {orderDetail?.redeemedAt
                    ? new Date(orderDetail?.redeemedAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                    : 'N/A'}
                </h1>
              </div>
            ) : (
              <button
                onClick={() => handleOnClick(orderDetail)}
                className={`ml-4 min-w-[90px] rounded-full px-2 py-1 text-xs ${
                  isExpired(orderDetail?.usableExpiredAt)
                    ? 'border bg-transparent text-gray-500'
                    : 'bg-primary text-white hover:bg-[#185639] active:bg-[#185639]'
                }`}
              >
                {isExpired(orderDetail?.usableExpiredAt)
                  ? 'Expired'
                  : 'Use Voucher'}
              </button>
            )}
          </div>
        </motion.div>
      </div>
      {openModal && selectedVoucher && (
        <VoucherModal
          voucher={selectedVoucher}
          onClose={() => setOpenModal(false)}
        />
      )}
    </motion.div>
  );
};

export default VoucherTicket;
