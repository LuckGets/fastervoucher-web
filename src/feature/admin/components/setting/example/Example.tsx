import { useState } from 'react';
import Footer from './Footer';
import FilterRestaurant from '@/feature/main/components/FilterRestaurant';
import Voucher from './Voucher';
import Header from './Header';
import Carousel from './Carousel';

const Example = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null,
  );

  return (
    <div className="flex h-[1008px] w-[440px] flex-col rounded-2xl border border-[#888888]">
      <Header />
      <main className="flex flex-grow flex-col gap-4">
        <Carousel />
        <FilterRestaurant
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
        />
        <Voucher />
      </main>
      <Footer />
    </div>
  );
};

export default Example;
