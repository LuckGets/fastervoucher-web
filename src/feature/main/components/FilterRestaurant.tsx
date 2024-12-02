import { restaurant } from '@/utils/main/restaurant';

const FilterRestaurant = () => {
  return (
    <div className="my-4 flex items-center justify-center gap-2 px-4 text-xs text-text">
      <div className="flex h-10 items-center justify-center rounded-3xl bg-[#D9D9D9] px-2 active:bg-primary active:text-textWhite">
        <button>All</button>
      </div>
      {restaurant.map((item, index) => (
        <div
          key={index}
          className="flex h-10 items-center justify-center rounded-full bg-[#D9D9D9] px-2 active:bg-primary active:text-textWhite"
        >
          <button>{item.name}</button>
        </div>
      ))}
    </div>
  );
};

export default FilterRestaurant;
