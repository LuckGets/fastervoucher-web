import { paths } from '@/config/path';
import { sideBarList } from '@/utils/admin/sidebarList';
import { useNavigate } from 'react-router-dom';
import SubSetting from './SubSetting';

type ComponentProps = {
  settingOpen: boolean;
  setSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePath: string;
  i: sideBarList;
};

const Setting = ({
  settingOpen,
  setSettingOpen,
  activePath,
  i,
}: ComponentProps) => {
  const navigate = useNavigate();

  const handleSettingClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!settingOpen) {
      setSettingOpen(true);
      navigate(paths.admin.setting.path);
    } else {
      setSettingOpen(false);
    }
  };

  const isActive = activePath === paths.admin.setting.path;

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`${
          isActive ? 'bg-basicGray text-textWhite' : ''
        } mt-5 flex h-12 w-[90%] items-center rounded-full hover:bg-[#D9D9D9] hover:text-text`}
        onClick={handleSettingClick}
      >
        <div className="flex gap-1 pl-4">
          <i.icon className="h-7 w-7" />
          <p className="text-lg">{i.label}</p>
        </div>
      </div>

      <div
        className={`transition-max-height w-[90%] overflow-y-auto duration-300 ease-in-out ${
          settingOpen ? 'max-h-48' : 'max-h-0'
        }`}
      >
        <SubSetting />
      </div>
    </div>
  );
};

export default Setting;
