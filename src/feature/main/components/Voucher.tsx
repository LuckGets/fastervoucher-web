import { useEffect, useState } from 'react';
import VoucherDetails from './VoucherDetails';
import useVoucherStore from '@/stores/voucher-store';

interface Props {
  selectedRestaurant: string | null;
}

interface Images {
  id: string;
  imgPath: string;
}

interface VoucherProps {
  id: string;
  title: string;
  price: number;
  category: string;
  tag: string;
  img?: Images | null;
  discount?: { discountedPrice: number };
  sellStartedAt: string;
  sellExpiredAt: string;
  status: string;
  stockAmount?: number;
}

const Voucher = ({ selectedRestaurant }: Props) => {
  const { vouchers, actionGetVouchers } = useVoucherStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherProps | null>(
    null,
  );

  useEffect(() => {
    actionGetVouchers();
  }, [actionGetVouchers, vouchers]);

  const currentDate = new Date();
  const currentTimeInThailand = new Date(
    currentDate.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }),
  );

  const filteredVouchersList = selectedRestaurant
    ? vouchers.filter((voucher) => {
        return voucher.category === selectedRestaurant;
      })
    : vouchers;

  const handleOnclick = (voucher: VoucherProps) => {
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
  };

  const vouchersToDisplay = filteredVouchersList.filter((voucher) => {
    const sellStartedAt = new Date(voucher?.sellStartedAt);
    const sellExpiredAt = new Date(voucher?.sellExpiredAt);

    const isActive =
      currentTimeInThailand >= sellStartedAt &&
      currentTimeInThailand <= sellExpiredAt;

    const hasActiveDiscount =
      voucher.discount &&
      voucher.discount.discountedPrice > 0 &&
      voucher.status === 'ACTIVE';

    return isActive && (!voucher.discount || hasActiveDiscount);
  });

  return (
    <div className="mb-20 grid w-full grid-cols-2 gap-1 px-4 md:grid-cols-3 lg:grid-cols-5">
      {vouchersToDisplay.map((voucher, index) => (
        <div
          key={index}
          onClick={() => handleOnclick(voucher)}
          className="flex cursor-pointer flex-col justify-center rounded-xl p-2 active:bg-[#0000003a] lg:items-center"
        >
          <img
            src={
              Array.isArray(voucher?.images) && voucher?.images[0]?.imgPath
                ? voucher?.images[0]?.imgPath
                : '/placeholder-image.png'
            }
            alt={voucher?.title}
            className="h-44 w-44 rounded-2xl object-cover lg:h-52 lg:w-52"
          />
          <h1 className="mt-2 truncate text-sm md:text-lg">{voucher?.title}</h1>
          <div className="flex items-center">
            {!voucher?.discount ? (
              <h2 className="text-xs text-gray-500 md:text-sm">
                THB {voucher?.price} NET
              </h2>
            ) : (
              <>
                <h2 className="text-[11px] text-gray-500 line-through md:text-sm">
                  THB {voucher?.price} ++
                </h2>
                <span className="ml-2 text-[11px] text-red-500 md:text-sm">
                  THB {voucher?.discount?.discountedPrice} NET
                </span>
              </>
            )}
          </div>
          {voucher?.stockAmount !== undefined &&
            voucher?.stockAmount !== null &&
            voucher?.stockAmount < 20 && (
              <p className="mt-2 text-[10px] text-red-500 md:text-xs">
                Only {voucher.stockAmount} left!
              </p>
            )}
        </div>
      ))}
      {isModalOpen && selectedVoucher && (
        <VoucherDetails voucherId={selectedVoucher?.id} onClose={closeModal} />
      )}
    </div>
  );
};

export default Voucher;
