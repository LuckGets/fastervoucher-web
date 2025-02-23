import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const RedeemLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F7F3ED] text-text">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default RedeemLayout;
