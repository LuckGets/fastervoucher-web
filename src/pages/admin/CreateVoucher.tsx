import ScrollTop from '../../components/ScrollTop';
import { paths } from '../../config/path';
import { CreateVoucherDataSchema } from '../../data-schema/voucher.type';
import VoucherAmount from '../../feature/admin/components/createVoucher/manageVoucher/amount/VoucherAmount';
import CoverPhoto from '../../feature/admin/components/createVoucher/manageVoucher/coverphoto/CoverPhoto';
import VoucherDate from '../../feature/admin/components/createVoucher/manageVoucher/date/VoucherDate';
import VoucherDetails from '../../feature/admin/components/createVoucher/manageVoucher/details/VoucherDetails';
import VoucherExample from '../../feature/admin/components/createVoucher/manageVoucher/example/VoucherExample';
import VoucherMeal from '../../feature/admin/components/createVoucher/manageVoucher/meal/VoucherMeal';
import VoucherPrice from '../../feature/admin/components/createVoucher/manageVoucher/price/VoucherPrice';
import VoucherTerm from '../../feature/admin/components/createVoucher/manageVoucher/termCondition/VoucherTerm';
import VoucherName from '../../feature/admin/components/createVoucher/manageVoucher/voucherName/VoucherName';
import VoucherPhoto from '../../feature/admin/components/createVoucher/manageVoucher/voucherphoto/VoucherPhoto';
import VoucherRestaurant from '../../feature/admin/components/createVoucher/manageVoucher/voucherRestaurant/VoucherRestaurant';
import VoucherTypes from '../../feature/admin/components/createVoucher/manageVoucher/voucherType/VoucherTypes';
import useVoucherStore, {
  CreateVoucherData,
  VoucherTypeEnum,
} from '../../stores/voucher-store';
import { useNavigate } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';
import ErrorNotification from '../error/ErrorNotification';
import handleApiError from '@/utils/error/handleApiError';
import SuccessNotification from '@/components/notifications/SuccessNotification';
import { useCreateVoucher } from '@/api/voucher/voucher-query';
import { CreatePackageDataSchema } from '@/data-schema/package.type';
import { useCreatePackageVoucher } from '@/api/package/package-query';
import { ProductDataSchema } from '@/data-schema/product.type';
import { AxiosResponse } from 'axios';
import { ResponseData } from '@/data-schema/common.type';

const createVoucherFieldsUIMapper: Partial<
  Record<keyof CreatePackageDataSchema, string>
> & { restaurantName: string } = {
  title: 'Voucher Name',
  description: 'Voucher details',
  termAndCondition: 'Voucher terms and conditions',
  restaurantName: 'Restaurant',
  tagId: 'Meal',
  price: 'Normal Price',
  discountedPrice: 'Promotion Price',
  stockAmount: 'Stock Amount',
  sellStartedAt: 'Sale Start Date',
  sellExpiredAt: 'Sale End Date',
  usableAt: 'Use Date Start',
  usableExpiredAt: 'Use Date End',
  mainImg: 'Voucher Cover Photo',
  quotaVouchers: 'Voucher in package',
  rewardVouchers: '',
};

function mapDataSchemaToUIFields(
  fields: (keyof CreateVoucherDataSchema)[] | (keyof CreatePackageDataSchema)[],
): string[] {
  const filterFields = fields.filter((item) => item !== 'voucherImg');
  return filterFields.map((item) => createVoucherFieldsUIMapper[item]!);
}

