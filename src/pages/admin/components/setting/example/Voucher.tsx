import { vouchers } from '@/utils/main/vouchers';

interface VoucherProps {
  name: string;
  price: string;
  promotion?: string;
}

const Voucher = () => {
  const shortVoucher = vouchers.slice(0, 4);

  return (
    <div className="grid w-full grid-cols-2 gap-4 px-6">
      {shortVoucher.map((i: VoucherProps, index: number) => (
        <div key={index} className="rounded-xl p-2 active:bg-[#0000003a]">
          <img
            src="https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg"
            alt={i.name}
            width={250}
            height={250}
            className="w-full rounded-2xl object-cover"
          />
          <h1 className="mt-2 truncate text-sm md:text-lg">{i.name}</h1>
          <div className="flex items-center">
            {!i.promotion ? (
              <h2 className="text-xs text-gray-500 md:text-sm">{i.price}</h2>
            ) : (
              <>
                <h2 className="text-[11px] text-gray-500 line-through md:text-sm">
                  {i.price}
                </h2>
                <span className="ml-2 text-[11px] text-red-500 md:text-sm">
                  {i.promotion}
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Voucher;
