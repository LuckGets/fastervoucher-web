import { CreateVoucherData } from '@/stores/voucher-store';

const SaleDate = ({
  startDate,
  endDate,
  onChange,
}: {
  startDate: string | undefined;
  endDate: string | undefined;
  onChange: (field: keyof CreateVoucherData, value: string | undefined) => void;
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('sellStartedAt', e.target.value || undefined);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('sellExpiredAt', e.target.value || undefined);
  };

  return (
    <div className="flex gap-10">
      <div className="flex w-1/2 flex-col gap-2">
        <h1>Sale Start Date</h1>
        <input
          type="date"
          value={startDate || ''}
          onChange={handleStartDateChange}
          className="rounded-full bg-[#D9D9D9] p-2"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-2">
        <h1>Sale End Date</h1>
        <input
          type="date"
          value={endDate || ''}
          onChange={handleEndDateChange}
          className="rounded-full bg-[#D9D9D9] p-2"
        />
      </div>
    </div>
  );
};

export default SaleDate;
