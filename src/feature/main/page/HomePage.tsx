import Voucher from '@/feature/main/components/Voucher';
// import MainCarousel from '../components/MainCarousel';
import CarouselV2 from '../components/CarouselV2';
import FilterRestaurant from '../components/FilterRestaurant';

const HomePage = () => {
  return (
    <div>
      <CarouselV2 />
      <FilterRestaurant />
      <Voucher />
    </div>
  );
};

export default HomePage;
