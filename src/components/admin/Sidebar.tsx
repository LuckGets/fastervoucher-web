import { sideBarList } from '@/utils/admin/sidebarList';
import { useState, useEffect } from 'react';
import { paths } from '@/config/path';
import Manage from './Manage';
import Setting from './Setting';
import { Link } from 'react-router-dom';

type ComponentProps = {
  activePath: string;
};

const Sidebar = ({ activePath }: ComponentProps) => {
  const [manageOpen, setManageOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  useEffect(() => {
    if (activePath.startsWith(paths.admin.manage.path)) {
      setManageOpen(true);
    } else if (activePath.startsWith(paths.admin.setting.path)) {
      setSettingOpen(true);
    } else {
      setManageOpen(false);
      setSettingOpen(false);
    }
  }, [activePath]);

  return (
    <div
      className={`${activePath === paths.admin.path ? 'hidden' : 'fixed'} left-4 top-16 mt-6 flex h-[calc(100vh-160px)] w-[15%] flex-shrink-0 flex-col items-center overflow-auto rounded-lg border border-basicGray bg-[#F7F3ED]`}
    >
      {sideBarList.map((i, index) => {
        const isActive = activePath === i.path;

        if (i.label === paths.admin.manage.label) {
          return (
            <Manage
              key={index}
              manageOpen={manageOpen}
              setManageOpen={setManageOpen}
              activePath={activePath}
              i={i}
            />
          );
        }

        if (i.label === paths.admin.setting.label) {
          return (
            <Setting
              key={index}
              settingOpen={settingOpen}
              setSettingOpen={setSettingOpen}
              activePath={activePath}
              i={i}
            />
          );
        }

        return (
          <div
            key={index}
            className={`${
              isActive ? 'bg-basicGray text-textWhite' : ''
            } mt-5 flex h-12 w-[90%] items-center rounded-full hover:bg-[#D9D9D9] hover:text-text`}
          >
            <Link to={i.path} className="flex gap-1 pl-4">
              <i.icon className="h-7 w-7" />
              <p className="text-lg">{i.label}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
