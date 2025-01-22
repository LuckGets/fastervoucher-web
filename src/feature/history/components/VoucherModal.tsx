import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import Qr from '../../../assets/pics/Qr-example.png';
import { CalendarDays, Clock3 } from 'lucide-react';

interface Voucher {
  no: string;
  isUse: boolean;
  expireDate: string;
  useDate?: string;
}

interface VoucherModalProps {
  voucher: Voucher;
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
      <DialogContent className="w-[90%] rounded-2xl bg-[#F7F3ED] py-12">
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="mx-8 text-xl">
            Premium Sushi & Seafood Buffet Dinner
          </DialogTitle>
          <h2 className="pt-4 text-lg font-semibold">ไทยเที่ยวไทย #71</h2>
          <DialogDescription>Promotion</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-center">The Emerald Coffee Shop</h1>
          <div className="h-56 w-56">
            <img src={Qr} alt="Qr-code" />
            {isExpired(voucher.expireDate) && (
              <div className="fixed inset-0 flex items-center justify-center bg-transparent">
                <div className="mt-12 rounded-xl border border-[#F87171] bg-[#F7F3ED] px-16 py-3 text-[#F87171] shadow-md">
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
            <h1>Voucher No: {voucher.no}</h1>
          </div>
          <div className="flex items-center justify-center gap-2 pt-8">
            <h1>Expire: </h1>
            <h1
              className={`flex items-center gap-1 ${isExpired(voucher.expireDate) ? 'text-[#F87171]' : ''}`}
            >
              <CalendarDays className="w-4" />
              {voucher.expireDate
                ? new Date(voucher.expireDate).toLocaleDateString('en-GB')
                : 'N/A'}
            </h1>
            <h1
              className={`flex items-center gap-1 ${isExpired(voucher.expireDate) ? 'text-[#F87171]' : ''}`}
            >
              <Clock3 className="w-4" />
              {voucher.expireDate
                ? new Date(voucher.expireDate).toLocaleTimeString([], {
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
