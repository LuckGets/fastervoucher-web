import { ShoppingCart, X } from 'lucide-react';
import VoucherCost from './VoucherCost';
import VoucherTerm from './VoucherTerm';
import useCartStore from '@/stores/cart-store';
import Swal from 'sweetalert2';
import { paths } from '@/config/path';
import { useNavigate } from 'react-router-dom';
import useSettingStore from '@/stores/setting-store';
import { Voucher } from '@/stores/voucher-store';

interface VoucherDetailsProps {
  voucher: Voucher;
  onClose: () => void;
}

const VoucherDetails = ({ voucher, onClose }: VoucherDetailsProps) => {
  const { color } = useSettingStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  const handleAddToCart = () => {
    const cartItem = {
      ...voucher,
      quantity: 1,
    };
    addToCart(cartItem);

    Swal.fire({
      title: 'Added to cart!',
      text: `Voucher '${voucher.name}' has been added to your cart.`,
      icon: 'success',
      width: '80%',
      padding: '20px',
      customClass: {
        popup: 'small-popup',
        confirmButton: 'custom-confirm-button',
      },
      buttonsStyling: false,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(paths.main.cart.path);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative mx-4 flex max-h-[90vh] w-full max-w-xl flex-col overflow-y-auto rounded-lg bg-[#F7F3ED]">
        <div className="sticky top-0 z-10 flex justify-end bg-[#F7F3ED] p-4">
          <button
            className="text-xl font-bold text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="w-5 md:w-7" />
          </button>
        </div>

        <div className="px-6">
          <VoucherCost id={voucher.id} />
          <VoucherTerm voucher={voucher} />
        </div>

        <div className="sticky bottom-0 w-full bg-[#F7F3ED] p-4 shadow-lg">
          <button
            style={bgColor}
            className="flex w-full items-center justify-center gap-4 rounded-lg p-2 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetails;
