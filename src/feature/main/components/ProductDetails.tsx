import { ShoppingCart, X } from 'lucide-react';
import VoucherCost from './VoucherCost';
import VoucherTerm from './VoucherTerm';
// import useCartStore from '@/stores/cart-store';
import Swal from 'sweetalert2';
import { paths } from '../../../config/path';
import { useNavigate } from 'react-router-dom';
import useSettingStore from '../../../stores/setting-store';
import {
  ProductDataSchema,
  ProductDiscountEnum,
} from '../../../data-schema/product.type';
import useCartStore from '../../../stores/cart-store';

interface ProductDetailsProps {
  product: ProductDataSchema;
  onClose: () => void;
}

const ProductDetails = ({ product, onClose }: ProductDetailsProps) => {
  const { color } = useSettingStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity: 1,
    };

    addToCart(cartItem);

    Swal.fire({
      title: 'Added to cart!',
      text: `Voucher '${product.title}' has been added to your cart.`,
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

  const voucherPrice =
    product.discount && product.discount.status === ProductDiscountEnum.ACTIVE
      ? product.discount.discountedPrice
      : product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative mx-4 flex max-h-[90vh] min-h-0 w-full max-w-xl flex-col overflow-auto rounded-lg bg-[#F7F3ED]">
        <div className="sticky top-0 z-10 flex justify-end bg-[#F7F3ED] p-4">
          <button
            className="text-xl font-bold text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="w-5 md:w-7" />
          </button>
        </div>

        <div className="flex-grow px-6">
          <VoucherCost
            images={product.images}
            price={voucherPrice}
            restaurant={product.category}
            title={product.title}
          />
          <VoucherTerm
            conditions={product.termAndCondition}
            details={product.description}
          />
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

export default ProductDetails;
