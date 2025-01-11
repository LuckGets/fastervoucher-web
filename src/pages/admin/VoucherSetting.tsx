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

const VoucherSetting = () => {
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
      <ScrollTop />
    </div>
  );
};

export default VoucherSetting;
