import useVoucherStore from '../stores/voucher-store';
import useCartStore from '../stores/cart-store';
import useSettingStore from '../stores/setting-store';
import { footerLinks } from '../utils/main/footerLinks';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const { logoImage } = useSettingStore();
  const { items } = useCartStore();
  const { setSearchTerm } = useVoucherStore();

  const [search, setSearch] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  const cartHasItems = items.length > 0;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      setSearchTerm(newSearch);
      console.log('search :>> ', newSearch);
    }, 1000);

    setDebounceTimer(timer);
  };

  useEffect(() => {
    if (search === '') {
      setSearchTerm('');
    }
  }, [search, setSearchTerm]);

  return (
    <>
      {/* Header for non-home pages */}
      {location.pathname !== '/' && (
        <div className="z-40 flex h-24 w-full items-center justify-center bg-[#F7F3ED] px-8 py-2 lg:fixed lg:justify-between lg:px-16">
          <div className="flex lg:hidden">
            <img src={logoImage} alt="Logo" className="h-full object-contain" />
          </div>
          <div className="hidden w-full items-center gap-4 lg:flex lg:gap-8">
            {/* Logo */}
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9] lg:h-20 lg:w-20">
              <img
                src={logoImage}
                alt="Logo"
                className="h-full w-full object-scale-down"
              />
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
              <h1 className="text-lg font-semibold lg:text-2xl">
                The Emerald Hotel
              </h1>
            </div>
          </div>

          {/* Footer Links */}
          <div className="hidden lg:flex lg:gap-6">
            {footerLinks.map((i, index) => {
              const isActive = location.pathname === i.href;

              return (
                <div
                  key={index}
                  className={`relative flex h-16 w-16 flex-col items-center justify-center rounded-full p-2 transition ${
                    isActive
                      ? 'text-[#2BB673]'
                      : 'text-gray-700 hover:text-[#41c082]'
                  }`}
                >
                  <Link
                    to={i.href}
                    className="flex flex-col items-center gap-1 text-center"
                  >
                    <i.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                    <p className="text-xs lg:text-sm">{i.label}</p>
                  </Link>

                  {/* Cart Badge */}
                  {i.href === '/cart' && cartHasItems && (
                    <span className="absolute right-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F87171] text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Header for home page */}
      {location.pathname === '/' && (
        <div className="z-40 flex h-24 w-full items-center justify-between bg-[#F7F3ED] px-8 py-2 lg:fixed lg:px-16">
          <div className="flex w-full items-center gap-4 lg:gap-8">
            {/* Logo */}
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9] lg:h-20 lg:w-20">
              <img
                src={logoImage}
                alt="Logo"
                className="h-full w-full object-scale-down"
              />
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
              <h1 className="text-lg font-semibold lg:text-2xl">
                The Emerald Hotel
              </h1>
              <div>
                <input
                  onChange={handleInputChange}
                  value={search}
                  className="w-full rounded-full bg-[#E1E1E1] p-2 pl-5 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary lg:w-[30rem] lg:text-base"
                  placeholder="Find your favorite menu"
                  type="text"
                />
                <Search className="absolute right-3 top-[34px] transform text-gray-500 lg:left-[27rem] lg:top-[2.5rem]" />
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="hidden lg:flex lg:gap-6">
            {footerLinks.map((i, index) => {
              const isActive = location.pathname === i.href;

              return (
                <div
                  key={index}
                  className={`relative flex h-16 w-16 flex-col items-center justify-center rounded-full p-2 transition ${
                    isActive
                      ? 'text-[#2BB673]'
                      : 'text-gray-700 hover:text-[#41c082]'
                  }`}
                >
                  <Link
                    to={i.href}
                    className="flex flex-col items-center gap-1 text-center"
                  >
                    <i.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                    <p className="text-xs lg:text-sm">{i.label}</p>
                  </Link>

                  {/* Cart Badge */}
                  {i.href === '/cart' && cartHasItems && (
                    <span className="absolute right-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F87171] text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
