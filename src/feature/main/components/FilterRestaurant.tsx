import { Restaurant } from '../../../data-schema/restaurant.type';
import useSettingStore from '../../../stores/setting-store';

interface FilterRestaurantProps {
  defaultRestaurant: Restaurant['name'];
  selectedRestaurant: string | null;
  setSelectedRestaurant: ({
    id,
    name,
  }: {
    id: Restaurant['id'];
    name: Restaurant['name'];
  }) => void;
  restaurants: Restaurant[];
}

const FilterRestaurant = ({
  defaultRestaurant,
  selectedRestaurant,
  setSelectedRestaurant,
  restaurants,
}: FilterRestaurantProps) => {
  const color = useSettingStore((state) => state.color);

  const bgColor = color ? color : '#D1D5DB';

  const handleActive = (id: Restaurant['id'], name: Restaurant['name']) => {
    setSelectedRestaurant({ id, name });
  };

  return (
    <div className="my-4 flex flex-shrink flex-wrap items-center gap-2 px-4 text-xs md:px-12 lg:justify-start lg:gap-4 lg:px-10 lg:text-sm">
      {/* Button for "All" */}
      <div
        className={`flex h-10 min-w-[60px] items-center justify-center rounded-3xl bg-[#D9D9D9] px-4 lg:min-w-[80px] ${
          selectedRestaurant === defaultRestaurant ? `text-textWhite` : ''
        }`}
        style={
          selectedRestaurant === defaultRestaurant
            ? { backgroundColor: bgColor }
            : {}
        }
        onClick={() => handleActive('', defaultRestaurant)}
      >
        <button>{defaultRestaurant}</button>
      </div>

      {/* Buttons for Restaurants */}
      {restaurants?.map((item, index) => (
        <div
          key={index}
          className={`flex h-10 min-w-[80px] items-center justify-center rounded-3xl bg-[#D9D9D9] px-4 ${
            selectedRestaurant === item.name ? 'text-textWhite' : ''
          }`}
          style={
            selectedRestaurant === item.name ? { backgroundColor: bgColor } : {}
          }
          onClick={() => handleActive(item.id, item.name)}
        >
          <button>{item.name}</button>
        </div>
      ))}
    </div>
  );
};

export default FilterRestaurant;
