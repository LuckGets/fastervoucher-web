import ScrollTop from '@/components/ScrollTop';
import { paths } from '@/config/path';
import VoucherAmount from '@/feature/admin/components/createVoucher/manageVoucher/amount/VoucherAmount';
import CoverPhoto from '@/feature/admin/components/createVoucher/manageVoucher/coverphoto/CoverPhoto';
import VoucherDate from '@/feature/admin/components/createVoucher/manageVoucher/date/VoucherDate';
import VoucherDetails from '@/feature/admin/components/createVoucher/manageVoucher/details/VoucherDetails';
import VoucherExample from '@/feature/admin/components/createVoucher/manageVoucher/example/VoucherExample';
import VoucherMeal from '@/feature/admin/components/createVoucher/manageVoucher/meal/VoucherMeal';
import VoucherPrice from '@/feature/admin/components/createVoucher/manageVoucher/price/VoucherPrice';
import VoucherTerm from '@/feature/admin/components/createVoucher/manageVoucher/termCondition/VoucherTerm';
import VoucherName from '@/feature/admin/components/createVoucher/manageVoucher/voucherName/VoucherName';
import VoucherPhoto from '@/feature/admin/components/createVoucher/manageVoucher/voucherphoto/VoucherPhoto';
import VoucherRestaurant from '@/feature/admin/components/createVoucher/manageVoucher/voucherRestaurant/VoucherRestaurant';
import VoucherTypes from '@/feature/admin/components/createVoucher/manageVoucher/voucherType/VoucherTypes';
import useVoucherStore, { Voucher } from '@/stores/voucher-store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const initialVoucherData: Voucher = {
  id: 0,
  name: '',
  passcode: undefined,
  voucherType: 'single',
  restaurant: '',
  meal: '',
  price: 0,
  promotionPrice: 0,
  stockAmount: 0,
  src: undefined,
  saleStartDate: undefined,
  saleEndDate: undefined,
  useDateStart: undefined,
  useDateEnd: undefined,
  carouselImages: [],
  details: '',
  conditions: '',
  package: [],
  freeVoucher: [],
};

const CreateVoucher = () => {
  const { vouchers, createVoucher } = useVoucherStore();
  const navigate = useNavigate();

  const [voucherData, setVoucherData] = useState(initialVoucherData);
  const [selectedVoucher, setSelectedVoucher] = useState<{
    id: number;
    quantity: number;
  } | null>(null);

  const [freeVoucher, setFreeVoucher] = useState<{
    id: number;
    quantity: number;
  } | null>(null);

  const updateVoucherData = (
    field: string,
    value: string | number | unknown | Date | undefined | string[],
  ) => {
    setVoucherData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getVoucherName = (id: number) => {
    const voucher = vouchers.find((voucher) => voucher.id === id);
    return voucher ? voucher.name : 'Unknown Voucher';
  };
  const handleCreateVoucher = () => {
    if (voucherData.name.trim()) {
      createVoucher({
        ...voucherData,
        package: selectedVoucher
          ? [
              {
                id: selectedVoucher.id,
                name: getVoucherName(selectedVoucher.id),
                quantity: selectedVoucher.quantity,
              },
            ]
          : [],
        freeVoucher: freeVoucher
          ? [
              {
                id: freeVoucher.id,
                name: getVoucherName(freeVoucher.id),
                quantity: freeVoucher.quantity,
              },
            ]
          : [],
      });

      Swal.fire({
        icon: 'success',
        title: 'Voucher created successfully!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate(paths.admin.voucher.path);
      });
      setVoucherData(initialVoucherData);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Voucher name is required',
      });
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

          <VoucherTypes
            voucherType={voucherData.voucherType}
            onChange={(value) => updateVoucherData('voucherType', value)}
            onPackageChange={(data) => {
              if (data.package) setSelectedVoucher(data.package[0]);
              if (data.freeVoucher) setFreeVoucher(data.freeVoucher[0]);
            }}
          />

          <VoucherPrice
            price={voucherData.price}
            promotionPrice={voucherData.promotionPrice}
            onChange={updateVoucherData}
          />
          <VoucherDate
            startDate={voucherData.saleStartDate}
            endDate={voucherData.saleEndDate}
            useDateStart={voucherData.useDateStart}
            useDateEnd={voucherData.useDateEnd}
            onChange={updateVoucherData}
          />
          <VoucherAmount
            stockAmount={voucherData.stockAmount}
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
            details={voucherData.details}
            onChange={(value: string) => updateVoucherData('details', value)}
          />
          <VoucherTerm
            conditions={voucherData.conditions}
            onChange={(value: string) => updateVoucherData('conditions', value)}
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
