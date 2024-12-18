import Email from './components/setting/email/Email';
import Example from './components/setting/example/Example';
import Store from './components/setting/store/Store';
import VoucherEmail from './components/setting/email/VoucherEmail';
import CoverPhoto from './components/setting/coverphoto/CoverPhoto';
import Restaurant from './components/setting/restaurant/Restaurant';
import LineShop from './components/setting/line/LineShop';
import Shopee from './components/setting/shopee/Shopee';

const Setting = () => {
  return (
    <div>
      <div className="mb-12 flex w-full justify-between">
        <div className="flex w-1/2 flex-col gap-4">
          <Email />
          <VoucherEmail />
          <Store />
          <CoverPhoto />
          <Restaurant />
        </div>
        <div className="flex w-1/2 flex-grow items-center justify-center">
          <Example />
        </div>
      </div>
      <div>
        <LineShop />
        <Shopee />
      </div>
    </div>
  );
};

export default Setting;
