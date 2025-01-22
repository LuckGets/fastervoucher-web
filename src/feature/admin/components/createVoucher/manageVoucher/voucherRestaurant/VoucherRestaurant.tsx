/* eslint-disable react/prop-types */
import SelectRestaurant from './SelectRestaurant';

interface VoucherRestaurantProps {
  restaurant: string;
  onChange: (field: string, value: string) => void;
}

const VoucherRestaurant: React.FC<VoucherRestaurantProps> = ({
  restaurant,
  onChange,
}) => {
  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Voucher for the restaurant</h1>
      <SelectRestaurant restaurant={restaurant} onSelectRestaurant={onChange} />
    </div>
  );
};

export default VoucherRestaurant;
