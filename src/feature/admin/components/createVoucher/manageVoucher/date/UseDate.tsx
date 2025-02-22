const UseDate = ({
  useDateStart,
  useDateEnd,
  onChange,
}: {
  useDateStart: string | undefined;
  useDateEnd: string | undefined;
  onChange: (field: string, value: string | undefined) => void;
}) => {
  const handleUseDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('usableAt', e.target.value || undefined);
  };

  const handleUseDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('usableExpiredAt', e.target.value || undefined);
  };

  return (
    <div className="flex gap-10">
      <div className="flex w-1/2 flex-col gap-2">
        <h1>Use Date Start</h1>
        <input
          type="date"
          value={useDateStart || ''}
          onChange={handleUseDateStartChange}
          className="rounded-full bg-[#D9D9D9] p-2"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-2">
        <h1>Use Date End</h1>
        <input
          type="date"
          value={useDateEnd || ''}
          onChange={handleUseDateEndChange}
          className="rounded-full bg-[#D9D9D9] p-2"
        />
      </div>
    </div>
  );
};

export default UseDate;
