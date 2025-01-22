import { useEffect, useState } from 'react';
import VoucherDetails from './VoucherDetails';
import useVoucherStore from '@/stores/voucher-store';

interface Promotion {
  name: string;
  price: number;
  startDate: string;
  endDate: string;
}

interface Props {
  selectedRestaurant: string | null;
}

interface VoucherProps {
  id: number;
  name: string;
  price: number;
  promotion?: Promotion[];
  restaurant: string;
  meal: string;
  src?: string;
}

const Voucher = ({ selectedRestaurant }: Props) => {
  const { vouchers, actionGetVouchers } = useVoucherStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherProps | null>(
    null,
  );

  useEffect(() => {
    actionGetVouchers();
    console.log(vouchers);
  }, [vouchers]);

  const filteredVouchers = vouchers.filter((voucher) =>
    selectedRestaurant ? voucher.restaurant === selectedRestaurant : true,
  );

  const handleOnclick = (voucher: VoucherProps) => {
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
  };

  return (
    <div className="mb-20 grid w-full grid-cols-2 gap-4 px-6 md:grid-cols-3 lg:grid-cols-5">
      {filteredVouchers.map((voucher, index) => (
        <div
          key={index}
          onClick={() => handleOnclick(voucher)}
          className="cursor-pointer rounded-xl p-2 active:bg-[#0000003a]"
        >
          <img
            src={voucher.src || '/placeholder-image.png'}
            alt={voucher.name}
            className="w-full rounded-2xl object-cover"
          />
          <h1 className="mt-2 truncate text-sm md:text-lg">{voucher.name}</h1>
          <div className="flex items-center">
            {!voucher.promotion?.length ? (
              <h2 className="text-xs text-gray-500 md:text-sm">
                THB {voucher.price} ++
              </h2>
            ) : (
              <>
                <h2 className="text-[11px] text-gray-500 line-through md:text-sm">
                  THB {voucher.price} ++
                </h2>
                <span className="ml-2 text-[11px] text-red-500 md:text-sm">
                  THB {voucher.promotion[0]?.price} NET
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
        <VoucherDetails voucher={selectedVoucher} onClose={closeModal} />
      )}
    </div>
  );
};

export default Voucher;
