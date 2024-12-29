import { useState } from 'react';
import SearchBar from './components/manageOrder/SearchBar';
import VoucherTable from './components/manageOrder/VoucherTable';

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
