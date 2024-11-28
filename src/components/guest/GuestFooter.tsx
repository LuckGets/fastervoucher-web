import { Link, useLocation } from 'react-router-dom';
import { footerLinks } from '../../utils/guest/footerLinks';

const GuestFooter = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="fixed bottom-0 left-5 z-10 mb-5 flex h-16 w-[90%] items-center justify-around rounded-xl bg-[#006838] text-white">
      {footerLinks.map((i, index) => {
        const isActive = pathname === i.href;

        return (
          <div
            key={index}
            className={`flex h-14 w-14 items-center justify-center rounded-full p-2 ${isActive ? 'bg-[#12412b]' : 'active:bg-[#12412b]'}`}
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
          </div>
        );
      })}
    </div>
  );
};

export default GuestFooter;
