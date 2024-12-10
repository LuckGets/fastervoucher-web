import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="fixed flex h-16 w-screen justify-between border-b border-basicGray bg-[#F7F3ED] px-10 py-2">
      <div className="flex items-center gap-5">
        <div className="h-14 w-14 rounded-full bg-slate-300">
          <img src="" alt="" />
        </div>
        <h1 className="text-xl font-semibold">The Emerald Hotel</h1>
      </div>
      <div className="flex items-center gap-6 text-lg">
        <Link to="/manual">Manual</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
};

export default Header;
