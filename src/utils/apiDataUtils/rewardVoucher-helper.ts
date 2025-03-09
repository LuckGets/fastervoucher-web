import { PackageDataSchema } from '@/data-schema/package.type';
import { CreateVoucherData } from '@/stores/voucher-store';

export type CreateRewardVoucherImage = Record<PackageDataSchema['id'], File>;

export function prepareCreateRewardVouchersImage(
  data: CreateVoucherData['rewardVouchers'],
): CreateRewardVoucherImage[] {
  const createRewardVoucherImages: CreateRewardVoucherImage[] = [];

  if (data.length > 0) {
    for (const item of data) {
      if (!item.previewImg?.srcFile) continue;
      const createImage: CreateRewardVoucherImage = {};
      createImage[item.voucherId] = item.previewImg.srcFile;
      createRewardVoucherImages.push(createImage);
    }
  }

  return createRewardVoucherImages;
}
