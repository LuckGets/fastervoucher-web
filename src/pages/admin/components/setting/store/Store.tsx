import EmailInfo from '../email/EmailInfo';
import Color from './Color';
import Logo from './Logo';

const Store = () => {
  return (
    <div className="w-[90%] rounded-2xl border border-[#888888] p-6 px-8">
      <EmailInfo
        userInfo={{
          info: 'The Emerald Hotel',
          label: 'Hotel name / Store name',
        }}
      />
      <Logo />
      <Color />
    </div>
  );
};

export default Store;
