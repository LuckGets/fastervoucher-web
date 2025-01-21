import ScrollTop from '@/components/ScrollTop';
import CoverPhoto from '@/feature/admin/components/createVoucher/manageVoucher/coverphoto/CoverPhoto';
import VoucherDate from '@/feature/admin/components/createVoucher/manageVoucher/date/VoucherDate';
import VoucherDetails from '@/feature/admin/components/createVoucher/manageVoucher/details/VoucherDetails';
import CreateDiscount from '@/feature/admin/components/createVoucher/manageVoucher/discount/CreateDiscount';
import VoucherExample from '@/feature/admin/components/createVoucher/manageVoucher/example/VoucherExample';
import VoucherMeal from '@/feature/admin/components/createVoucher/manageVoucher/meal/VoucherMeal';
import VoucherPrice from '@/feature/admin/components/createVoucher/manageVoucher/price/VoucherPrice';
import VoucherTerm from '@/feature/admin/components/createVoucher/manageVoucher/termCondition/VoucherTerm';
import VoucherName from '@/feature/admin/components/createVoucher/manageVoucher/voucherName/VoucherName';
import VoucherPhoto from '@/feature/admin/components/createVoucher/manageVoucher/voucherphoto/VoucherPhoto';
import VoucherRestaurant from '@/feature/admin/components/createVoucher/manageVoucher/voucherRestaurant/VoucherRestaurant';
import useVoucherStore, { Voucher } from '@/stores/voucher-store';
import { useState } from 'react';

const initialVoucherData: Voucher = {
  id: 0,
  name: '',
  passcode: undefined,
  restaurant: '',
  meal: '',
  price: 0,
  src: undefined,
  saleStartDate: undefined,
  saleEndDate: undefined,
  useDateStart: undefined,
  useDateEnd: undefined,
  promotion: [],
  carouselImages: [],
  detailsTh: '',
  detailsEng: '',
  conditionsTh: [],
  conditionsEng: [],
};

const CreateVoucher = () => {
  const { createVoucher } = useVoucherStore();

  const [voucherData, setVoucherData] = useState(initialVoucherData);

  const updateVoucherData = (
    field: string,
    value: string | number | unknown | Date | undefined | string[],
  ) => {
    setVoucherData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateVoucher = () => {
    if (voucherData.name.trim()) {
      createVoucher(voucherData);
      alert('Voucher created successfully!');
      setVoucherData(initialVoucherData);
    } else {
      alert('Voucher name is required');
    }
  };

  return (
    <div>
      <div className="mb-12 flex w-full justify-between">
        <div className="flex w-1/2 flex-col gap-4">
          <VoucherName
            name={voucherData.name}
            passcode={voucherData.passcode}
            onChange={updateVoucherData}
          />
          <VoucherRestaurant
            restaurant={voucherData.restaurant}
            onChange={updateVoucherData}
          />
          <VoucherMeal meal={voucherData.meal} onChange={updateVoucherData} />
          <VoucherPrice
            price={voucherData.price}
            onChange={updateVoucherData}
          />
          <VoucherDate
            startDate={voucherData.saleStartDate}
            endDate={voucherData.saleEndDate}
            useDateStart={voucherData.useDateStart}
            useDateEnd={voucherData.useDateEnd}
            onChange={updateVoucherData}
          />
          <CreateDiscount
            promotion={voucherData.promotion || []}
            onChange={updateVoucherData}
          />
          <CoverPhoto
            src={voucherData.src ?? null}
            onChange={updateVoucherData}
          />
          <VoucherPhoto
            carouselImages={voucherData.carouselImages}
            onChange={updateVoucherData}
          />
          <VoucherDetails
            detailsTh={voucherData.detailsTh}
            detailsEng={voucherData.detailsEng}
            onChange={updateVoucherData}
          />
          <VoucherTerm
            conditionsTh={voucherData.conditionsTh}
            conditionsEng={voucherData.conditionsEng}
            onChange={updateVoucherData}
          />
        </div>
        <div className="flex w-1/2 flex-grow items-center justify-center">
          <VoucherExample voucher={voucherData} />
        </div>
      </div>
      <div className="mb-16 flex justify-center">
        <button
          className="mt-4 w-[40%] rounded-full bg-[#2BB673] px-4 py-2 text-white"
          onClick={handleCreateVoucher}
        >
          Create Voucher
        </button>
      </div>
      <ScrollTop />
    </div>
  );
};

export default CreateVoucher;
