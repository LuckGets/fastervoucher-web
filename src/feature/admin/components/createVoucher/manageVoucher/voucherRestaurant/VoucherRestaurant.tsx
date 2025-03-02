import { useQuery } from '@tanstack/react-query';
import SelectRestaurant from './SelectRestaurant';
import { RestaurantQueryFunc } from '@/api/restaurant/restaurant-query';
import Loading from '@/components/Loading';

const VoucherRestaurant: React.FC = () => {
  const {
    data: restaurantsAxiosData,
    isPending,
    isError,
    error,
  } = useQuery(RestaurantQueryFunc.getMany());

  if (isPending) return <Loading />;

  if (isError) {
    let errorMsg = 'There is an error while fetching data.';
    if (error && error.message) errorMsg = error.message;
    throw new Error(errorMsg);
  }

  const { data: restaurants } = restaurantsAxiosData?.data || [];

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Voucher for the restaurant</h1>
      <SelectRestaurant restaurants={restaurants} />
    </div>
  );
};

export default VoucherRestaurant;
