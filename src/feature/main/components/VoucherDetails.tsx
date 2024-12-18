import { ShoppingCart, X } from 'lucide-react';
import VoucherCost from './VoucherCost';
import VoucherTerm from './VoucherTerm';
import useCartStore from '@/stores/cart-store';
import Swal from 'sweetalert2'; // เพิ่มการ import SweetAlert2
import { paths } from '@/config/path';
import { useNavigate } from 'react-router-dom';
import useSettingStore from '@/stores/setting-store';

interface VoucherDetailsProps {
  onClose: () => void;
}

const VoucherDetails = ({ onClose }: VoucherDetailsProps) => {
  const { color } = useSettingStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  const handleAddToCart = () => {
    const voucher = {
      id: 'voucher-002',
      name: 'All You can eat dim sum lunch',
      restaurant: 'Yok Chinese Restaurant',
      price: 1199,
      quantity: 1,
      src: 'https://scontent.fbkk6-1.fna.fbcdn.net/v/t1.6435-9/52980043_603300676797601_1693792066246541312_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=gmlopdawGwgQ7kNvgFCZcqD&_nc_zt=23&_nc_ht=scontent.fbkk6-1.fna&_nc_gid=APGVyPusSIruhviBrR7OYHK&oh=00_AYDSiDwo2YTxzfJg65113NiIz0ISuksUxf18zZoQWQenTQ&oe=6770AF31',
    };
    addToCart(voucher);

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
          <VoucherCost />
          <VoucherTerm />
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
