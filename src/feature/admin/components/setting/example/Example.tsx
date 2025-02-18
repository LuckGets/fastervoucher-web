import { useState } from 'react';
import Footer from './Footer';
import FilterRestaurant from '@/feature/main/components/FilterRestaurant';
import Voucher from './Voucher';
import Header from './Header';
import Carousel from './Carousel';
import { IVoucherListQueriesAndState } from '@/feature/main/components/ProductWrapper';
import Loading from '@/components/Loading';
import { RestaurantQueryFunc } from '@/api/restaurant/restaurant-query';
import { useQuery } from '@tanstack/react-query';
import { Restaurant } from '@/data-schema/restaurant.type';

const Example = () => {
  const ALL_RESTAURANT = 'All';

  const INIT_QUERY: IVoucherListQueriesAndState = {
    meal: '',
    restaurantId: '',
    selectedVoucher: '',
    restaurantName: ALL_RESTAURANT,
    page: 1,
  };

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
    <div className="flex h-[1008px] w-[440px] flex-col rounded-2xl border border-[#888888]">
      <Header />
      <main className="flex flex-grow flex-col gap-4">
        <Carousel />
        <FilterRestaurant
          defaultRestaurant={ALL_RESTAURANT}
          selectedRestaurant={queries.restaurantName}
          setSelectedRestaurant={handleSelectRestaurant}
          restaurants={restaurants ?? []}
        />
        <Voucher />
      </main>
      <Footer />
    </div>
  );
};

export default Example;
