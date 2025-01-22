interface OutletSalesType {
  id: number;
  name: string;
  voucher: number;
  sales: number;
}

export const outletSales: OutletSalesType[] = [
  {
    id: 1,
    name: 'Coffee Shop',
    voucher: 3789,
    sales: 15348,
  },
  {
    id: 2,
    name: 'Yok Chinese Restaurant',
    voucher: 2789,
    sales: 13348,
  },
  {
    id: 3,
    name: 'Health club',
    voucher: 1200,
    sales: 5896,
  },
];
