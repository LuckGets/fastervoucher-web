import { useState } from 'react';
import useSettingStore from '@/stores/setting-store';

const FilterRestaurant = () => {
  const restaurant = useSettingStore((state) => state.restaurant);
  const color = useSettingStore((state) => state.color);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const bgColor = color ? color : '#D1D5DB';

  const handleActive = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="my-4 flex items-center justify-center gap-2 px-4 text-xs text-text">
      <div
        className={`flex h-10 items-center justify-center rounded-3xl bg-[#D9D9D9] px-2 ${
          activeIndex === -1 ? 'text-textWhite' : ''
        }`}
        style={activeIndex === -1 ? { backgroundColor: bgColor } : {}}
        onClick={() => handleActive(-1)}
      >
        <button>All</button>
      </div>
      {restaurant.map((item, index) => (
        <div
          key={index}
          className={`flex h-10 items-center justify-center rounded-full bg-[#D9D9D9] px-2 ${
            activeIndex === index ? 'text-textWhite' : ''
          }`}
          style={activeIndex === index ? { backgroundColor: bgColor } : {}}
          onClick={() => handleActive(index)}
        >
          <button>{item.name}</button>
        </div>
      ))}
    </div>
  );
};

export default FilterRestaurant;
