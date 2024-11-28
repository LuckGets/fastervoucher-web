const VoucherCost = () => {
  return (
    <div className="flex gap-4">
      <div className="h-28 w-28 overflow-hidden rounded-lg">
        <img
          src="https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg"
          alt="Voucher"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h1 className="font-semibold md:text-xl">
          Premium Sushi & Seafood Buffet Dinner
        </h1>
        <h2 className="mt-1 text-sm text-[#888888]">The Emerald Coffee Shop</h2>
        <h1 className="mt-4 text-sm font-semibold md:text-lg">THB 1,199 NET</h1>
      </div>
    </div>
  );
};

export default VoucherCost;
