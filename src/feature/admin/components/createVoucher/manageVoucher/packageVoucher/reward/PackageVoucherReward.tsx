import { CreatePackageRewardVoucherData } from '@/stores/voucher-store';
import AddVoucherToPackageButton from '../components/AddVoucherButton';
import { useState } from 'react';
import VoucherListModal from '../components/VoucherListModal';
import { VoucherDataSchema } from '@/data-schema/voucher.type';
import Modal from '@/components/Modal';

interface PackageVoucherRewardProps {
  vouchers: VoucherDataSchema[];
  rewardVouchers: CreatePackageRewardVoucherData[];
  handleAddFreeVoucher: (
    id: CreatePackageRewardVoucherData['voucherId'],
    name: CreatePackageRewardVoucherData['title'],
  ) => void;
}

const PackageVoucherReward: React.FC<PackageVoucherRewardProps> = ({
  vouchers,
  rewardVouchers,
  handleAddFreeVoucher,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div>
        <label className="text-lg font-medium">Voucher Free</label>
        <div className="mt-4 flex items-center gap-3">
          <select
            className="h-10 w-full rounded-full border bg-[#E1E1E1] pl-4"
            onChange={(e) => handleFreeVoucherSelection(Number(e.target.value))}
            // value={freeVoucher ? freeVoucher.id : ''}
          >
            <option value="" disabled>
              Select Voucher
            </option>
            {rewardVouchers &&
              rewardVouchers.map((voucher) => (
                <option key={voucher.voucherId} value={voucher.voucherId}>
                  {voucher.title}
                </option>
              ))}
          </select>
          <div className="flex w-1/6">
            <input
              type="number"
              //   value={.quantity || ''}
              min="1"
              onChange={(e) =>
                handleQuantityChange(Number(e.target.value), true)
              }
              className="w-full rounded-full border bg-[#E1E1E1] p-2 pl-6"
            />
          </div>

          {/* {freeVoucher && (
            <div onClick={handleVoucherFreeDelete} className="cursor-pointer">
              <Trash2 />
            </div>
          )} */}
        </div>

        <AddVoucherToPackageButton handleOnClick={() => setIsModalOpen(true)} />

        {isModalOpen && (
          <>
            <Modal handleCloseBtn={() => setIsModalOpen(false)}>
              <VoucherListModal
                vouchers={vouchers}
                onSelect={handleAddFreeVoucher}
              />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default PackageVoucherReward;
