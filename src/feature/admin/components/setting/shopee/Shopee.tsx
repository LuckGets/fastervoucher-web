import { subSetting } from '../../../../../utils/admin/subsetting';
import InfoInput from '../../../../../feature/admin/components/setting/line/InfoInput';
import KeyInfo from '../../../../../feature/admin/components/setting/line/KeyInfo';

const Shopee = () => {
  return (
    <div id={subSetting[7].label} className="mb-24 w-full">
      <div className="flex w-[95%] items-center gap-2 rounded-full bg-[#EE4D2D] p-1 text-textWhite">
        <div className="ml-2 flex h-4 w-4 items-center justify-center object-contain">
          <img src="https://i.imgur.com/FmFIqHp.png" alt="line" />
        </div>
        <h1>Shopee</h1>
      </div>
      <div className="mx-4 my-6 flex flex-col gap-6">
        <InfoInput
          inFo={{
            info: 'https://shop.line.me/@theemeraldhotel/',
            label: 'LINE Shopping URL',
          }}
        />
        <KeyInfo inFo={{ info: 'asd524498c', label: 'API Key' }} />
        <KeyInfo
          inFo={{ info: 'sdfddsxMThk', label: 'Secret Key from Open API' }}
        />
        <InfoInput
          inFo={{
            info: 'https://2fj40r2onc.execute-api.ap-southeast-1.amazonaws.com/Prod/webhooks/lineshop?t=viUpY',
            label: 'Webhook for Open API',
          }}
        />
      </div>
    </div>
  );
};
export default Shopee;
