import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import GuestFooter from '../components/guest/GuestFooter';

const GuestLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white text-black">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <GuestFooter />
    </div>
  );
};

export default GuestLayout;
