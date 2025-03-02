import { useState } from 'react';
import SearchVoucher from '../../feature/admin/components/manageVoucher/SearchVoucher';
import { useSuspenseQuery } from '@tanstack/react-query';
import { RestaurantQueryFunc } from '../../api/restaurant/restaurant-query';
import {
  IGetManyProductQueriesOptions,
  ProductSellDateQueryEnum,
} from '../../data-schema/product.type';
import FilterLoading from '@/components/FilterLoading';
import VoucherLoading from '@/components/VoucherLoading';
import { PaginationWithElipsis } from '@/components/PaginationWithElipsis';
import VoucherList from '../../feature/admin/components/manageVoucher/VoucherList';
import { useGetManyInfiniteProductQuery } from '@/api/products/product-query';

const defaultPage = 1;

type VouchersQueriesStateType = IGetManyProductQueriesOptions & {
  restaurant: string;
};

const VOUCHER_QUERIES: VouchersQueriesStateType = {
  meal: '',
  restaurantId: '',
  sellDate: ProductSellDateQueryEnum.ALL,
  restaurant: '',
  page: defaultPage,
};

const ManageVoucher = () => {
  const [voucherQueries, setVoucherQueries] =
    useState<VouchersQueriesStateType>(VOUCHER_QUERIES);

  const { data: restaurantsAxiosData } = useSuspenseQuery(
    RestaurantQueryFunc.getMany(),
  );

  const {
    data: vouchersListData,
    isPending,
    isError,
    error,
  } = useGetManyInfiniteProductQuery(voucherQueries);

  const { data: restaurantsList } = restaurantsAxiosData;

  const vouchers = vouchersListData?.pages?.flatMap((page) => page.data) || [];
  const totalPages = vouchersListData?.pages[0]?.totalPages;
  const setRestaurantQueries = (
    restaurantId: string,
    restaurantName: string,
  ) => {
    setVoucherQueries((prev) => ({
      ...prev,
      restaurantId: restaurantId,
      restaurant: restaurantName,
    }));
  };

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

  return (
    <div className="w-full">
      <SearchVoucher
        restaurants={restaurantsList.data}
        selectedRestaurant={voucherQueries.restaurant}
        setSelectedRestaurant={setRestaurantQueries}
      />
      <VoucherList products={vouchers} />
      {totalPages && (
        <PaginationWithElipsis
          totalPages={totalPages}
          onPageChanges={(page: number) =>
            setVoucherQueries((prev) => ({ ...prev, page }))
          }
        />
      )}
    </div>
  );
};

export default ManageVoucher;
