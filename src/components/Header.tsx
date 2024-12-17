import useSettingStore from '@/stores/setting-store';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const logoImage = useSettingStore((state) => state.logoImage);

  return (
    <>
      {location.pathname !== '/' && (
        <div className="max-w-screen z-40 flex h-20 justify-center md:h-32">
          <div>
            <img src={logoImage} alt="Logo" className="h-full object-contain" />
          </div>
        </div>
      )}

      {location.pathname === '/' && (
        <div className="z-40 flex h-24 w-[100vh] justify-between overflow-x-hidden bg-[#F7F3ED] px-8 py-2">
          <div className="flex w-full items-center gap-3">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9]">
              <img
                src={logoImage}
                alt=""
                className="h-full w-full object-scale-down"
              />
            </div>
            <div className="relative w-full">
              <h1 className="text-lg">The Emerald Hotel</h1>
              <div>
                <input
                  className="w-full rounded-full bg-[#E1E1E1] p-1 pl-5 pr-4 focus:border-primary"
                  placeholder="Find your favorite menu"
                  type="text"
                  name=""
                  id=""
                />
                <Search className="absolute right-3 top-3/4 -translate-y-1/2 transform text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
