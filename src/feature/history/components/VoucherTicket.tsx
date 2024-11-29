import { CalendarDays, Clock3 } from 'lucide-react';
import { useState } from 'react';
import VoucherModal from './VoucherModal';

interface Voucher {
  no: string;
  isUse: boolean;
  expireDate: string;
  useDate?: string;
}

interface VoucherWrapperProps {
  vouchers: Voucher[];
  freeVouchers?: Voucher[];
}

const VoucherTicket = ({ vouchers, freeVouchers }: VoucherWrapperProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const isExpired = (expireDate: string) => {
    const currentDate = new Date();
    const expirationDate = new Date(expireDate);
    return expirationDate < currentDate;
  };

  const handleOnClick = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setOpenModal(!openModal);
  };

  return (
    <div className="relative z-10 -mt-10 rounded-2xl border border-t-0 p-4">
      <div className="mt-10">
        {vouchers.map((voucher, index) => (
          <div
            key={index}
            className={`mb-4 flex justify-between border-b-2 p-2 text-xs`}
          >
            <div className="flex flex-col gap-1">
              <p>
                {index + 1}. Voucher No: {voucher.no}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between">
              {voucher.isUse ? (
                <div className="flex items-center gap-2 text-basicGray">
                  <h1 className="flex items-center gap-1">
                    <CalendarDays className="w-4" />
                    {voucher.useDate
                      ? new Date(voucher.useDate).toLocaleDateString()
                      : 'N/A'}
                  </h1>
                  <h1 className="flex items-center gap-1">
                    <Clock3 className="w-4" />
                    {voucher.useDate
                      ? new Date(voucher.useDate).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })
                      : 'N/A'}
                  </h1>
                </div>
              ) : (
                <button
                  onClick={() => handleOnClick(voucher)} // Pass the voucher to the handler
                  className={`rounded-full px-2 py-1 text-xs ${isExpired(voucher.expireDate) ? 'border bg-transparent text-gray-500' : 'bg-primary text-white'}`}
                  disabled={isExpired(voucher.expireDate)}
                >
                  {isExpired(voucher.expireDate) ? 'Expired' : 'Use Voucher'}
                </button>
              )}
            </div>
          </div>
        ))}

        {freeVouchers?.map((voucher, index) => (
          <div
            key={`free-${index}`}
            className={`flex justify-between p-2 text-xs ${index !== freeVouchers.length - 1 ? 'border-b-2' : ''}`}
          >
            <div className="flex flex-col gap-1">
              <p>Voucher Free: {voucher.no}</p>
            </div>

            <div className="flex flex-col items-end justify-between">
              {voucher.isUse ? (
                <div className="flex items-center gap-2 text-basicGray">
                  <h1 className="flex items-center gap-1">
                    <CalendarDays className="w-4" />
                    {voucher.useDate
                      ? new Date(voucher.useDate).toLocaleDateString()
                      : 'N/A'}
                  </h1>
                  <h1 className="flex items-center gap-1">
                    <Clock3 className="w-4" />
                    {voucher.useDate
                      ? new Date(voucher.useDate).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })
                      : 'N/A'}
                  </h1>
                </div>
              ) : (
                <button
                  onClick={() => handleOnClick(voucher)}
                  className={`rounded-full px-2 py-1 text-xs ${isExpired(voucher.expireDate) ? 'bg-[#E1E1E1] text-gray-500' : 'bg-primary text-white'}`}
                  disabled={isExpired(voucher.expireDate)}
                >
                  {isExpired(voucher.expireDate) ? 'Expired' : 'Use Voucher'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {openModal && selectedVoucher && (
        <VoucherModal
          voucher={selectedVoucher}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default VoucherTicket;