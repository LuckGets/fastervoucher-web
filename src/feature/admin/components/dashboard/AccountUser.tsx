import { accountUser } from '@/utils/dashboard/accountUser';
import { ArrowDownUp } from 'lucide-react';
import { useState } from 'react';

const UserOrders = () => {
  const [sortOrderByOrders, setSortOrderByOrders] = useState<'asc' | 'desc'>(
    'desc',
  );
  const [sortOrderByVouchers, setSortOrderByVouchers] = useState<
    'asc' | 'desc'
  >('desc');
  const [sortedUserOrders, setSortedUserOrders] = useState(accountUser);

  const sortByOrders = () => {
    const sorted = [...sortedUserOrders].sort((a, b) => {
      if (sortOrderByOrders === 'desc') {
        return b.order - a.order;
      } else {
        return a.order - b.order;
      }
    });
    setSortedUserOrders(sorted);
    setSortOrderByOrders(sortOrderByOrders === 'desc' ? 'asc' : 'desc');
  };

  const sortByVouchers = () => {
    const sorted = [...sortedUserOrders].sort((a, b) => {
      if (sortOrderByVouchers === 'desc') {
        return b.voucher - a.voucher;
      } else {
        return a.voucher - b.voucher;
      }
    });
    setSortedUserOrders(sorted);
    setSortOrderByVouchers(sortOrderByVouchers === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="rounded-xl bg-[#E1E1E1] p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="cursor-pointer px-4 py-2 text-left text-sm font-semibold text-gray-700">
                <span className="flex items-center">User Name</span>
              </th>
              <th
                onClick={sortByOrders}
                className="cursor-pointer px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                <span className="flex items-center justify-center gap-1">
                  Orders
                  <ArrowDownUp
                    className={`w-5 text-[#888888] ${sortOrderByOrders === 'desc' ? 'rotate-180' : ''}`}
                  />
                </span>
              </th>
              <th
                onClick={sortByVouchers}
                className="cursor-pointer px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                <span className="flex items-center justify-center gap-1">
                  Voucher Value
                  <ArrowDownUp
                    className={`w-5 text-[#888888] ${sortOrderByVouchers === 'desc' ? 'rotate-180' : ''}`}
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUserOrders.map((user) => (
              <tr
                key={user.id}
                className="border-b border-dashed border-[#ADADAD]"
              >
                <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  {user.order.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  {user.voucher.toLocaleString()} ใบ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
