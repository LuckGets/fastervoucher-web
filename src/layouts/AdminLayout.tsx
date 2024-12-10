import Footer from '@/components/admin/Footer';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex max-h-screen flex-col overflow-x-hidden bg-[#F7F3ED] text-text">
      <Header />
      <div className="flex w-full flex-grow">
        <Sidebar activePath={pathname} />

        <main className="ml-[18%] mt-[96px] h-[calc(100vh-96px)] w-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
