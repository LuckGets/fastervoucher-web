import { useState } from 'react';
import { RestaurantQueryFunc } from '../../../api/restaurant/restaurant-query';
import { useQuery } from '@tanstack/react-query';
import { Restaurant } from '../../../data-schema/restaurant.type';
import FilterRestaurant from './FilterRestaurant';
import { VoucherDataSchema } from '../../../data-schema/voucher.type';
import { IGetManyProductQueriesOptions } from '../../../data-schema/product.type';
import HomePageProductList from './HomePageVoucherWrapper';
import VoucherLoading from '../../../components/VoucherLoading';
import FilterLoading from '../../../components/FilterLoading';

export interface IVoucherListQueriesAndState
  extends IGetManyProductQueriesOptions {
  selectedVoucher: VoucherDataSchema['id'];
  restaurantName: Restaurant['name'];
}

export interface HomePageProductListProps {
  queries: IVoucherListQueriesAndState;
}

const ALL_RESTAURANT = 'All';

const INIT_QUERY: IVoucherListQueriesAndState = {
  meal: '',
  restaurantId: '',
  selectedVoucher: '',
  restaurantName: ALL_RESTAURANT,
  page: 1,
};

// ----- COMPONENT ----- //
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
    return (
      <div className="mt-5">
        <FilterLoading />
        <VoucherLoading />
      </div>
    );
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
      <HomePageProductList queries={queries} />
    </>
  );
};

export default ProductWrapper;
