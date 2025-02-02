import AccountUser from '@/feature/admin/components/dashboard/AccountUser';
import DashboardChart from '@/feature/admin/components/dashboard/DashboardChart';
import OutletSales from '@/feature/admin/components/dashboard/OutletSales';
import Promotion from '@/feature/admin/components/dashboard/Promotion';

const Dashboard = () => {
  return (
    <div className="">
      <DashboardChart />
      <div className="flex flex-col gap-4 p-3">
        <div className="mb-3 flex justify-between gap-3">
          <div className="flex-1">
            <OutletSales />
          </div>
          <div className="flex-1">
            <AccountUser />
          </div>
        </div>
        <Promotion />
      </div>
    </div>
  );
};

export default Dashboard;
