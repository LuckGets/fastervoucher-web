import { ProductDataSchema } from '@/data-schema/product.type';
import VoucherItemChoice from './VoucherItemChoice';
import useVoucherStore, {
  CreatePackageSelectedVoucherData,
} from '@/stores/voucher-store';
import Modal from '@/components/Modal';

interface VoucherListModalProps {
  vouchers: ProductDataSchema[];
  type: 'quotaVouchers' | 'rewardVouchers';
  onCloseBtn: () => void;
  nextPageVouchers: ILoadMorePaginations;
}

export interface IOnSelectVoucherArgument {
  id: CreatePackageSelectedVoucherData['voucherId'];
  title: CreatePackageSelectedVoucherData['title'];
  img: CreatePackageSelectedVoucherData['img'];
}

export interface ILoadMorePaginations {
  hasNextPage: boolean;
  handleLoadMore: () => void;
}

const VoucherListModal: React.FC<VoucherListModalProps> = ({
  type,
  vouchers,
  onCloseBtn,
  nextPageVouchers,
}) => {
  const { createVoucherData, updateCreateVoucherData } = useVoucherStore();

  const { quotaVouchers, rewardVouchers } = createVoucherData;
  const { handleLoadMore, hasNextPage } = nextPageVouchers;
  // To show only the full rows of product
  // have to set the constant number of products per row.
  const numsProductEachRow = 4;

  // Find the total row
  // which can be find from The total number of vouchers divide by nums of product each row
  // Example : If the total fetched voucher is 10 --> we have to divide with 4 which is nums of product per row
  // and the total row will be 2
  const totalRows = Math.floor(vouchers.length / numsProductEachRow);

  // And we will slice the vouchers from the first one to the last displayable one
  // So, we will find the the total number of vouchers to show
  const itemsToShow = totalRows * numsProductEachRow;

  // Then we slice the all fetched vouchers with the display number of vouchers
  let displayedProducts = vouchers.slice(0, itemsToShow);

  const handleLoadMoreDisplayProducts = () => {
    handleLoadMore();
    if (vouchers.length % numsProductEachRow !== 0)
      displayedProducts = vouchers;
  };

  function handleOnSelectVoucher<T extends 'quotaVouchers' | 'rewardVouchers'>(
    { id, title, img }: IOnSelectVoucherArgument,
    type: T,
  ): void {
    const prevState = [];
    switch (type) {
      case 'quotaVouchers':
        prevState.push(...quotaVouchers);
        break;
      case 'rewardVouchers':
        prevState.push(...rewardVouchers);
        break;
    }

    if (prevState.length > 0) {
      const isProductIndexExist = prevState?.findIndex(
        (item) => item.voucherId === id,
      );

      if (isProductIndexExist === -1) {
        prevState[isProductIndexExist].amount++;
        return updateCreateVoucherData(type, [...prevState]);
      }
    }

    const addProduct: CreatePackageSelectedVoucherData = {
      voucherId: id,
      title,
      amount: 1,
      img,
    };

    prevState.push(addProduct);

    updateCreateVoucherData(type, [...prevState]);
    return onCloseBtn();
  }
  return (
    <Modal handleCloseBtn={onCloseBtn}>
      <>
        <div className={`grid grid-cols-${numsProductEachRow} gap-4`}>
          {displayedProducts.map((item) => (
            <VoucherItemChoice
              key={item.id}
              product={item}
              handleOnClick={(value: IOnSelectVoucherArgument) =>
                handleOnSelectVoucher(value, type)
              }
            />
          ))}
        </div>
        {hasNextPage && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleLoadMoreDisplayProducts}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </>
    </Modal>
  );
};

export default VoucherListModal;
