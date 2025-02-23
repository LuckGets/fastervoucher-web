import { Restaurant } from './restaurant.type';

type Account = {
  id: string;
  email: string;
  fullname: string;
  phone: string;
  verifiedAt: string | null;
  role: string;
};

type Detail = {
  voucherId: string;
  title: string;
  price: number;
  category: Restaurant['name'];
  discountId: number;
};

export interface OrderItems {
  id: string;
  qrcodeImagePath: string;
  code: string;
  usableAt: string;
  usableExpiredAt: string;
  redeemedAt: string | null;
  detail: Detail;
}

export interface OrderDataSchema {
  id: string;
  totalPrice: number;
  account: Account;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  transaction: string | null;
  orderItems: number;
  sellStartAt: string;
  sellExpiredAt: string;
  usableAt: string;
  usableExpiredAt: string;
  category: Restaurant['name'];
  tag: Meal['name'];
  images: ProductImageDataSchema[];
}
