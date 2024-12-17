import { useState } from 'react';
import EmailInfo from './EmailInfo';
import ChangePassword from '@/pages/admin/components/setting/email/ChangPassword';

const Email = () => {
  const [changeOpen, setChangeOpen] = useState(false);

  const handleOnClick = () => {
    setChangeOpen(!changeOpen);
  };

  return (
    <div className="w-[90%] rounded-2xl border border-[#888888] p-6 px-8">
      <EmailInfo
        userInfo={{
          info: 'info@emerald.com',
          label: 'Email ที่ใช้เข้าสู่ระบบ',
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
