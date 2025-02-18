import useVoucherStore from '../../../../../stores/voucher-store';
import { useNavigate } from 'react-router-dom';

interface SearchVoucherProps {
  selectedRestaurant: string;
}

const Voucher: React.FC<SearchVoucherProps> = ({ selectedRestaurant }) => {
  const { vouchers } = useVoucherStore();
  const navigate = useNavigate();

  const filteredVouchers = selectedRestaurant
    ? vouchers.filter((voucher) => voucher.category === selectedRestaurant)
    : vouchers;

  const handleVoucherClick = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <div className="grid w-full grid-cols-4 gap-4 px-6">
      {filteredVouchers.map((i) => (
        <div
          key={i.id}
          className="rounded-xl p-2 active:bg-[#0000003a]"
          onClick={() => handleVoucherClick(i.id)}
        >
          <img
            src={i.images[0].imgPath}
            alt={i.title}
            width={250}
            height={250}
            className="w-full rounded-2xl object-cover"
          />
          <h1 className="mt-2 truncate text-sm md:text-lg">{i.title}</h1>
          <div>
            <h2 className="text-xs text-gray-500 md:text-sm">{i.category}</h2>
            <div className="flex gap-2">
              {!i?.discount ? (
                <h2 className="text-xs text-gray-500 md:text-sm">
                  THB {i?.discount?.discountedPrice.toLocaleString()} ++
                </h2>
              ) : (
                <>
                  <h2 className="text-[11px] text-gray-500 line-through md:text-sm">
                    THB {i?.price} ++
                  </h2>
                  <span className="ml-2 text-[11px] text-red-500 md:text-sm">
                    THB {i?.discount?.discountedPrice.toLocaleString()} NET
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Voucher;
