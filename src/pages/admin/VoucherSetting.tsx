import { useEffect, useState } from 'react';
import VoucherName from '../../feature/admin/components/manageVoucher/voucherName/VoucherName';
import VoucherRestaurant from '../../feature/admin/components/manageVoucher/voucherRestaurant/VoucherRestaurant';
import VoucherMeal from '../../feature/admin/components/manageVoucher/meal/VoucherMeal';
import VoucherPrice from '../../feature/admin/components/manageVoucher/price/VoucherPrice';
import VoucherDate from '../../feature/admin/components/manageVoucher/date/VoucherDate';
import CoverPhoto from '../../feature/admin/components/manageVoucher/coverphoto/CoverPhoto';
import VoucherDetails from '../../feature/admin/components/manageVoucher/details/VoucherDetails';
import VoucherTerm from '../../feature/admin/components/manageVoucher/termCondition/VoucherTerm';
import { useNavigate, useParams } from 'react-router-dom';
import PromotionPrice from '../../feature/admin/components/manageVoucher/promotionPrice/PromotionPrice';
import StockAmount from '../../feature/admin/components/manageVoucher/stock/StockAmount';
import { useSuspenseQuery } from '@tanstack/react-query';
import { VoucherQueryFunc } from '../../api/voucher/voucher-query';
import { VoucherDataSchema } from '../../data-schema/voucher.type';
import useVoucherStore from '../../stores/voucher-store';
import { ChevronRight } from 'lucide-react';
import { paths } from '../../config/path';
import ScrollTop from '../../components/ScrollTop';
// import Swal from 'sweetalert2';

export interface VoucherDetailSettingProps {
  voucher: VoucherDataSchema;
}

const VoucherSetting = () => {
  const navigate = useNavigate();
  const { actionGetCategoriesAndTags, actionGetVoucherById } =
    useVoucherStore();
  const { id } = useParams<{ id: VoucherDataSchema['id'] }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const navigate = useNavigate();

  const {
    data: axiosVoucherResponse,
    isError,
    error,
  } = useSuspenseQuery(VoucherQueryFunc.getById(id ?? ''));

  const { data: voucher } = axiosVoucherResponse.data;

  if ((isError && error) || !voucher) {
    if (!voucher) throw new Error(`Can't find voucher with id: ${id}`);
    console.error(error);
    throw error;
  }

  const image = voucher.images.filter((item) => item.mainImg)[0];

  // Query voucher id information

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    // if (voucherId) {
    //   removeVoucher(voucherId);
    //   navigate(`${paths.admin.manage.path}`);
    // }
    setIsModalOpen(false);
  };

  useEffect(() => {
    actionGetCategoriesAndTags();
    if (id) {
      actionGetVoucherById(id);
    }
  }, [actionGetCategoriesAndTags, actionGetVoucherById, id]);

  const back = () => {
    navigate(`${paths.admin.voucher.path}`);
  };

  return (
    <div>
      <div className="mb-12 flex w-full flex-col">
        <div>
          <div>
            <h1 className="flex items-center gap-1 text-[#888888]">
              <span className="cursor-pointer hover:font-medium" onClick={back}>
                All Voucher
              </span>{' '}
              <ChevronRight className="mt-[3px] h-4 w-4" />
              {voucher?.title}
            </h1>
          </div>
          <hr className="mb-6 mt-2 w-full border text-[#888888]" />
        </div>
        <div className="flex w-full gap-4">
          <div className="w-1/4">
            <CoverPhoto voucher={voucher} mainImg={image} />
          </div>
          <div className="flex w-3/5 flex-col gap-4">
            <VoucherName />
            <VoucherRestaurant />
            <VoucherMeal />
            <VoucherPrice />
            <PromotionPrice />
            <VoucherDate />
            <StockAmount />
            <VoucherDetails />
            <VoucherTerm />
          </div>
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
