import { ProductDataSchema } from '@/data-schema/product.type';
import { useState } from 'react';
import Modal from '@/components/Modal';
import VoucherListModal from '../components/VoucherListModal';
import { CreatePackageQuotaVoucherData } from '@/stores/voucher-store';
import SelectedQuotaVoucher from './SelectedQuotaVoucher';
import AddVoucherToPackageButton from '../components/AddVoucherButton';

interface PackageVouherQuotaProps {
  quotaVouchers: CreatePackageQuotaVoucherData[];
  vouchers: ProductDataSchema[];
  onSelectVoucher: (
    id: CreatePackageQuotaVoucherData['voucherId'],
    name: CreatePackageQuotaVoucherData['title'],
  ) => void;
}

const PackageVoucherQuota: React.FC<PackageVouherQuotaProps> = ({
  vouchers,
  onSelectVoucher,
  quotaVouchers,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleQuantityChange = () =>
    // value: CreatePackageQuotaVoucherData['amount'],
    // id: CreatePackageQuotaVoucherData['voucherId'],
    {};

  const handleRemoveVoucher = () =>
    // id: CreatePackageQuotaVoucherData['voucherId'],
    {};

  return (
    <>
      <div className="w-5/6">
        {/* <select
          className="h-10 w-full rounded-full border bg-[#E1E1E1] pl-4"
          onChange={(e) => handleVoucherSelection(e.target.value)}
          value={selectedVoucher ? selectedVoucher.id : ''}
        >
          <option value="" disabled>
            Select Voucher
          </option>
          {vouchers.map((voucher) => (
            <option key={voucher.id} value={voucher.id}>
              {voucher.title}
            </option>
          ))}
          {isModalOpen && (
            <>
              <Modal handleCloseBtn={() => setIsModalOpen(false)}>
                <VoucherListModal
                  vouchers={vouchers}
                  onSelect={handleOnSelectVoucher}
                />
              </Modal>
            </>
          )}
        </select> */}
        {quotaVouchers && quotaVouchers?.length > 0 ? (
          quotaVouchers?.map((item) => (
            <SelectedQuotaVoucher
              key={item.voucherId}
              handleQuantityChange={(value) =>
                handleQuantityChange(value, item.voucherId)
              }
              voucher={item}
              handleRemoveVoucher={() => handleRemoveVoucher(item.voucherId)}
            />
          ))
        ) : (
          <select
            className="h-10 w-full rounded-full border bg-[#E1E1E1] pl-4"
            onClick={() => setIsModalOpen(true)}
            // onChange={(e) => handleVoucherSelection(e.target.value)}
            // value={selectedVoucher ? selectedVoucher.id : ''}
          ></select>
        )}
      </div>

      <AddVoucherToPackageButton handleOnClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <>
          <Modal handleCloseBtn={() => setIsModalOpen(false)}>
            <VoucherListModal vouchers={vouchers} onSelect={onSelectVoucher} />
          </Modal>
        </>
      )}

      {/* <div className="flex w-1/6">
        <input
          type="number"
          value={selectedVoucher?.quantity || ''}
          min="1"
          onChange={(e) => handleQuantityChange(Number(e.target.value), false)}
          className="w-full rounded-full border bg-[#E1E1E1] p-2 pl-6"
        />
      </div> */}
    </>
  );
};

export default PackageVoucherQuota;
