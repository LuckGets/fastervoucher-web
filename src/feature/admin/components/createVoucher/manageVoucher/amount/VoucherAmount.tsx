import { useState } from 'react';

const VoucherAmount = ({
  stockAmount,
  onChange,
}: {
  stockAmount: number | undefined;
  onChange: (value: number) => void;
}) => {
  const [amount, setAmount] = useState(stockAmount || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(value);
    onChange(value);
  };

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Stock amount</h1>
      <input
        type="number"
        className="rounded-full bg-[#D9D9D9] p-2"
        placeholder="Stock amount"
        value={amount}
        onChange={handleChange}
      />
    </div>
  );
};

export default VoucherAmount;
