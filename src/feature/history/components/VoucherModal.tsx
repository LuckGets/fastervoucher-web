import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Voucher Details</DialogTitle>
          <DialogDescription>Voucher No: {voucher.no}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div>
            <strong>Expire Date: </strong>
            {new Date(voucher.expireDate).toLocaleDateString()}
          </div>
          <div>
            <strong>Use Date: </strong>
            {voucher.useDate
              ? new Date(voucher.useDate).toLocaleDateString()
              : 'N/A'}
          </div>
          <div>
            <strong>Status: </strong>
            {voucher.isUse ? 'Used' : 'Not Used'}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherModal;
