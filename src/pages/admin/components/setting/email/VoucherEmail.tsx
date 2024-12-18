import { useState } from 'react';
import EmailInfo from './EmailInfo';
import ChangePassword from '@/pages/admin/components/setting/email/ChangPassword';

const VoucherEmail = () => {
  const [changeOpen, setChangeOpen] = useState(false);

  const handleOnClick = () => {
    setChangeOpen(!changeOpen);
  };

  return (
    <div className="w-[90%] rounded-2xl border border-[#888888] p-6 px-8">
      <EmailInfo
        userInfo={{
          info: 'info@emerald.com',
          label: 'Email ที่ใช้ส่งให้ลูกค้า',
        }}
      />
      <h1
        className="mt-2 cursor-pointer text-sm text-basicGray"
        onClick={handleOnClick}
      >
        Password
      </h1>
      {changeOpen && <ChangePassword setChangeOpen={setChangeOpen} />}
    </div>
  );
};

export default VoucherEmail;
