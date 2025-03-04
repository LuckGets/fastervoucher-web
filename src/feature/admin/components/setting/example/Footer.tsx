import useSettingStore from '../../../../../stores/setting-store';
import { footerLinks } from '../../../../../utils/main/footerLinks';

const Footer = () => {
  const { colorCode } = useSettingStore();

  const bgColor = colorCode
    ? { backgroundColor: colorCode }
    : { backgroundColor: '#D1D5DB' };

  return (
    <div
      style={bgColor}
      className="mx-auto mb-4 flex h-16 w-[90%] items-center justify-center rounded-xl text-textWhite"
    >
      <div className="flex w-full justify-around">
        {footerLinks.map((i, index) => {
          return (
            <div
              key={index}
              className={`relative flex h-14 w-14 items-center justify-center rounded-full p-2`}
            >
              <div className="flex flex-col items-center">
                <i.icon className="h-7 w-7" />
                <p className="text-xs">{i.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
