interface affiliate {
  id: number;
  name: string;
  email: string;
  click: number;
  sales: number;
  com: number;
  created: string;
  status: 'Active' | 'Inactive';
}

export const affiliate: affiliate[] = [
  {
    id: 1,
    name: 'KONJENGz Creative',
    email: 'konjeng.mkt@gmail.com',
    click: 2000,
    sales: 1452,
    com: 10,
    created: '2024-11-20 14:30:00',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'Jane.Doe@gmail.com',
    click: 4521,
    sales: 4120,
    com: 10,
    created: '2024-11-20 14:30:00',
    status: 'Active',
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'John.Doe@gmail.com',
    click: 3542,
    sales: 3200,
    com: 10,
    created: '2024-11-20 14:30:00',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Anna Doe',
    email: 'Anna@gmail.com',
    click: 5421,
    sales: 2135,
    com: 10,
    created: '2024-11-20 14:30:00',
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Bobby Doe',
    email: 'Bobby.Doe@gmail.com',
    click: 2000,
    sales: 1452,
    com: 10,
    created: '2024-11-20 14:30:00',
    status: 'Inactive',
  },
];
