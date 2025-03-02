import { commonQueryOptionsMapper, IPaginationOption } from './common.type';
import { Meal } from './meal.type';
import { Restaurant } from './restaurant.type';

export enum ProductStatusQueryEnum {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ProductStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ProductSellDateQueryEnum {
  ALL = 'ALL',
  EXPIRED = 'EXPIRED',
  NOW = 'NOW',
}

export enum ProductDiscountQueryEnum {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  NONE = 'NONE',
}

export enum ProductDiscountEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type ProductImageDataSchema = {
  id: string;
  imgPath: string;
  mainImg: boolean;
};

export interface IGetManyProductQueriesOptions extends IPaginationOption {
  status?: ProductStatusQueryEnum;
  discount?: ProductDiscountQueryEnum;
  sellDate?: ProductSellDateQueryEnum;
  restaurantId?: Restaurant['id'];
  meal?: Meal['id'];
}

export const getManyProductQueriesOptionMapper = (
  options: IGetManyProductQueriesOptions,
): string[] => {
  const { limit, page, ...restQueries } = options;
  const queriesArr: string[] = [];

  const queryMap: Record<keyof IGetManyProductQueriesOptions, string> = {
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
        `${queryMap[key as keyof IGetManyProductQueriesOptions]}=${value}`,
      );
  }

  return queriesArr;
};

export interface ProductDataSchema {
  id: string;
  title: string;
  price: number;
  description: string;
  termAndCondition: string;
  status: ProductStatusEnum;
  discount?: Discount;
  stockAmount: number;
  sellStartAt: string;
  sellExpiredAt: string;
  usableAt: string;
  usableExpiredAt: string;
  category: Restaurant['name'];
  tag: Meal['name'];
  images: ProductImageDataSchema[];
}

export type Discount = {
  id: string;
  discountedPrice: number;
  status: ProductDiscountEnum;
};
