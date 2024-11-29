import { Link, useLocation } from 'react-router-dom';
import { footerLinks } from '../../utils/guest/footerLinks';
import useCartStore from '@/stores/cart-store';

const GuestFooter = () => {
  const { items } = useCartStore();
  const location = useLocation();
  const pathname = location.pathname;

  const cartHasItems = items.length > 0;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 z-10 mb-5 flex h-16 w-[90%] items-center justify-around rounded-xl bg-[#006838] text-white">
      {footerLinks.map((i, index) => {
        const isActive = pathname === i.href;

        return (
          <div
            key={index}
            className={`relative flex h-14 w-14 items-center justify-center rounded-full p-2 ${isActive ? 'bg-[#00000051]' : 'active:bg-[#0000002e]'}`}
          >
            <Link to={i.href} className="flex flex-col items-center">
              <img
                src={i.src}
                alt={i.label}
                width={30}
                height={30}
                className={isActive ? 'text-white' : ''}
              />
              <p className="text-xs">{i.label}</p>
            </Link>

            {i.href === '/cart' && cartHasItems && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F87171] text-sm">
                {totalItems}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GuestFooter;
