import { ChevronDown, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import useVoucherStore from '../../../../stores/voucher-store';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/config/path';
import { Restaurant } from '@/data-schema/restaurant.type';

interface SearchVoucherProps {
  selectedRestaurant?: string;
  setSelectedRestaurant: (restaurantId: string, restaurantName: string) => void;
}

const defaultSelectedRestaurantObj: Pick<Restaurant, 'id' | 'name'> = {
  id: 'DEFAULT',
  name: 'All Restaurants',
};

const SearchVoucher: React.FC<SearchVoucherProps> = ({
  selectedRestaurant,
  setSelectedRestaurant,
}) => {
  const navigate = useNavigate();
  const { restaurants } = useVoucherStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const restaurantsAndDefault: Pick<Restaurant, 'id' | 'name'>[] = [
    defaultSelectedRestaurantObj,
    ...restaurants,
  ];

  const handleRemoveFilter = () => {
    setSelectedRestaurant('', '');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedRestaurant('', '');
  };

  const handleCreateVoucher = () => {
    navigate(`${paths.admin.createVoucher.path}`);
  };

  return (
    <div className="mb-6 mr-10 space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2">
            <input
              type="text"
              placeholder="Voucher Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-[30rem] rounded-full border bg-[#E1E1E1] p-2 pl-3 focus:outline-none focus:ring-2 focus:ring-[#2BB673]`}
            />
            <Search className="absolute left-[46rem]" />
          </div>
          <div className="relative flex gap-3">
            <button
              onClick={handleClearSearch}
              className="flex rounded-full bg-[#E1E1E1] px-6 py-2 text-text hover:bg-[#a3a3a3a0]"
            >
              <h1>all voucher</h1>
            </button>
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="flex items-center gap-4 rounded-full border bg-[#E1E1E1] px-4 py-2 hover:bg-[#a3a3a3a0] focus:outline-none focus:ring-2 focus:ring-[${color}]"
            >
              <h1>stores / restaurant</h1>
              <ChevronDown />
            </button>
            {isFilterDropdownOpen && (
              <div className="absolute right-0 top-10 z-20 mt-2 w-60 rounded-lg border bg-[#E1E1E1] shadow-lg">
                <div className="p-2">
                  {restaurantsAndDefault.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedRestaurant(
                          item.id === defaultSelectedRestaurantObj.id
                            ? ''
                            : item.id,
                          item.name,
                        );
                        setIsFilterDropdownOpen(false);
                      }}
                      className="block w-full rounded px-4 py-2 text-left hover:bg-[#a3a3a3a0]"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleCreateVoucher}
          className="flex rounded-full bg-[#2BB673] px-4 py-2 text-[#F7F3ED]"
        >
          <Plus />
          Create Voucher
        </button>
      </div>

      {selectedRestaurant && (
        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
            <span className="text-green-700">
              Restaurant: {selectedRestaurant}
            </span>
            <button
              onClick={handleRemoveFilter}
              className="text-green-700 hover:text-green-900"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchVoucher;
