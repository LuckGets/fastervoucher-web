import { useState } from 'react';
import AffiliateFilter from './AffiliateFilter';
import AffiliateTable from './AffiliateTable';

const AffiliateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'All' | 'Active' | 'Inactive'
  >('All');

  const handleSearch = (term: string) => setSearchTerm(term);
  const handleStatusChange = (status: 'All' | 'Active' | 'Inactive') =>
    setStatusFilter(status);

  const handleCreateAffiliate = (data: {
    name: string;
    email: string;
    status: 'Active' | 'Inactive';
  }) => {
    console.log('Affiliate Created:', data);
  };

  return (
    <div className="flex flex-col">
      <AffiliateFilter
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onCreateAffiliate={handleCreateAffiliate}
      />
      <AffiliateTable searchTerm={searchTerm} statusFilter={statusFilter} />
    </div>
  );
};

export default AffiliateList;
