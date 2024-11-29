const VoucherCost = () => {
  return (
    <div className="flex gap-4 md:flex-row md:items-center">
      <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg md:h-40 md:w-40">
        <img
          src="https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg"
          alt="Voucher"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-bold text-gray-800 md:text-2xl">
          Premium Sushi & Seafood Buffet Dinner
        </h1>
        <h2 className="mt-1 text-sm text-gray-500 md:text-base">
          The Emerald Coffee Shop
        </h2>
        <h1 className="mt-4 text-lg font-semibold text-primary md:text-xl">
          THB 1,199 NET
        </h1>
      </div>
    </div>
  );
};

export default VoucherCost;
