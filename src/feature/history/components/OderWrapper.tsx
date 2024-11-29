import { CalendarDays, Clock3 } from 'lucide-react';
import { orderLists } from '@/utils/main/orderLists';
import OderDetails from './OderDetails';

const OderWrapper = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {orderLists.map((item, index) => (
        <div key={index}>
          <div className="flex items-center justify-between text-xs text-basicGray">
            <h1>OrderID: {item.orderId}</h1>
            <div className="flex items-center gap-2">
              <h1 className="flex items-center gap-1">
                <CalendarDays className="w-4" />
                {new Date(item.date).toLocaleDateString()}
              </h1>
              <h1 className="flex items-center gap-1">
                <Clock3 className="w-4" />
                {new Date(item.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </h1>
            </div>
          </div>

          {item.OrderDetails.map((detail, detailIndex) => (
            <OderDetails key={detailIndex} orderDetail={detail} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default OderWrapper;
