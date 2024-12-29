import { useState } from 'react';
import SearchVoucher from './components/manageVoucher/SearchVoucher';
import Voucher from './components/manageVoucher/Voucher';

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
