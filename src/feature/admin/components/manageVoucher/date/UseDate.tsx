import { useState } from 'react';

const UseDate = () => {
  const [useDate, setUseDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseDate(e.target.value);
  };
  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="flex gap-10">
      <div className="flex w-1/2 flex-col gap-2">
        <h1>Use Date Start</h1>
        <input
          type="date"
          value={useDate}
          onChange={handleDateChange}
          className="rounded-full bg-[#D9D9D9] p-2"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-2">
        <h1>Use Date End</h1>
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

export default UseDate;
