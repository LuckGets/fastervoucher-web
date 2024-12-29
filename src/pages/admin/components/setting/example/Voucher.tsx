import useVoucherStore from '@/stores/voucher-store';

const Voucher = () => {
  const { vouchers } = useVoucherStore();

  return (
    <div className="grid w-full grid-cols-2 gap-4 px-6">
      {vouchers.map((voucher, index) => (
        <div key={index} className="rounded-xl p-2">
          <img
            src={voucher.src}
            alt={voucher.name}
            width={250}
            height={250}
            className="w-full rounded-2xl object-cover"
          />
          <h1 className="mt-2 truncate text-sm">{voucher.name}</h1>
          <div className="flex items-center">
            {!voucher.promotion || voucher.promotion.length === 0 ? (
              <h2 className="text-xs text-gray-500">THB {voucher.price} ++</h2>
            ) : (
              <>
                <h2 className="text-[11px] text-gray-500 line-through">
                  THB {voucher.price} ++
                </h2>
                <span className="ml-2 text-[11px] text-red-500">
                  THB {voucher.promotion[0]?.price} NET
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
