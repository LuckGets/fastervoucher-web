import { useState } from 'react';
import { affiliate } from '@/utils/affiliate/affiliateList';
import AffiliateModal from './AffiliateModal';
import { UserRound, Search, UserRoundPlus } from 'lucide-react';

interface AffiliateFilterProps {
  onSearch: (term: string) => void;
  onStatusChange: (status: 'All' | 'Active' | 'Inactive') => void;
  onCreateAffiliate: (data: {
    name: string;
    email: string;
    status: 'Active' | 'Inactive';
  }) => void;
}

const AffiliateFilter = ({
  onSearch,
  onStatusChange,
  onCreateAffiliate,
}: AffiliateFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStatus, setCurrentStatus] = useState<
    'All' | 'Active' | 'Inactive'
  >('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleStatusClick = (status: 'All' | 'Active' | 'Inactive') => {
    setCurrentStatus(status);
    onStatusChange(status);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateAffiliate = (data: {
    name: string;
    email: string;
    status: 'Active' | 'Inactive';
  }) => {
    onCreateAffiliate(data);
  };

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="mb-4 flex gap-2">
        <button
          className={`flex items-center gap-2 rounded-full px-4 py-2 ${
            currentStatus === 'All'
              ? 'bg-[#2BB673] text-white'
              : 'bg-[#E1E1E1] text-[#3F3F3F]'
          }`}
          onClick={() => handleStatusClick('All')}
        >
          <span>{affiliate.length}</span>
          <UserRound />
          <span>All</span>
        </button>
        <button
          className={`flex items-center gap-2 rounded-full px-4 py-2 ${
            currentStatus === 'Active'
              ? 'bg-[#2BB673] text-white'
              : 'bg-[#E1E1E1] text-[#3F3F3F]'
          }`}
          onClick={() => handleStatusClick('Active')}
        >
          <span>{affiliate.filter((a) => a.status === 'Active').length}</span>
          <UserRound />
          <span>Active</span>
        </button>
        <button
          className={`flex items-center gap-2 rounded-full px-4 py-2 ${
            currentStatus === 'Inactive'
              ? 'bg-[#2BB673] text-white'
              : 'bg-[#E1E1E1] text-[#3F3F3F]'
          }`}
          onClick={() => handleStatusClick('Inactive')}
        >
          <span>{affiliate.filter((a) => a.status === 'Inactive').length}</span>
          <UserRound />
          <span>Inactive</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Name / email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full rounded-full border bg-[#E1E1E1] p-2 pl-3 focus:outline-none focus:ring-2 focus:ring-[#2BB673]"
        />
        <button
          onClick={handleSearchClick}
          className="flex rounded-full bg-[#E1E1E1] px-6 py-2 text-text hover:bg-[#a3a3a3a0]"
        >
          <Search />
          <h1>Search</h1>
        </button>
      </div>
      <div>
        <button
          onClick={handleModalOpen}
          className="flex items-center gap-2 rounded-full bg-[#2BB673] px-4 py-2 text-white"
        >
          <UserRoundPlus />
          <span>Affiliate</span>
        </button>
      </div>
      <AffiliateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateAffiliate}
      />
    </div>
  );
};

export default AffiliateFilter;
