import { Voucher as Vouchers } from '../../../../../../stores/voucher-store';
import Voucher from './Voucher';

interface VoucherExampleProps {
  voucher: Vouchers;
}

const VoucherExample: React.FC<VoucherExampleProps> = ({ voucher }) => {
  return (
    <div className="flex h-[1008px] w-[440px] flex-col overflow-hidden rounded-2xl border border-[#888888]">
      <Voucher voucher={voucher} />
    </div>
  );
};

export default VoucherExample;
