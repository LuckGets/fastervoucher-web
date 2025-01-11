import { useState } from 'react';

const SaleDate = () => {
  const [saleDate, setSaleDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaleDate(e.target.value);
  };
  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="flex gap-10">
      <div className="flex w-1/2 flex-col gap-2">
        <h1>Sale Start Date</h1>
        <input
          type="date"
          value={saleDate}
          onChange={handleDateChange}
          className="rounded-full bg-[#D9D9D9] p-2"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-2">
        <h1>Sale End Date</h1>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDate}
          className="rounded-full bg-[#D9D9D9] p-2"
        />
      </div>
    </div>
  );
};

export default SaleDate;
