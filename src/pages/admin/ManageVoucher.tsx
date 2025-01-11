import { useState } from 'react';

import Voucher from '../../feature/admin/components/manageVoucher/Voucher';
import SearchVoucher from '@/feature/admin/components/manageVoucher/SearchVoucher';

const ManageVoucher = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  return (
    <div className="w-full">
      <SearchVoucher
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
      />
      <Voucher selectedRestaurant={selectedRestaurant} />
    </div>
  );
};

export default ManageVoucher;
