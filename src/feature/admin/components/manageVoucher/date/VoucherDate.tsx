import SaleDate from './SaleDate';
import UseDate from './UseDate';

const VoucherDate = () => {
  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <SaleDate />
      <UseDate />
    </div>
  );
};

export default VoucherDate;
