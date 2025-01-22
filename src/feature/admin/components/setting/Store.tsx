import useSettingStore from '@/stores/setting-store';
import Color from './Color';
import Logo from './Logo';
import EmailInfo from './email/EmailInfo';

const Store = () => {
  const { name } = useSettingStore();

  return (
    <div className="w-[90%] rounded-2xl border border-[#888888] p-6 px-8">
      <EmailInfo
        userInfo={{
          info: name,
          label: 'Hotel name / Store name',
          key: 'name',
        }}
      />
      <Logo />
      <Color />
    </div>
  );
};

export default Store;
