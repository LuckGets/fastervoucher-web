import SelectRestaurant from './SelectRestaurant';

const VoucherRestaurant = () => {
  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Voucher for the restaurant</h1>
      <SelectRestaurant />
    </div>
  );
};

export default VoucherRestaurant;