const CreateVoucher = () => {
  const {
    createVoucherData,
    updateCreateVoucherData,
    resetCreateVoucherData,
    sanitizeProductDataBeforeCreate,
    removeCreateVoucherDataField,
  } = useVoucherStore();
  const navigate = useNavigate();

  // For creating voucher API.
  const createVoucherMutation = useCreateVoucher();

  // For creating package API.
  const createPackageMutation = useCreatePackageVoucher();

  const handleSubmitCreateVoucher = async () => {
    const { data, missingFields } =
      sanitizeProductDataBeforeCreate(createVoucherData);

    // If the form is still not completed,
    // return the notification.
    if (missingFields.length > 0) {
      const fields = mapDataSchemaToUIFields(missingFields);
      const text = `These required fields have no value: ${fields.join(', ')}. Please input the information before proceed.`;
      const title = 'Voucher form not complete';
      return ErrorNotification({ text, title });
    }

    try {
      let resp: AxiosResponse<ResponseData<ProductDataSchema>>;
      switch (createVoucherData.voucherType) {
        case VoucherTypeEnum.Single:
          resp = await createVoucherMutation.mutateAsync(data);
          break;
        case VoucherTypeEnum.Package:
          resp = await createPackageMutation.mutateAsync(data);
          break;
      }

      if (!resp || !resp.data) {
        throw new Error('Voucher creation failed: missing data');
      }

      const { data: newVoucherData } = resp.data;
      resetCreateVoucherData();
      SuccessNotification({
        title: `Create voucher success!`,
        text: `Create voucher name: ${newVoucherData.title} success!`,
        navigateLink: {
          pageName: 'Manage voucher',
          link: paths.admin.voucher.path,
          navigateFunc: navigate,
        },
      });
    } catch (err) {
      handleApiError(err);
    }
  };

  const displayImg =
    createVoucherData.mainImg.srcFile instanceof File
      ? createVoucherData.mainImg.srcStr
      : null;

  return (
    <div>
      <div className="mb-12 flex w-full justify-between">
        <div className="flex w-1/2 flex-col gap-4">
          <VoucherName
            name={createVoucherData.title}
            onChange={(value) => updateCreateVoucherData('title', value)}
          />
          <VoucherRestaurant />
          <VoucherMeal />

          <VoucherTypes
            voucherType={createVoucherData.voucherType}
            onChange={(value: CreateVoucherData['voucherType']) =>
              updateCreateVoucherData<'voucherType'>('voucherType', value)
            }
          />
          <VoucherPrice
            onDeletePromotionField={() =>
              removeCreateVoucherDataField('discountedPrice')
            }
            price={createVoucherData.price}
            promotionPrice={createVoucherData.discountedPrice}
            onChange={updateCreateVoucherData}
          />
          <VoucherDate
            startDate={createVoucherData.sellStartedAt}
            endDate={createVoucherData.sellExpiredAt}
            useDateStart={createVoucherData.usableAt}
            useDateEnd={createVoucherData.usableExpiredAt}
            onChange={updateCreateVoucherData}
          />
          <VoucherAmount
            stockAmount={createVoucherData.stockAmount}
            onChange={(value) => updateCreateVoucherData('stockAmount', value)}
          />
          <CoverPhoto
            src={displayImg}
            onChange={(value: CreateVoucherData['mainImg']) =>
              updateCreateVoucherData('mainImg', value)
            }
          />
          <VoucherPhoto
            carouselImages={createVoucherData.otherImgs}
            onChange={(value: CreateVoucherData['otherImgs']) =>
              updateCreateVoucherData('otherImgs', value)
            }
          />
          <VoucherDetails
            details={createVoucherData.description}
            onChange={(value: CreateVoucherDataSchema['description']) =>
              updateCreateVoucherData('description', value)
            }
          />
          <VoucherTerm
            conditions={createVoucherData.termAndCondition}
            onChange={(value: CreateVoucherDataSchema['termAndCondition']) =>
              updateCreateVoucherData('termAndCondition', value)
            }
          />
        </div>
        <div className="flex w-1/2 flex-grow items-center justify-center">
          <VoucherExample voucher={createVoucherData} />
        </div>
      </div>
      <div className="mb-16 flex justify-center">
        <button
          className="mt-4 w-[40%] rounded-full bg-[#2BB673] px-4 py-2 text-white"
          onClick={handleSubmitCreateVoucher}
        >
          Create Voucher
        </button>
        <button
          className="mt-4 w-[40%] rounded-full bg-gray-500 px-4 py-2 text-white"
          onClick={resetCreateVoucherData}
        >
          Reset
        </button>
      </div>
      <ScrollTop />
    </div>
  );
};

export default CreateVoucher;
