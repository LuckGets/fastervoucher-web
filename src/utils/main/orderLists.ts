interface Voucher {
  no: string;
  isUse: boolean;
  expireDate: string;
  useDate?: string;
}

interface OrderDetail {
  id: number;
  src: string;
  name: string;
  restaurant: string;
  quantity: number;
  free?: number;
  channels: string;
  vouchers: Voucher[];
  freeVoucher?: Voucher[];
  customer: string;
}

interface OrderListItem {
  orderId: string;
  date: string;
  OrderDetails: OrderDetail[];
}

export const orderLists: OrderListItem[] = [
  {
    orderId: 'P49567945',
    date: '2024-11-19 23:59:59',
    OrderDetails: [
      {
        id: 12,
        src: 'https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg',
        name: 'Premium Sushi & Seafood Buffet Dinner',
        restaurant: 'The Emerald Coffee Shop',
        quantity: 3,
        free: 1,
        channels: 'Line Shopping',
        customer: ' Thaweevit kittanmeteeee',
        vouchers: [
          {
            no: 'e2024BDN-079',
            isUse: false,
            expireDate: '2024-11-30 23:59:59',
          },
          {
            no: 'e2024BDN-080',
            isUse: true,
            expireDate: '2025-12-31 23:59:59',
            useDate: '2024-11-20 14:30:00',
          },
          {
            no: 'e2024BDN-081',
            isUse: false,
            expireDate: '2025-12-31 23:59:59',
          },
        ],
        freeVoucher: [
          {
            no: 'e2024BDN-082',
            isUse: false,
            expireDate: '2024-12-31 23:59:59',
          },
        ],
      },
    ],
  },
  {
    orderId: 'P49567946',
    date: '2024-10-20 23:59:59',
    OrderDetails: [
      {
        id: 13,
        src: 'https://scontent.fbkk5-7.fna.fbcdn.net/v/t1.6435-9/52980043_603300676797601_1693792066246541312_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=PXT7OHoGEHgQ7kNvgHKW0Lf&_nc_zt=23&_nc_ht=scontent.fbkk5-7.fna&_nc_gid=A8qsz90gRkMUIreCXR8wlGP&oh=00_AYCeOxirU8OYlV6NfNGJSL6-GqX7Oxhz_2a-FTmbhD6P6Q&oe=67711FB1',
        name: 'All You can eat dim sum lunch',
        restaurant: 'Yok Chinese Restaurant',
        quantity: 2,
        channels: 'Shopee',
        customer: 'Sasita Srisura',
        vouchers: [
          {
            no: 'e2024BDN-060',
            isUse: false,
            expireDate: '2024-11-30 23:59:59',
          },
          {
            no: 'e2024BDN-062',
            isUse: true,
            expireDate: '2025-12-31 23:59:59',
            useDate: '2024-11-20 14:30:00',
          },
        ],
      },
    ],
  },
];
