import { ProductDataSchema } from './product.type';

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

export function isProductPackageType(
  product: ProductDataSchema,
): product is PackageDataSchema {
  return 'quotaVouchers' in product;
}
