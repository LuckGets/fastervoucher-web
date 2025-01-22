import { useState } from 'react';
import ScrollTop from '@/components/ScrollTop';
import VoucherName from '../../feature/admin/components/manageVoucher/voucherName/VoucherName';
import VoucherRestaurant from '../../feature/admin/components/manageVoucher/voucherRestaurant/VoucherRestaurant';
import VoucherMeal from '../../feature/admin/components/manageVoucher/meal/VoucherMeal';
import VoucherPrice from '../../feature/admin/components/manageVoucher/price/VoucherPrice';
import VoucherDate from '../../feature/admin/components/manageVoucher/date/VoucherDate';
import CreateDiscount from '../../feature/admin/components/manageVoucher/discount/CreateDiscount';
import CoverPhoto from '@/feature/admin/components/manageVoucher/coverphoto/CoverPhoto';
import VoucherPhoto from '@/feature/admin/components/manageVoucher/voucherphoto/VoucherPhoto';
import VoucherExample from '@/feature/admin/components/manageVoucher/example/VoucherExample';
import VoucherDetails from '@/feature/admin/components/manageVoucher/details/VoucherDetails';
import VoucherTerm from '@/feature/admin/components/manageVoucher/termCondition/VoucherTerm';
import useVoucherStore from '@/stores/voucher-store';
import { useNavigate, useParams } from 'react-router-dom';
import { paths } from '@/config/path';

const VoucherSetting = () => {
  const { id } = useParams<{ id: string }>();
  const voucherId = parseInt(id || '0');
  const { removeVoucher } = useVoucherStore();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (voucherId) {
      removeVoucher(voucherId);
      navigate(`${paths.admin.manage.path}`);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-12 flex w-full justify-between">
        <div className="flex w-1/2 flex-col gap-4">
          <VoucherName />
          <VoucherRestaurant />
          <VoucherMeal />
          <VoucherPrice />
          <VoucherDate />
          <CreateDiscount />
          <CoverPhoto />
          <VoucherPhoto />
          <VoucherDetails />
          <VoucherTerm />
        </div>
        <div className="flex w-1/2 flex-grow items-center justify-center">
          <VoucherExample />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="w-[50%] rounded-full bg-[#F87171] p-2 px-10 text-white"
          onClick={handleDelete}
        >
          Delete Voucher
        </button>
      </div>
      <ScrollTop />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex w-1/3 flex-col items-center rounded-lg bg-[#F7F3ED] p-6">
            <h2 className="mb-4 text-xl font-bold">Confirm Delete</h2>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="rounded-full bg-gray-300 px-8 py-2 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-[#F87171] px-8 py-2 text-white hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
            <p className="mt-5 text-center text-xs text-[#888888]">
              Once the voucher is deleted, it will be permanently removed and
              cannot be undone.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherSetting;
