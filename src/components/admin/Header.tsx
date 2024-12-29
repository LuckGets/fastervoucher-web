import useSettingStore from '@/stores/setting-store';
import { Link } from 'react-router-dom';

const Header = () => {
  const { name, logoImage } = useSettingStore();

  return (
    <div className="fixed z-50 flex h-16 w-screen justify-center border-basicGray bg-[#F7F3ED] px-10 py-2 md:justify-between md:border-b">
      <div className="flex items-center justify-center gap-5">
        <div className="flex-shrink-0 items-center justify-center overflow-hidden rounded-full md:flex md:h-14 md:w-14 md:bg-[#D9D9D9]">
          <img
            src={logoImage}
            alt=""
            className="h-full w-full object-scale-down"
          />
        </div>
        <h1 className="hidden text-xl font-semibold md:block">{name}</h1>
      </div>
      <div className="hidden items-center gap-6 text-lg md:flex">
        <Link to="/manual">Manual</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
};

export default Header;
