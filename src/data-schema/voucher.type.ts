import { Meal } from './meal.type';
import { Discount, ProductDataSchema } from './product.type';

export type VoucherDataSchema = ProductDataSchema;

export type CreateVoucherDataSchema = {
  title: VoucherDataSchema['title'];
  description: VoucherDataSchema['description'];
  price: VoucherDataSchema['price'];
  termAndCondition: VoucherDataSchema['termAndCondition'];
  stockAmount: VoucherDataSchema['stockAmount'];
  usableAt: VoucherDataSchema['usableAt'];
  usableExpiredAt: VoucherDataSchema['usableExpiredAt'];
  sellStartedAt: VoucherDataSchema['sellStartAt'];
  sellExpiredAt: VoucherDataSchema['sellExpiredAt'];
  tagId: Meal['id'];
  discountedPrice?: Discount['discountedPrice'];
  mainImg: File | null;
  status: VoucherDataSchema['status'];
  voucherImg?: File[];
};

export enum VoucherStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
