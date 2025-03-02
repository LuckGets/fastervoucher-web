import { useFetchedInfiniteVouchers } from '@/api/voucher/voucher-query';
import useVoucherStore, {
  CreatePackageQuotaVoucherData,
  CreatePackageRewardVoucherData,
  CreateVoucherData,
  VoucherTypeEnum,
} from '@/stores/voucher-store';
import PackageVoucherQuota from './quota/PackageVoucherQuota';
import PackageVoucherReward from './reward/PackageVoucherReward';

const PackageVoucherWrapper: React.FC = () => {
  const { createVoucherData, updateCreateVoucherData } = useVoucherStore();
  const { voucherType } = createVoucherData;
  const {
    data: vouchersListData,
    // hasNextPage,
    // fetchNextPage,
    // isFetchingNextPage,
  } = useFetchedInfiniteVouchers<boolean>(
    {},
    voucherType === VoucherTypeEnum.Package,
  );

  console.log('Fetched Data ', vouchersListData);

  const vouchers = vouchersListData?.pages?.flatMap((page) => page.data) || [];
  console.log('VOUCHERS', vouchers);

  // Handler function for selecting voucher
  // and adding to the state.
  function handleOnSelectVoucher<T extends 'quotaVouchers' | 'rewardVouchers'>(
    id:
      | CreatePackageQuotaVoucherData['voucherId']
      | CreatePackageRewardVoucherData['voucherId'],
    name:
      | CreatePackageQuotaVoucherData['title']
      | CreatePackageRewardVoucherData['title'],
    type: T,
    prevState: CreateVoucherData[T],
  ): void {
    if (prevState.length > 0) {
      const isProductIndexExist = prevState?.findIndex(
        (item) => item.voucherId === id,
      );

      if (isProductIndexExist === -1) {
        prevState[isProductIndexExist].amount++;
        return updateCreateVoucherData(type, [...prevState]);
      }
    }

    const addProduct: CreatePackageQuotaVoucherData = {
      voucherId: id,
      title: name,
      amount: 1,
    };

    prevState.push(addProduct);

    return updateCreateVoucherData(type, [...prevState]);
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-medium">Add Vouchers to Package</label>
      <div className="mt-4 flex items-center gap-3">
        {vouchers && vouchers.length > 0 ? (
          <div className="w-5/6">
            <PackageVoucherQuota
              quotaVouchers={createVoucherData.quotaVouchers ?? []}
              onSelectVoucher={(id, name) =>
                handleOnSelectVoucher(
                  id,
                  name,
                  'quotaVouchers',
                  createVoucherData.quotaVouchers,
                )
              }
              vouchers={vouchers}
            />
            <PackageVoucherReward
              handleAddFreeVoucher={(id, name) =>
                handleOnSelectVoucher(
                  id,
                  name,
                  'rewardVouchers',
                  createVoucherData.rewardVouchers,
                )
              }
            />
          </div>
        ) : (
          <p className="text-gray-500">
            No available single vouchers to select. Please create a single
            voucher first
          </p>
        )}
        {/* The componennt for adjust amount. */}
        {/* 
        <div className="flex w-1/6">
          <input
            type="number"
            value={selectedVoucher?.quantity || ''}
            min="1"
            onChange={(e) =>
              handleQuantityChange(Number(e.target.value), false)
            }
            className="w-full rounded-full border bg-[#E1E1E1] p-2 pl-6"
          />
        </div> */}

        {/* {selectedVoucher && (
          <div onClick={handleVoucherDelete} className="cursor-pointer">
            <Trash2 />
          </div>
        )} */}
      </div>
      {/* {!freeVoucher && (
        <button
          onClick={handleAddFreeVoucher}
          className="flex w-full items-center justify-center gap-2 rounded-full border bg-[#E1E1E1] p-2 pl-7 text-[#888888]"
        >
          <Plus className="h-5 w-5" />
          Add Voucher Free
        </button>
      )}

      {freeVoucher && (
        <div>
          <label className="text-lg font-medium">Voucher Free</label>
          <div className="mt-4 flex items-center gap-3">
            <select
              className="h-10 w-full rounded-full border bg-[#E1E1E1] pl-4"
              onChange={(e) =>
                handleFreeVoucherSelection(Number(e.target.value))
              }
              value={freeVoucher ? freeVoucher.id : ''}
            >
              <option value="" disabled>
                Select Voucher
              </option>
              {vouchers &&
                vouchers.map((voucher) => (
                  <option key={voucher.id} value={voucher.id}>
                    {voucher.title}
                  </option>
                ))}
            </select>
            <div className="flex w-1/6">
              <input
                type="number"
                value={freeVoucher?.quantity || ''}
                min="1"
                onChange={(e) =>
                  handleQuantityChange(Number(e.target.value), true)
                }
                className="w-full rounded-full border bg-[#E1E1E1] p-2 pl-6"
              />
            </div>

            {freeVoucher && (
              <div onClick={handleVoucherFreeDelete} className="cursor-pointer">
                <Trash2 />
              </div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PackageVoucherWrapper;
