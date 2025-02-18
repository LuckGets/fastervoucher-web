import Footer from '../components/admin/Footer';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#F7F3ED] text-text">
      <Header />
      <div className="flex w-full flex-grow">
        <Sidebar activePath={pathname} />
        <main className="mt-[96px] w-full md:mx-12">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
