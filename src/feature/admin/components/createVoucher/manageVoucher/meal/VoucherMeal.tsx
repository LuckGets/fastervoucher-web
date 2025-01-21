/* eslint-disable react/prop-types */
import SelectMeal from './SelectMeal';

interface VoucherMealProps {
  meal: string;
  onChange: (field: string, value: string | number | unknown) => void;
}

const VoucherMeal: React.FC<VoucherMealProps> = ({ meal, onChange }) => {
  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Voucher for Meal</h1>
      <SelectMeal
        meal={meal}
        onSelectMeal={(field, value) => onChange(field, value)}
      />
    </div>
  );
};

export default VoucherMeal;
