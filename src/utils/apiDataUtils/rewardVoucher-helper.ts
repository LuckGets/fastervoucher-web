import { PackageDataSchema } from '@/data-schema/package.type';
import { CreateVoucherData } from '@/stores/voucher-store';

export type CreateRewardVoucherImage = Record<PackageDataSchema['id'], File>;

export function prepareCreateRewardVouchersImage(
  data: CreateVoucherData['rewardVouchers'],
): CreateRewardVoucherImage {
  const createRewardVoucherImages: CreateRewardVoucherImage = {};

  if (data.length > 0) {
    for (const item of data) {
      const file = item.previewImg?.srcFile;
      if (!file || !(file instanceof File)) continue;
      createRewardVoucherImages[item.voucherId] = file;
    }
  }

  return createRewardVoucherImages;
}
