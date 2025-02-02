import { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { outletSales } from '@/utils/dashboard/outletSales';

const OutletSales = () => {
  const [sortOrderVoucher, setSortOrderVoucher] = useState<'asc' | 'desc'>(
    'desc',
  );
  const [sortOrderSales, setSortOrderSales] = useState<'asc' | 'desc'>('desc');
  const [sortedVoucherSales, setSortedVoucherSales] = useState(outletSales);

  const sortByVoucher = () => {
    const sorted = [...sortedVoucherSales].sort((a, b) => {
      if (sortOrderVoucher === 'desc') {
        return b.voucher - a.voucher;
      } else {
        return a.voucher - b.voucher;
      }
    });
    setSortedVoucherSales(sorted);
    setSortOrderVoucher(sortOrderVoucher === 'desc' ? 'asc' : 'desc');
  };

  const sortBySales = () => {
    const sorted = [...sortedVoucherSales].sort((a, b) => {
      if (sortOrderSales === 'desc') {
        return b.sales - a.sales;
      } else {
        return a.sales - b.sales;
      }
    });
    setSortedVoucherSales(sorted);
    setSortOrderSales(sortOrderSales === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="rounded-xl bg-[#E1E1E1] p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="cursor-pointer px-4 py-2 text-left text-sm font-semibold text-gray-700">
                <span className="flex items-center">
                  Outlets / Stores / Restaurant
                </span>
              </th>
              <th
                onClick={sortByVoucher}
                className="cursor-pointer px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                <span className="flex items-center justify-center gap-1">
                  Voucher
                  <ArrowDownUp
                    className={`w-5 text-[#888888] ${
                      sortOrderVoucher === 'desc' ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </th>
              <th
                onClick={sortBySales}
                className="cursor-pointer px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                <span className="flex items-center justify-center gap-1">
                  Sales
                  <ArrowDownUp
                    className={`w-5 text-[#888888] ${
                      sortOrderSales === 'desc' ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedVoucherSales.map((outlet) => (
              <tr
                key={outlet.id}
                className="border-b border-dashed border-[#ADADAD]"
              >
                <td className="px-4 py-3 text-sm text-gray-800">
                  {outlet.name}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  {outlet.voucher.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {outlet.sales.toLocaleString()} THB
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutletSales;
