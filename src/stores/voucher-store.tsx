import {
  ProductDataSchema,
  ProductStatusEnum,
} from '@/data-schema/product.type';
import { getCategories, getTag } from '../api/category/category';
import { voucherApi } from '../api/voucher/voucher.api';
import { Restaurant } from '../data-schema/restaurant.type';
import {
  CreateVoucherDataSchema,
  VoucherDataSchema,
} from '../data-schema/voucher.type';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import NullableType from '@/utils/types/nullable.type';
import { Meal } from '@/data-schema/meal.type';
import { ObjectHelper } from '@/utils/object-helper/object-helper';
import makeFormData from '@/utils/formData';
import { CreatePackageDataSchema } from '@/data-schema/package.type';
import { prepareCreateRewardVouchersImage } from '@/utils/apiDataUtils/rewardVoucher-helper';
import { sanitizeVoucherImagesFromCreateData } from '@/utils/apiDataUtils/productHelper';

interface SettingState {
  voucherById: VoucherDataSchema | null;
  vouchers: VoucherDataSchema[];
  createVoucherData: CreateVoucherData;
  restaurants: Restaurant[];
  meals: Meal[];
  actionGetVouchers: () => void;
  actionGetVoucherById: (voucherId: string) => void;
  actionGetCategoriesAndTags: () => void;
  setRestaurant: (restaurant: Restaurant[]) => void;
  setMeal: (meal: Restaurant[]) => void;
  setVoucher: (voucher: VoucherDataSchema[]) => void;
  addVoucher: (voucher: VoucherDataSchema) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setCreateVoucherData: (data: CreateVoucherData) => void;
  updateCreateVoucherData<T extends keyof CreateVoucherData>(
    field: T,
    value: CreateVoucherData[T],
  ): void;
  removeCreateVoucherDataField: (field: 'discountedPrice') => void;
  sanitizeProductDataBeforeCreate(
    data: CreateVoucherData,
  ):
    | SanitizedCreateData<CreateVoucherDataSchema>
    | SanitizedCreateData<CreatePackageDataSchema>;
  sanitizeCreateVoucherDataBeforeCreate: (
    data: CreateVoucherData,
    missingfieldsarr: (keyof CreateVoucherDataSchema)[],
  ) => SanitizedCreateData<CreateVoucherDataSchema>;
  sanitizeCreatePackageVoucherData: (
    data: CreateVoucherData,
    missingfieldsarr: (keyof CreateVoucherDataSchema)[],
  ) => SanitizedCreateData<CreatePackageDataSchema>;
  resetCreateVoucherData: () => void;
}

export type ImageWithPreviewSrcType = {
  srcStr: NullableType<string>;
  srcFile: NullableType<File>;
};

export enum VoucherTypeEnum {
  Single = 'single',
  Package = 'package',
}

export type CreatePackageSelectedVoucherData =
  CreatePackageDataSchema['quotaVouchers'][number] & {
    title: ProductDataSchema['title'];
    img: ProductDataSchema['images'][number]['imgPath'];
    previewImg?: ImageWithPreviewSrcType;
  };

export type CreateVoucherData = Omit<
  CreateVoucherDataSchema,
  'mainImg' | 'voucherImg'
> & {
  mainImg: ImageWithPreviewSrcType;
  otherImgs?: ImageWithPreviewSrcType[];
  restaurantName: Restaurant['name'];
  restaurantId: Restaurant['id'];
  mealName: Meal['name'];
  voucherType: VoucherTypeEnum;
  quotaVouchers: CreatePackageSelectedVoucherData[];
  rewardVouchers: CreatePackageSelectedVoucherData[];
};

export type SanitizedCreateData<
  T extends CreatePackageDataSchema | CreateVoucherDataSchema,
> = {
  missingFields: (keyof T)[];
  data: FormData;
  type: VoucherTypeEnum;
};

const initialVoucherData: CreateVoucherData = {
  title: '',
  tagId: '',
  price: 0,
  stockAmount: 0,
  sellStartedAt: '',
  sellExpiredAt: '',
  usableAt: '',
  usableExpiredAt: '',
  termAndCondition: '',
  description: '',
  mainImg: { srcStr: null, srcFile: null },
  status: ProductStatusEnum.ACTIVE,
  restaurantName: '',
  restaurantId: '',
  mealName: '',
  voucherType: VoucherTypeEnum.Single,
  quotaVouchers: [],
  rewardVouchers: [],
};

