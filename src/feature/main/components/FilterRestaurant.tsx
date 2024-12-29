import useSettingStore from '@/stores/setting-store';

interface FilterRestaurantProps {
  selectedRestaurant: string | null;
  setSelectedRestaurant: (restaurant: string | null) => void;
}

const FilterRestaurant = ({
  selectedRestaurant,
  setSelectedRestaurant,
}: FilterRestaurantProps) => {
  const restaurant = useSettingStore((state) => state.restaurant);
  const color = useSettingStore((state) => state.color);

  const bgColor = color ? color : '#D1D5DB';

  const handleActive = (restaurantName: string | null) => {
    setSelectedRestaurant(restaurantName);
  };

  return (
    <div className="my-4 flex items-center justify-center gap-2 px-4 text-xs text-text">
      <div
        className={`flex h-10 items-center justify-center rounded-3xl bg-[#D9D9D9] px-2 ${
          selectedRestaurant === null ? 'text-textWhite' : ''
        }`}
        style={selectedRestaurant === null ? { backgroundColor: bgColor } : {}}
        onClick={() => handleActive(null)}
      >
        <button>All</button>
      </div>
      {restaurant.map((item, index) => (
        <div
          key={index}
          className={`flex h-10 items-center justify-center rounded-full bg-[#D9D9D9] px-2 ${
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
