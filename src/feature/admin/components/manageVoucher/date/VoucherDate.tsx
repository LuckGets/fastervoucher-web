import SaleDate from './SaleDate';
import UseDate from './UseDate';

const VoucherDate = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <SaleDate />
      <UseDate />
    </div>
  );
};

export default VoucherDate;
