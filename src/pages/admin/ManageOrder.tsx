import { useState } from 'react';
import SearchBar from '../../feature/admin/components/manageOrder/SearchBar';
import VoucherTable from '../../feature/admin/components/manageOrder/VoucherTable';

const ManageOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="w-full">
      <SearchBar onSearch={handleSearch} />
      <VoucherTable searchTerm={searchTerm} />
    </div>
  );
};

export default ManageOrder;
