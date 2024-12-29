import { useEffect } from 'react';
import Email from './components/setting/email/Email';
import Example from './components/setting/example/Example';
import Store from './components/setting/store/Store';
import VoucherEmail from './components/setting/email/VoucherEmail';
import CoverPhoto from './components/setting/coverphoto/CoverPhoto';
import Restaurant from './components/setting/restaurant/Restaurant';
import LineShop from './components/setting/line/LineShop';
import Shopee from './components/setting/shopee/Shopee';
import ScrollTop from '@/components/ScrollTop';

const Setting = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div>
      <div className="mb-12 flex w-full justify-between">
        <div className="flex w-1/2 flex-col gap-4">
          <div id="Email-for-login">
            <Email />
          </div>
          <div id="Voucher-delivery-email">
            <VoucherEmail />
          </div>
          <div id="Store-Name">
            <Store />
          </div>
          <div id="Cover-photo">
            <CoverPhoto />
          </div>
          <div id="Hotel-Restaurant">
            <Restaurant />
          </div>
        </div>
        <div className="flex w-1/2 flex-grow items-center justify-center">
          <Example />
        </div>
      </div>
      <div>
        <div id="Line-Shopping">
          <LineShop />
        </div>
        <div id="Shopee">
          <Shopee />
        </div>
      </div>
      <ScrollTop />
    </div>
  );
};

export default Setting;
