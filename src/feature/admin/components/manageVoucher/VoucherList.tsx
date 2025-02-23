import { VoucherDataSchema } from '../../../../data-schema/voucher.type';
import { useNavigate } from 'react-router-dom';
import VoucherItem from './VoucherItem';

interface VoucherListProps {
  vouchers: VoucherDataSchema[];
}

const VoucherList: React.FC<VoucherListProps> = ({ vouchers }) => {
  const navigate = useNavigate();

  const handleVoucherClick = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <div className="grid w-full grid-cols-4 gap-4 px-6">
      {vouchers.map((voucher) => (
        <VoucherItem
          key={voucher.id}
          handleVoucherClick={handleVoucherClick}
          voucher={voucher}
        />
      ))}
    </div>
  );
};

export default VoucherList;
