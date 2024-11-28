import { vouchers } from '../../../utils/guest/vouchers';

const Voucher = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {vouchers.map((i, index) => (
        <div key={index}>
          <img
            src="https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg"
            alt=""
            width={250}
            height={250}
            className="rounded-2xl"
          />
          <h1 className="mt-2 truncate">{i.name}</h1>
          <div className="flex items-center">
            {i.promotion ? (
              <>
                <h2 className="text-xs text-gray-500 line-through">
                  {i.price}
                </h2>
                <span className="ml-2 text-xs text-red-500">{i.promotion}</span>
              </>
            ) : (
              <h2 className="text-xs text-gray-500 line-through">{i.price}</h2>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Voucher;
