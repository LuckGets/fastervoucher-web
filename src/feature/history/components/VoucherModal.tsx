import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import Qr from '../../../assets/pics/Qr-example.png';
import { CalendarDays, Clock3 } from 'lucide-react';
import { OrderItemDetail } from './OrderDetails';

interface VoucherModalProps {
  voucher: OrderItemDetail;
  onClose: () => void;
}

const VoucherModal = ({ voucher, onClose }: VoucherModalProps) => {
  const isExpired = (expireDate: string) => {
    const currentDate = new Date();
    const expirationDate = new Date(expireDate);
    return expirationDate < currentDate;
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] w-[90%] overflow-y-auto rounded-2xl bg-[#F7F3ED] py-6">
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="mx-8 text-xl">
            {voucher?.detail?.title}
          </DialogTitle>
          <h2 className="pt-4 text-lg font-semibold">
            {voucher?.detail?.package?.title}
          </h2>
          <DialogDescription>Promotion</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-center">The Emerald Coffee Shop</h1>
          {!isExpired(voucher?.usableExpiredAt) && (
            <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-xl">
              <img
                src={voucher?.detail?.img}
                alt="pic"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="h-56 w-56 overflow-hidden rounded-xl">
            {voucher.qrcodeImagePath ? (
              <img
                src={
                  voucher?.qrcodeImagePath.startsWith('http')
                    ? voucher.qrcodeImagePath
                    : `https://${voucher.qrcodeImagePath}`
                }
                alt="QR-code"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = Qr;
                }}
              />
            ) : (
              <img
                src={Qr}
                alt="QR-code"
                className="h-full w-full object-contain"
              />
            )}
            {isExpired(voucher?.usableExpiredAt) && (
              <div className="fixed inset-0 flex items-center justify-center bg-transparent">
                <div className="mt-6 rounded-xl border border-[#F87171] bg-[#F7F3ED] px-16 py-3 text-[#F87171] shadow-md">
                  <h1 className="text-xl">Voucher expired</h1>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div>
            <h1>Order No: P49567945</h1>
          </div>
          <div>
            <h1 className="px-6 text-center">Voucher No: {voucher?.id}</h1>
          </div>
          <div className="flex items-center justify-center gap-2 pt-8">
            <h1>Expire: </h1>
            <h1
              className={`flex items-center gap-1 ${isExpired(voucher?.usableExpiredAt) ? 'text-[#F87171]' : ''}`}
            >
              <CalendarDays className="w-4" />
              {voucher?.usableExpiredAt
                ? new Date(voucher?.usableExpiredAt).toLocaleDateString('en-GB')
                : 'N/A'}
            </h1>
            <h1
              className={`flex items-center gap-1 ${isExpired(voucher?.usableExpiredAt) ? 'text-[#F87171]' : ''}`}
            >
              <Clock3 className="w-4" />
              {voucher?.usableExpiredAt
                ? new Date(voucher?.usableExpiredAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })
                : 'N/A'}
            </h1>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherModal;
