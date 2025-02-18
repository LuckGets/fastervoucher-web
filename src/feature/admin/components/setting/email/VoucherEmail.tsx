import { useState } from 'react';
import EmailInfo from './EmailInfo';
import { subSetting } from '../../../../../utils/admin/subsetting';
import useSettingStore from '../../../../../stores/setting-store';
import ChangePassword from './ChangPassword';

const VoucherEmail = () => {
  const [changeOpen, setChangeOpen] = useState(false);
  const { emailForSend } = useSettingStore();

  const handleOnClick = () => {
    setChangeOpen(!changeOpen);
  };

  return (
    <div
      id={subSetting[1].label}
      className="w-[90%] rounded-2xl border border-[#888888] p-6 px-8"
    >
      <EmailInfo
        userInfo={{
          info: emailForSend,
          label: 'Email ที่ใช้ส่งให้ลูกค้า',
          key: 'emailForSend',
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
