import { useFetchedInfiniteVouchers } from '@/api/voucher/voucher-query';
import useVoucherStore, { VoucherTypeEnum } from '@/stores/voucher-store';
import SelectedVoucherList from './components/SelectedVoucherList';

const PackageVoucherWrapper: React.FC = () => {
  const { createVoucherData } = useVoucherStore();
  const { voucherType } = createVoucherData;
  const {
    data: vouchersListData,
    hasNextPage,
    fetchNextPage,
  } = useFetchedInfiniteVouchers<boolean>(
    {},
    voucherType === VoucherTypeEnum.Package,
  );

  const vouchers = vouchersListData?.pages?.flatMap((page) => page.data) || [];

  const allVoucherPackageType: ['quotaVouchers', 'rewardVouchers'] = [
    'quotaVouchers',
    'rewardVouchers',
  ];
  // Handler function for selecting voucher
  // and adding to the state.

  return (
    <div className="flex flex-col gap-2">
      <div className="mt-4 flex items-center gap-3">
        {vouchers && vouchers.length > 0 ? (
          <div className="w-5/6">
            {allVoucherPackageType.map((item) => (
              <SelectedVoucherList
                key={item}
                title={
                  item === 'quotaVouchers'
                    ? 'Add Vouchers to Package'
                    : 'Voucher Free'
                }
                vouchers={vouchers}
                type={item}
                nextPageVouchers={{
                  hasNextPage,
                  handleLoadMore: fetchNextPage,
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No available single vouchers to select. Please create a single
            voucher first
          </p>
        )}
      </div>
    </div>
  );
};

export default PackageVoucherWrapper;
