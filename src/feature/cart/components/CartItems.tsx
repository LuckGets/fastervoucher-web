import useCartStore from '@/stores/cart-store';
import { Trash2 } from 'lucide-react';
import Total from './Total';

const CartItems = () => {
  const { items, removeFromCart, increase, decrease } = useCartStore();

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="p-6">
      {items.length === 0 ? (
        <p className="text-center text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="mt-4 space-y-6">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 border-b pb-4">
              <div className="h-24 w-24 overflow-hidden rounded-lg border">
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <h2 className="text-sm font-semibold md:text-base">
                  {item.name}
                </h2>
                <h3 className="text-xs text-gray-500 md:text-sm">
                  {item.restaurant}
                </h3>
                <p className="mt-1 text-xs font-medium text-gray-800 md:text-sm">
                  THB {item.price} NET
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
                  <span className="text-base font-medium">{item.quantity}</span>
                  <button
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-lg text-[#888888] transition hover:bg-gray-300 md:h-7 md:w-7"
                    onClick={() => increase(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Total total={calculateTotal()} />
    </div>
  );
};

export default CartItems;
