import ScrollTop from '@/components/ScrollTop';
import VoucherName from './components/manageVoucher/voucherName/VoucherName';
import VoucherRestaurant from './components/manageVoucher/voucherRestaurant/VoucherRestaurant';
import VoucherMeal from './components/manageVoucher/meal/VoucherMeal';
import VoucherPrice from './components/manageVoucher/price/VoucherPrice';
import VoucherDate from './components/manageVoucher/date/VoucherDate';
import CreateDiscount from './components/manageVoucher/discount/CreateDiscount';
import CoverPhoto from './components/manageVoucher/coverphoto/CoverPhoto';
import VoucherPhoto from './components/manageVoucher/voucherphoto/VoucherPhoto';
import VoucherExample from './components/manageVoucher/example/VoucherExample';
import VoucherDetails from './components/manageVoucher/details/VoucherDetails';
import VoucherTerm from './components/manageVoucher/termCondition/VoucherTerm';

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
