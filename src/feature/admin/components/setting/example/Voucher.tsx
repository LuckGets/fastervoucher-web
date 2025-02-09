import useVoucherStore from '@/stores/voucher-store';

const Voucher = () => {
  const { vouchers } = useVoucherStore();

  return (
    <div className="grid w-full grid-cols-2 gap-2 px-6">
      {vouchers.slice(0, 4).map((voucher, index) => (
        <div key={index} className="rounded-xl">
          <img
            src={
              Array.isArray(voucher?.images) && voucher?.images[0]?.imgPath
                ? voucher?.images[0]?.imgPath
                : '/placeholder-image.png'
            }
            alt={voucher?.title}
            className="h-44 w-44 rounded-2xl object-cover"
          />
          <h1 className="mt-2 truncate text-sm">{voucher?.title}</h1>
          <div className="flex items-center">
            {!voucher?.discount ? (
              <h2 className="text-xs text-gray-500">
                THB {voucher?.price} NET
              </h2>
            ) : (
              <>
                <h2 className="text-[11px] text-gray-500 line-through">
                  THB {voucher?.price} ++
                </h2>
                <span className="ml-2 text-[11px] text-red-500">
                  THB {voucher?.discount?.discountedPrice} NET
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
