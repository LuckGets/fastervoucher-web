interface voucher {
  id: number;
  name: string;
  price: string;
  promotion?: string;
  restaurant: string;
}

export const vouchers: voucher[] = [
  {
    id: 1,
    name: 'Premium Sushi & Seafood Buffet Dinner',
    price: 'THB 1,800++',
    promotion: 'THB 1,199 NET',
    restaurant: 'Coffee Shop',
  },
  {
    id: 2,
    name: 'Premium Sushi & Seafood Buffet Dinner',
    price: 'THB 1,800++',
    restaurant: 'Coffee Shop',
  },
  {
    id: 3,
    name: 'Premium Sushi & Seafood Buffet Dinner',
    price: 'THB 1,800++',
    restaurant: 'Coffee Shop',
  },
  {
    id: 4,
    name: 'Premium Sushi & Seafood Buffet Dinner',
    price: 'THB 1,800++',
    promotion: 'THB 1,199 NET',
    restaurant: 'Yok Chinese Restaurant',
  },
  {
    id: 5,
    name: 'Premium Sushi & Seafood Buffet Dinner',
    price: 'THB 1,800++',
    promotion: 'THB 1,199 NET',
    restaurant: 'Yok Chinese Restaurant',
  },
  {
    id: 6,
    name: 'Premium Sushi & Seafood Buffet Dinner',
    price: 'THB 1,800++',
    restaurant: 'Yok Chinese Restaurant',
  },
];
