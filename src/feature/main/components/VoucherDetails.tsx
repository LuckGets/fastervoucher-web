import { ShoppingCart, X } from 'lucide-react';
import VoucherCost from './VoucherCost';
import VoucherTerm from './VoucherTerm';
import useCartStore, { CartItem } from '@/stores/cart-store';
import Swal from 'sweetalert2';
import { paths } from '@/config/path';
import { useNavigate } from 'react-router-dom';
import useSettingStore from '@/stores/setting-store';
import useVoucherStore from '@/stores/voucher-store';
import { useEffect } from 'react';

interface VoucherDetailsProps {
  voucherId: string;
  onClose: () => void;
}

const VoucherDetails = ({ voucherId, onClose }: VoucherDetailsProps) => {
  const { color } = useSettingStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const { actionGetVoucherById, voucherById } = useVoucherStore();

  useEffect(() => {
    actionGetVoucherById(voucherId);
  }, [actionGetVoucherById, voucherId]);

  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  const handleAddToCart = () => {
    if (!voucherById) {
      Swal.fire({
        title: 'Error',
        text: 'Voucher data not found.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const price =
      voucherById.discount?.status === 'ACTIVE'
        ? voucherById.discount.discountedPrice
        : voucherById.price || 0;

    const cartItem: CartItem = {
      id: voucherById.id,
      title: voucherById.title || 'Untitled Voucher',
      category: voucherById.category || 'N/A',
      price: price,
      quantity: 1,
      img: voucherById.images || [],
    };

    addToCart(cartItem);

    Swal.fire({
      title: 'Added to cart!',
      text: `Voucher '${voucherById.title || 'Untitled'}' has been added to your cart.`,
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
      <div className="relative mx-4 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-lg bg-[#F7F3ED]">
        <div className="sticky top-0 z-10 flex justify-end bg-[#F7F3ED] p-4">
          <button
            className="text-xl font-bold text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="w-5 md:w-7" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6">
          {voucherById?.id ? (
            <VoucherCost id={voucherById.id} />
          ) : (
            <div className="text-gray-500">Voucher ID not found</div>
          )}

          {voucherById ? (
            <VoucherTerm voucher={voucherById} />
          ) : (
            <div className="text-gray-500">Voucher details not available</div>
          )}
        </div>

        <div className="sticky bottom-0 bg-[#F7F3ED] p-4 shadow-lg">
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
