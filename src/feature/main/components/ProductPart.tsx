import { useState } from 'react';
import { RestaurantQueryFunc } from '@/api/restaurant/restaurant-query';
import { IGetManyVoucherQueryOption } from '@/api/voucher/voucher-query';
import { useQuery } from '@tanstack/react-query';
import { Restaurant } from '@/data-schema/restaurant.type';
import FilterRestaurant from './FilterRestaurant';
import { VoucherDataSchema } from '@/data-schema/voucher.type';
import HomePageVoucherWrapper from './HomePageVoucherList';
import Loading from '@/components/Loading';

export interface IVoucherListQueriesAndState
  extends IGetManyVoucherQueryOption {
  selectedVoucher: VoucherDataSchema['id'];
  restaurantName: Restaurant['name'];
}

const ALL_RESTAURANT = 'All';

const INIT_QUERY: IVoucherListQueriesAndState = {
  meal: '',
  restaurantId: '',
  selectedVoucher: '',
  restaurantName: ALL_RESTAURANT,
  page: 1,
};

const ProductWrapper: React.FC = () => {
  const [queries, setQueries] =
    useState<IVoucherListQueriesAndState>(INIT_QUERY);

  const handleSelectRestaurant = ({
    id,
    name,
  }: {
    id: Restaurant['id'];
    name: Restaurant['name'];
  }) => {
    setQueries((prev) => ({ ...prev, restaurantId: id, restaurantName: name }));
  };

  const {
    data: restaurantsAxiosData,
    isPending,
    isError,
    error,
  } = useQuery(RestaurantQueryFunc.getMany(1));

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    throw new Error(error?.message);
  }

  const { data: restaurants } = restaurantsAxiosData?.data || {};

  return (
    <>
      <FilterRestaurant
        defaultRestaurant={ALL_RESTAURANT}
        selectedRestaurant={queries.restaurantName}
        setSelectedRestaurant={handleSelectRestaurant}
        restaurants={restaurants ?? []}
      />
      <HomePageVoucherWrapper queries={queries} />
    </>
  );
};

export default ProductWrapper;
