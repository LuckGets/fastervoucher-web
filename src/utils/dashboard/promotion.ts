export interface PromotionType {
  id: number;
  name: string;
  sales: number;
  amount: number;
  redeemed: number;
  expired: number;
  salesDate: number;
  useDate: number;
}

export const promotion: PromotionType[] = [
  {
    id: 1,
    name: 'ไทยเที่ยวไทยครั้งที่ 77',
    sales: 123452,
    amount: 500,
    redeemed: 50,
    expired: 24,
    salesDate: 14,
    useDate: 60,
  },
  {
    id: 2,
    name: '11.11 Dim sum',
    sales: 200000,
    amount: 200,
    redeemed: 100,
    expired: 100,
    salesDate: 20,
    useDate: 90,
  },
  {
    id: 3,
    name: 'Valentine’s day',
    sales: 45266,
    amount: 300,
    redeemed: 150,
    expired: 0,
    salesDate: 30,
    useDate: 40,
  },
  {
    id: 4,
    name: 'All you can eat Dim Sum',
    sales: 3000,
    amount: 300,
    redeemed: 150,
    expired: 150,
    salesDate: 30,
    useDate: 70,
  },
];
