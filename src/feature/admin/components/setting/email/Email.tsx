import { useState } from 'react';
import EmailInfo from './EmailInfo';
import { subSetting } from '../../../../../utils/admin/subsetting';
import useSettingStore from '../../../../../stores/setting-store';
import ChangePassword from './ChangPassword';

const Email = () => {
  const [changeOpen, setChangeOpen] = useState(false);
  const { emailForLogin } = useSettingStore();

  const handleOnClick = () => {
    setChangeOpen(!changeOpen);
  };

  return (
    <div
      id={subSetting[0].label}
      className="w-[90%] rounded-2xl border border-[#888888] p-6 px-8"
    >
      <EmailInfo
        userInfo={{
          info: emailForLogin,
          label: 'Email ที่ใช้เข้าสู่ระบบ',
          key: 'emailForLogin',
        }}
      />
      <h1
        className="mt-2 cursor-pointer text-sm text-basicGray"
        onClick={handleOnClick}
      >
        Change Password
      </h1>
      {changeOpen && <ChangePassword setChangeOpen={setChangeOpen} />}
    </div>
  );
};

export default Email;
