import SubManage from './SubManage';
import { paths } from '@/config/path';
import { useNavigate } from 'react-router-dom';
import { sideBarList } from '@/utils/admin/sidebarList';

type ComponentProps = {
  manageOpen: boolean;
  setManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePath: string;
  i: sideBarList;
};

const Manage = ({
  manageOpen,
  setManageOpen,
  activePath,
  i,
}: ComponentProps) => {
  const navigate = useNavigate();

  const handleManageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!manageOpen) {
      setManageOpen(true);
      navigate(paths.admin.manage.path);
    } else {
      setManageOpen(false);
    }
  };

  const isActive = activePath === paths.admin.manage.path;

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`${
          isActive ? 'bg-basicGray text-textWhite' : ''
        } mt-5 flex h-12 w-[90%] items-center rounded-full hover:bg-[#D9D9D9] hover:text-text`}
        onClick={handleManageClick}
      >
        <div className="flex gap-1 pl-4">
          <i.icon className="h-7 w-7" />
          <p className="text-lg">{paths.admin.manage.label}</p>
        </div>
      </div>

      <div
        className={`transition-max-height w-[90%] overflow-y-auto duration-300 ease-in-out ${
          manageOpen ? '' : 'max-h-0'
        }`}
      >
        <SubManage />
      </div>
    </div>
  );
};

export default Manage;
