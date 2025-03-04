import { CalendarDays, Clock3 } from 'lucide-react';
import useOrderStore from '../../../stores/order-store';
import { useEffect } from 'react';
import OrderDetails from './OrderDetails';

const OrderWrapper = () => {
  const { myOrders, actionGetMyOrder } = useOrderStore();

  useEffect(() => {
    actionGetMyOrder();
  }, [actionGetMyOrder]);

  console.log('myOrders :>> ', myOrders);

  return (
    <div className="mb-20 flex w-full flex-col gap-4">
      {myOrders?.map((item, index) => (
        <div key={index}>
          <div className="flex items-center justify-between px-3 text-xs text-basicGray">
            <h1>OrderID: {item.id}</h1>
            <div className="flex items-center gap-2">
              <h1 className="flex items-center gap-1">
                <CalendarDays className="w-4" />
                {new Date(item.createdAt).toLocaleDateString()}
              </h1>
              <h1 className="flex items-center gap-1">
                <Clock3 className="w-4" />
                {new Date(item.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </h1>
            </div>
          </div>

          {Array.isArray(item.orderItems) &&
            item.orderItems.length > 0 &&
            item.orderItems.map((detail, detailIndex) => (
              <OrderDetails
                key={detailIndex}
                orderDetail={detail}
                voucher={
                  Array.isArray(item.orderItems) ? item.orderItems.length : 0
                }
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default OrderWrapper;
