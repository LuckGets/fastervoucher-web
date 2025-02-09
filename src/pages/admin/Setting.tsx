import { useEffect } from 'react';
import Example from '../../feature/admin/components/setting/example/Example';
import Store from '../../feature/admin/components/setting/Store';
import CoverPhoto from '../../feature/admin/components/setting/coverphoto/CoverPhoto';
import Restaurant from '../../feature/admin/components/setting/restaurant/Restaurant';
import LineShop from '../../feature/admin/components/setting/line/LineShop';
import ScrollTop from '@/components/ScrollTop';
import VoucherEmail from '@/feature/admin/components/setting/email/VoucherEmail';
import Shopee from '@/feature/admin/components/setting/shopee/Shopee';
import Email from '@/feature/admin/components/setting/email/Email';
import useSettingStore from '@/stores/setting-store';

const Setting = () => {
  const { actionGetShopInfo } = useSettingStore();
  useEffect(() => {
    actionGetShopInfo();
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
  }, [actionGetShopInfo]);

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
