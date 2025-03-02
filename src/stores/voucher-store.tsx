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
  sanitizeCreateVoucherDataBeforeCreate: (data: CreateVoucherData) => {
    missingFields: (keyof CreateVoucherDataSchema)[];
    data: FormData;
  };
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

export type CreatePackageQuotaVoucherData =
  CreatePackageDataSchema['quotaVouchers'][number] & {
    title: ProductDataSchema['title'];
  };

export type CreatePackageRewardVoucherData =
  CreatePackageDataSchema['rewardVouchers'][number] & {
    title: ProductDataSchema['title'];
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
  quotaVouchers: CreatePackageQuotaVoucherData[];
  rewardVouchers: CreatePackageRewardVoucherData[];
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
    (set) => ({
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
      // actionCreateVoucher: async (data) => {
      //   // const createVoucherMutation = useCreateVoucher();
      //   // const result = await createVoucherMutation.mutateAsync(data);
      //   // console.log('result :>> ', result);
      //   // if (!result || !result.data) {
      //   //   throw new Error('Voucher creation failed: missing data');
      //   // }
      //   // const body = result.data;
      //   return;
      // },
      setVoucher: (vouchers: VoucherDataSchema[]) => set({ vouchers }),
      setRestaurant: (restaurants: Restaurant[]) => set({ restaurants }),
      setMeal: (meals: Restaurant[]) => set({ meals }),
      addVoucher: (voucher: VoucherDataSchema) =>
        set((state) => ({ vouchers: [...state.vouchers, voucher] })),
      // updateVoucher: (id: number, updatedVoucher: Partial<Voucher>) =>
      //   set((state) => ({
      //     vouchers: state.vouchers.map((v) => {
      //       if (v.id === id) {
      //         return {
      //           ...v,
      //           ...updatedVoucher,
      //         };
      //       }
      //       return v;
      //     }),
      //   })),

      // createVoucher: (newVoucher: Omit<Voucher, 'id'>) =>
      //   set((state) => {
      //     const newId = Math.max(0, ...state.vouchers.map((v) => v.id)) + 1;
      //     const voucherWithId = { id: newId, ...newVoucher };

      //     return { vouchers: [...state.vouchers, voucherWithId] };
      //   }),
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
      sanitizeCreateVoucherDataBeforeCreate(data: CreateVoucherData) {
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

        if (
          ObjectHelper.isObjectEmpty(data.mainImg) ||
          !(data.mainImg.srcFile && data.mainImg.srcFile instanceof File) ||
          !data.mainImg.srcStr
        )
          missingFields.push('mainImg');

        const dataToCheck: CreateVoucherDataSchema = {
          ...data,
          mainImg: data.mainImg.srcFile,
        };
        if (data.otherImgs && data.otherImgs.length > 0) {
          dataToCheck.voucherImg = data.otherImgs
            .filter(
              (item): item is ImageWithPreviewSrcType & { srcFile: File } =>
                !!item && !!item.srcFile,
            )
            .map(({ srcFile }) => srcFile);
        }

        missingFields.push(
          ...ObjectHelper.checkAndReturnEmptyFields<CreateVoucherDataSchema>(
            requiredFields,
            dataToCheck,
          ),
        );

        if (data.otherImgs && data.otherImgs.length > 0) {
          dataToCheck.voucherImg = data.otherImgs
            .filter(
              (item): item is ImageWithPreviewSrcType & { srcFile: File } =>
                !!item && !!item.srcFile,
            )
            .map(({ srcFile }) => srcFile);
        }

        const reqFormData = makeFormData<CreateVoucherDataSchema>(dataToCheck);
        return { data: reqFormData, missingFields };
      },
    }),
    {
      name: 'voucher-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useVoucherStore;
