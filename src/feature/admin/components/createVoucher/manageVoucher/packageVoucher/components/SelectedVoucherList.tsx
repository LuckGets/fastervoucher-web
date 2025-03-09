import { useState } from 'react';
import AddVoucherToPackageButton from './AddVoucherButton';
import VoucherListModal, { ILoadMorePaginations } from './VoucherListModal';
import { ProductDataSchema } from '@/data-schema/product.type';
import useVoucherStore, {
  CreatePackageSelectedVoucherData,
  ImageWithPreviewSrcType,
} from '@/stores/voucher-store';
import SelectedVoucher from './SelectedVoucher';
import { findElementIndexOrThrow } from '@/utils/array-helper/array';
interface SelectedVoucherListProps {
  vouchers: ProductDataSchema[];
  type: 'quotaVouchers' | 'rewardVouchers';
  title: string;
  nextPageVouchers: ILoadMorePaginations;
}

const SelectedVoucherList: React.FC<SelectedVoucherListProps> = ({
  title,
  vouchers,
  type,
  nextPageVouchers,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { createVoucherData, updateCreateVoucherData } = useVoucherStore();
  const selectedVouchers: CreatePackageSelectedVoucherData[] = [];

  switch (type) {
    case 'quotaVouchers':
      selectedVouchers.push(...createVoucherData.quotaVouchers);
      break;
    case 'rewardVouchers':
      selectedVouchers.push(...createVoucherData.rewardVouchers);
      break;
  }

  const handleRemoveVoucher = (
    id: CreatePackageSelectedVoucherData['voucherId'],
  ) => {
    const itemIndx = findElementIndexOrThrow<
      CreatePackageSelectedVoucherData,
      'voucherId'
    >('voucherId', selectedVouchers, id, {
      title: 'There is an error while removing voucher from package list.',
      text: `Voucher ID: ${id} could not be found in creating package ${type} voucher data.`,
    });

    selectedVouchers.splice(itemIndx, 1);

    updateCreateVoucherData(type, [...selectedVouchers]);
  };

  const handleQuantityChange = (
    value: CreatePackageSelectedVoucherData['amount'],
    id: CreatePackageSelectedVoucherData['voucherId'],
  ): void => {
    console.log(`Value: ${value} for id: ${id}`);
    const itemIndx = findElementIndexOrThrow<
      CreatePackageSelectedVoucherData,
      'voucherId'
    >('voucherId', selectedVouchers, id, {
      title: 'There is an error while editing voucher from package list.',
      text: `Voucher ID: ${id} could not be found in creating package ${type} voucher data.`,
    });
    if (value <= 0 || value >= 100) return;

    selectedVouchers[itemIndx].amount = value;

    console.log('Edit voucher:', selectedVouchers[itemIndx]);

    return updateCreateVoucherData(type, [...selectedVouchers]);
  };

  const handleEditImageVoucher = (id: ProductDataSchema['id'], file: File) => {
    const previewImgObj: ImageWithPreviewSrcType = {
      srcFile: file,
      srcStr: URL.createObjectURL(file),
    };

    const isVoucherIndExist = selectedVouchers.findIndex(
      (item) => item.voucherId === id,
    );

    if (isVoucherIndExist === -1) return;

    selectedVouchers[isVoucherIndExist].previewImg = previewImgObj;
    updateCreateVoucherData('rewardVouchers', [...selectedVouchers]);
  };

  const addBtnText =
    type === 'quotaVouchers' ? 'Add Voucher to Package' : 'Add Voucher Free';

  return (
    <>
      <label className="text-lg font-medium">{title}</label>
      <div className="flex w-5/6 gap-3">
        {selectedVouchers?.length > 0
          ? selectedVouchers?.map((item) => (
              <SelectedVoucher
                key={item.voucherId}
                handleQuantityChange={(value) =>
                  handleQuantityChange(value, item.voucherId)
                }
                voucher={item}
                handleRemoveVoucher={() => handleRemoveVoucher(item.voucherId)}
                handleEditVoucherImg={
                  type === 'rewardVouchers'
                    ? (value: File) =>
                        handleEditImageVoucher(item.voucherId, value)
                    : null
                }
              />
            ))
          : null}
      </div>
      <AddVoucherToPackageButton
        text={addBtnText}
        handleOnClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <VoucherListModal
          onCloseBtn={() => setIsModalOpen(false)}
          vouchers={vouchers}
          type={type}
          nextPageVouchers={nextPageVouchers}
        />
      )}
    </>
  );
};

export default SelectedVoucherList;
