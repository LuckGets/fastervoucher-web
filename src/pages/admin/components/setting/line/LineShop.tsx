import InfoInput from './InfoInput';
import KeyInfo from './KeyInfo';

const LineShop = () => {
  return (
    <div className="w-full">
      <div className="flex w-[95%] items-center gap-2 rounded-full bg-[#2BB673] p-1 text-textWhite">
        <div className="ml-2 flex h-4 w-4 items-center justify-center object-contain">
          <img src="https://i.imgur.com/62NiWJH.png" alt="line" />
        </div>
        <h1>Line Shopping</h1>
      </div>
      <div className="mx-4 my-8 flex flex-col gap-6">
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

export default LineShop;
