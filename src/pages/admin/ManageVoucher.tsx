import { useEffect, useState } from 'react';
import SearchVoucher from '@/feature/admin/components/manageVoucher/SearchVoucher';
import useVoucherStore from '@/stores/voucher-store';
import { useSuspenseQueries } from '@tanstack/react-query';
import { RestaurantQueryFunc } from '@/api/restaurant/restaurant-query';
import {
  IGetManyVoucherQueryOption,
  VoucherQueryFunc,
  VoucherSellDateQueryEnum,
} from '@/api/voucher/voucher-query';
import VoucherList from '@/feature/admin/components/manageVoucher/VoucherList';

const defaultPage = 1;

type TVouchersQueriesState = IGetManyVoucherQueryOption & {
  restaurant: string;
};

const VOUCHER_QUERIES: TVouchersQueriesState = {
  meal: '',
  restaurantId: '',
  sellDate: VoucherSellDateQueryEnum.ALL,
  restaurant: '',
};

const ManageVoucher = () => {
  const [voucherQueries, setVoucherQueries] =
    useState<TVouchersQueriesState>(VOUCHER_QUERIES);
  const [voucherPage, setVoucherPage] = useState<number>(defaultPage);
  const [restaurantPage, setRestaurantPage] = useState<number>(defaultPage);
  const { setRestaurant, setVoucher, vouchers } = useVoucherStore();

  const [{ data: restaurantsAxiosData }, { data: vouchersAxiosData }] =
    useSuspenseQueries({
      queries: [
        RestaurantQueryFunc.getMany(restaurantPage),
        VoucherQueryFunc.getMany(voucherQueries),
      ],
    });

  const { data: restaurantsList } = restaurantsAxiosData;

  const { data: vouchersList } = vouchersAxiosData;

  useEffect(() => {
    if (restaurantsList) {
      setRestaurant(restaurantsList.data);
      setRestaurantPage(restaurantsList.page);
    }

    if (vouchersList) {
      setVoucher(vouchersList.data);
      setVoucherPage(vouchersList.page);
    }
  }, [restaurantsList, vouchersList]);

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

  return (
    <div className="w-full">
      <SearchVoucher
        selectedRestaurant={voucherQueries.restaurant}
        setSelectedRestaurant={setRestaurantQueries}
      />
      {voucherPage}
      <VoucherList vouchers={vouchers} />
    </div>
  );
};

export default ManageVoucher;
