import useCartStore from '../../../stores/cart-store';
import { Trash2 } from 'lucide-react';
import Total from './Total';
import useAuthStore from '../../../stores/auth-store';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../config/path';
import { useEffect } from 'react';

const CartItems = () => {
  const { items, removeFromCart, increase, decrease, total, calculateTotal } =
    useCartStore();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotal();
  }, [items, calculateTotal]);

  return (
    <div className="mb-20 flex flex-col justify-between p-6">
      {items?.length === 0 ? (
        <p className="text-center text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mt-4 space-y-6">
            {items?.map((item) => (
              <li
                key={item?.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <div className="h-24 w-24 overflow-hidden rounded-lg border">
                  <img
                    src={
                      Array.isArray(item?.img) && item.img.length > 0
                        ? item.img[0]?.imgPath
                        : '/placeholder-image.png'
                    }
                    alt={item?.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <h2 className="text-sm font-semibold md:text-base">
                    {item?.title}
                  </h2>
                  <h3 className="text-xs text-gray-500 md:text-sm">
                    {item?.category}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-gray-800 md:text-sm">
                    THB {item?.price} NET
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <button
                    className="self-end text-gray-500 transition hover:text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="flex items-center gap-4">
                    <button
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-lg text-[#888888] transition hover:bg-gray-300 md:h-7 md:w-7"
                      onClick={() => decrease(item.id)}
                    >
                      -
                    </button>
                    <span className="text-base font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-lg text-[#888888] transition hover:bg-gray-300 md:h-7 md:w-7"
                      onClick={() => increase(item?.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Total total={total} />
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              className="w-full rounded-xl bg-[#006838] py-3 text-white transition hover:bg-[#0b653b] disabled:bg-[#D9D9D9] disabled:text-[#989898]"
              disabled={!accessToken}
              onClick={() => navigate(`${paths.payment.path}`)}
            >
              Checkout
            </button>
            {!accessToken ? (
              <p className="flex gap-2 text-center text-sm text-red-500">
                Please{' '}
                <span className="rounded-xl bg-[#2BB673] px-3 text-white">
                  login
                </span>{' '}
                to proceed with checkout.
              </p>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
