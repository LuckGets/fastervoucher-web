import { useEffect } from 'react';
import useSettingStore from '@/stores/setting-store';
import useVoucherStore from '@/stores/voucher-store';

interface FilterRestaurantProps {
  selectedRestaurant: string | null;
  setSelectedRestaurant: (restaurant: string | null) => void;
}

const FilterRestaurant = ({
  selectedRestaurant,
  setSelectedRestaurant,
}: FilterRestaurantProps) => {
  const { actionGetCategoriesAndTags, categories } = useVoucherStore();
  const { color } = useSettingStore();

  const bgColor = color ? color : '#D1D5DB';

  useEffect(() => {
    actionGetCategoriesAndTags();
  }, [actionGetCategoriesAndTags]);

  const handleActive = (restaurantName: string | null) => {
    setSelectedRestaurant(restaurantName);
    console.log('filtering vouchers by:', restaurantName);
  };

  return (
    <div className="my-4 flex flex-shrink flex-wrap items-center gap-2 px-4 text-xs lg:justify-start lg:gap-4 lg:px-10 lg:text-sm">
      {/* Button for "All" */}
      <div
        className={`flex h-10 min-w-[60px] items-center justify-center rounded-3xl bg-[#D9D9D9] px-4 lg:min-w-[80px] ${
          selectedRestaurant === null ? 'text-textWhite' : ''
        }`}
        style={selectedRestaurant === null ? { backgroundColor: bgColor } : {}}
        onClick={() => handleActive(null)}
      >
        <button>All</button>
      </div>

      {/* Buttons for Restaurants */}
      {categories.map((item, index) => (
        <div
          key={index}
          className={`flex h-10 min-w-[80px] items-center justify-center rounded-3xl bg-[#D9D9D9] px-4 ${
            selectedRestaurant === item.name ? 'text-textWhite' : ''
          }`}
          style={
            selectedRestaurant === item.name ? { backgroundColor: bgColor } : {}
          }
          onClick={() => handleActive(item.name)}
        >
          <button>{item.name}</button>
        </div>
      ))}
    </div>
  );
};

export default FilterRestaurant;
