import { Link } from 'react-router-dom';
import { footerLinks } from '../../utils/main/footerLinks';
import useCartStore from '../../stores/cart-store';
import useSettingStore from '../../stores/setting-store';

type ComponentProps = {
  activePath?: string;
};

const GuestFooter = ({ activePath }: ComponentProps) => {
  const { colorCode } = useSettingStore();
  const { items } = useCartStore();

  const cartHasItems = items.length > 0;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const bgColor = colorCode
    ? { backgroundColor: colorCode }
    : { backgroundColor: '#D1D5DB' };

  return (
    <div
      style={bgColor}
      className="fixed bottom-0 z-10 mb-5 flex h-16 w-[90%] items-center justify-around rounded-xl text-textWhite lg:hidden"
    >
      {footerLinks.map((i, index) => {
        const isActive = activePath === i.href;

        return (
          <div
            key={index}
            className={`relative flex h-14 w-14 items-center justify-center rounded-full p-2 ${isActive ? 'bg-[#00000051]' : 'active:bg-[#0000002e]'}`}
          >
            <Link to={i.href} className="flex flex-col items-center">
              <i.icon className="h-7 w-7" />
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
