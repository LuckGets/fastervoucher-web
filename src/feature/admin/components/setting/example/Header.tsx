import useSettingStore from '../../../../../stores/setting-store';

const Header: React.FC = () => {
  const logoImage = useSettingStore((state) => state.logoImage);

  return (
    <div className="max-w-screen h-18 z-40 flex justify-center md:h-32">
      <div className="my-5">
        <img
          src={logoImage}
          alt="Logo"
          className="h-full w-28 object-contain"
        />
      </div>
    </div>
  );
};

export default Header;
