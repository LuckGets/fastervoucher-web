import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import GuestFooter from '../components/guest/GuestFooter';

const GuestLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F7F3ED] text-text">
      <Header />
      <main className="flex-grow lg:mt-24">
        <Outlet />
      </main>
      <GuestFooter activePath={pathname} />
    </div>
  );
};

export default GuestLayout;
