import SelectMeal from './SelectMeal';

const VoucherMeal = () => {
  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Voucher for meal</h1>
      <SelectMeal />
    </div>
  );
};

export default VoucherMeal;
