import {
  CreateVoucherData,
  ImageWithPreviewSrcType,
} from '@/stores/voucher-store';

type CreateVoucherImg = {
  mainImg: File;
  voucherImg?: File[];
};

export function sanitizeVoucherImagesFromCreateData(
  data: CreateVoucherData,
): CreateVoucherImg {
  const { mainImg, otherImgs } = data;
  if (!mainImg.srcFile)
    throw new Error(
      'In the extrachVoucherImagesFromData, there is no provided main image for voucher.',
    );
  const result: CreateVoucherImg = { mainImg: mainImg.srcFile };

  if (otherImgs && otherImgs.length > 0) {
    result.voucherImg = otherImgs
      .filter(
        (item): item is ImageWithPreviewSrcType & { srcFile: File } =>
          !!item && !!item.srcFile,
      )
      .map(({ srcFile }) => srcFile);
  }

  return result;
}
