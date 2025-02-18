import { Discount, ProductDataSchema } from './product.type';
import { Meal } from './restaurant.type';

export type VoucherDataSchema = ProductDataSchema;

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
  status: VoucherDataSchema['status'];
};

export enum VoucherStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