const useVoucherStore = create<SettingState>()(
  persist(
    (set, get) => ({
      voucherById: null,
      vouchers: [],
      createVoucherData: initialVoucherData,
      restaurants: [],
      meals: [],
      actionGetVouchers: async () => {
        try {
          const result = await voucherApi.getVouchers();
          const data = result?.data;

          if (data && Array.isArray(data)) {
            set({ vouchers: data });
          } else {
            console.log('Voucher information not correct');
            set({ vouchers: useVoucherStore.getState().vouchers });
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher data:', err?.message || err);
          set({ vouchers: useVoucherStore.getState().vouchers });
        }
      },
      actionGetVoucherById: async (voucherId: string) => {
        try {
          const result = await voucherApi.getVoucherById(voucherId);
          const data = result?.data?.data;

          if (data) {
            set({ voucherById: data });
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher by ID:', err?.message || err);
        }
      },
      actionGetCategoriesAndTags: async () => {
        try {
          const categories = await getCategories();
          const tags = await getTag();

          const categoriesData = categories?.data?.data;
          if (categoriesData) {
            set({ restaurants: categoriesData });
          }
          const tagsData = tags?.data?.data;
          if (tagsData) {
            set({ meals: tagsData });
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher by ID:', err?.message || err);
        }
      },
      setVoucher: (vouchers: VoucherDataSchema[]) => set({ vouchers }),
      setRestaurant: (restaurants: Restaurant[]) => set({ restaurants }),
      setMeal: (meals: Restaurant[]) => set({ meals }),
      addVoucher: (voucher: VoucherDataSchema) =>
        set((state) => ({ vouchers: [...state.vouchers, voucher] })),
      searchTerm: '',
      setSearchTerm: (searchTerm: string) => set({ searchTerm }),
      setCreateVoucherData: (data) => set({ createVoucherData: data }),
      updateCreateVoucherData: (field: keyof CreateVoucherData, value) =>
        set((state) => ({
          createVoucherData: { ...state.createVoucherData, [field]: value },
        })),
      removeCreateVoucherDataField: (field: 'discountedPrice') =>
        set((state) => {
          if (field !== 'discountedPrice') return state;
          const { [field]: removed, ...rest } = state.createVoucherData;
          void removed;
          return { createVoucherData: rest };
        }),
      resetCreateVoucherData: () =>
        set({ createVoucherData: initialVoucherData }),
      sanitizeProductDataBeforeCreate(data: CreateVoucherData) {
        const missingFields: (keyof CreateVoucherDataSchema)[] = [];
        const requiredFields: (keyof CreateVoucherDataSchema)[] = [
          'description',
          'price',
          'sellExpiredAt',
          'sellStartedAt',
          'stockAmount',
          'tagId',
          'termAndCondition',
          'title',
          'usableAt',
          'usableExpiredAt',
        ];
        missingFields.push(
          ...ObjectHelper.checkAndReturnEmptyFields<CreateVoucherDataSchema>(
            requiredFields,
            { ...data, mainImg: data.mainImg.srcFile },
          ),
        );

        if (
          !ObjectHelper.isObjectEmpty(data.mainImg) &&
          data.mainImg.srcFile &&
          data.mainImg.srcFile instanceof File &&
          data.mainImg.srcStr
        ) {
          switch (data.voucherType) {
            case VoucherTypeEnum.Single:
              return get().sanitizeCreateVoucherDataBeforeCreate(
                data,
                missingFields,
              );
            case VoucherTypeEnum.Package:
              return get().sanitizeCreatePackageVoucherData(
                data,
                missingFields,
              );
          }
        }

        missingFields.push('mainImg');

        return {
          missingFields,
          data: new FormData(),
          type: data.voucherType,
        };
      },
      sanitizeCreateVoucherDataBeforeCreate(
        data: CreateVoucherData,
        missingFields: (keyof CreateVoucherDataSchema)[],
      ) {
        const { mainImg, voucherImg } =
          sanitizeVoucherImagesFromCreateData(data);

        const createData: CreateVoucherDataSchema = { ...data, mainImg };

        if (voucherImg && voucherImg.length > 0)
          createData.voucherImg = voucherImg;

        const reqFormData = makeFormData<CreateVoucherDataSchema>(createData);
        return {
          data: reqFormData,
          missingFields,
          type: VoucherTypeEnum.Single,
        };
      },
      sanitizeCreatePackageVoucherData: (
        data: CreateVoucherData,
        missingFieldsArr,
      ): SanitizedCreateData<CreatePackageDataSchema> => {
        const type = VoucherTypeEnum.Package;
        const { quotaVouchers, rewardVouchers } = data;
        const missingFields: (keyof CreatePackageDataSchema)[] =
          missingFieldsArr.filter((item) => {
            return item !== 'voucherImg';
          });

        const defaultData = {
          missingFields,
          data: new FormData(),
          type,
        };

        if (quotaVouchers.length === 0) {
          missingFields.push('quotaVouchers');
          return {
            ...defaultData,
            missingFields,
          };
        }

        // Check if reward vouchers provided
        // if not, then we return null as the data is not ready.
        if (rewardVouchers.length === 0) {
          missingFields.push('rewardVouchers');
          return {
            ...defaultData,
            missingFields,
          };
        }

        const { mainImg, voucherImg } =
          sanitizeVoucherImagesFromCreateData(data);

        const createRewardVoucherImgsArr =
          prepareCreateRewardVouchersImage(rewardVouchers);

        const createData: CreatePackageDataSchema = {
          ...data,
          mainImg,
          ...createRewardVoucherImgsArr,
        };

        if (voucherImg && voucherImg.length > 0)
          createData.packageImg = voucherImg;

        const reqFormData = makeFormData(createData);

        return {
          ...defaultData,
          missingFields,
          data: reqFormData,
        };
      },
    }),
    {
      name: 'voucher-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useVoucherStore;
