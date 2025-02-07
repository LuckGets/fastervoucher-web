import { IGetManyVoucherQueryOption } from '@/api/voucher/voucher-query';
import { commonQueryOptionsMapper } from './common.type';
import { Meal, Restaurant } from './restaurant.type';

export type VoucherDataSchema = {
  id: string;
  title: string;
  price: number;
  description: string;
  termAndCondition: string;
  status: VoucherStatusEnum;
  discount?: Discount;
  stockAmount: number;
  sellStartAt: string;
  sellExpiredAt: string;
  usableAt: string;
  usableExpiredAt: string;
  category: Restaurant['name'];
  tag: Meal['name'];
  img: VoucherImage[];
};

export type CreateVoucherDataSchema = {
  title: VoucherDataSchema['title'];
  description: VoucherDataSchema['description'];
  price: VoucherDataSchema['price'];
  termAndCond: VoucherDataSchema['termAndCondition'];
  stockAmount: VoucherDataSchema['stockAmount'];
  usableAt: VoucherDataSchema['usableAt'];
  usableExpiredAt: VoucherDataSchema['usableExpiredAt'];
  sellStartedAt: VoucherDataSchema['sellStartAt'];
  sellExpiredAt: VoucherDataSchema['sellExpiredAt'];
  tagId: Meal['id'];
  discountedPrice?: Discount['discountedPrice'];
  mainImg: File | null;
};

export enum VoucherStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

type Discount = {
  id: string;
  discountedPrice: number;
  status: DiscountStatusEnum;
};

type VoucherImage = {
  id: string;
  imgPath: string;
  mainImg: boolean;
};

export enum DiscountStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'inactive',
}

export const getManyVoucherQueriesOptionMapper = (
  options: IGetManyVoucherQueryOption,
): string[] => {
  const { limit, page, ...restQueries } = options;
  const queriesArr: string[] = [];

  const queryMap: Record<keyof IGetManyVoucherQueryOption, string> = {
    status: 's',
    discount: 'd',
    limit: 'lm',
    meal: 't',
    restaurantId: 'c',
    sellDate: 'sd',
    page: 'p',
  };

  if (limit || page)
    queriesArr.push(...commonQueryOptionsMapper({ limit, page }));

  for (const [key, value] of Object.entries(restQueries)) {
    if (value)
      queriesArr.push(
        `${queryMap[key as keyof IGetManyVoucherQueryOption]}=${value}`,
      );
  }

  return queriesArr;
};
