import SaleDate from './SaleDate';
import UseDate from './UseDate';

const VoucherDate = ({
  startDate,
  endDate,
  useDateStart,
  useDateEnd,
  onChange,
}: {
  startDate: string | undefined;
  endDate: string | undefined;
  useDateStart: string | undefined;
  useDateEnd: string | undefined;
  onChange: (field: string, value: string | undefined) => void;
}) => {
  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <SaleDate startDate={startDate} endDate={endDate} onChange={onChange} />
      <UseDate
        useDateStart={useDateStart}
        useDateEnd={useDateEnd}
        onChange={onChange}
      />
    </div>
  );
};

export default VoucherDate;
