import NullableType from '@/utils/types/nullable.type';
import { Meal } from './meal.type';
import { Discount, ProductDataSchema } from './product.type';

export type PackageDataSchema = ProductDataSchema & {
  quotaVouchers: PackageQuotaVoucher;
  rewardVouchers?: PackageRewardVoucher;
};

type PackageQuotaVoucher = {
  id: string;
  voucherId: string;
  amount: number;
};

type PackageRewardVoucher = {
  id: string;
  voucherId: string;
  amount: number;
  img?: string;
};

export type CreatePackageDataSchema = {
  title: PackageDataSchema['title'];
  description: PackageDataSchema['description'];
  termAndCondition: PackageDataSchema['termAndCondition'];
  quotaVouchers: Omit<PackageQuotaVoucher, 'id'>[];
  rewardVouchers: Omit<PackageRewardVoucher, 'id' | 'img'>[];
  price: PackageDataSchema['price'];
  stockAmount: PackageDataSchema['stockAmount'];
  sellStartedAt: PackageDataSchema['sellStartAt'];
  sellExpiredAt: PackageDataSchema['sellExpiredAt'];
  usableAt: PackageDataSchema['usableAt'];
  usableExpiredAt: PackageDataSchema['usableExpiredAt'];
  tagId: Meal['id'];
  discountedPrice?: Discount['discountedPrice'];
  mainImg: NullableType<File>;
  packageImg?: File[];
  status: PackageDataSchema['status'];
};

export function isProductPackageType(
  product: ProductDataSchema,
): product is PackageDataSchema {
  return 'quotaVouchers' in product;
}
