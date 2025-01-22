import { promotion, PromotionType } from '@/utils/dashboard/promotion';
import { ArrowDownUp } from 'lucide-react';
import { useState } from 'react';

const Promotion = () => {
  const [sortedData, setSortedData] = useState<PromotionType[]>(promotion);
  const [sortOrder, setSortOrder] = useState<{
    field: keyof PromotionType;
    order: 'asc' | 'desc';
  }>({
    field: 'sales',
    order: 'desc',
  });

  const handleSort = (field: keyof PromotionType) => {
    const newOrder =
      sortOrder.field === field && sortOrder.order === 'desc' ? 'asc' : 'desc';
    const sorted = [...sortedData].sort((a, b) => {
      if (newOrder === 'desc') {
        return b[field] > a[field] ? 1 : -1;
      } else {
        return a[field] > b[field] ? 1 : -1;
      }
    });
    setSortedData(sorted);
    setSortOrder({ field, order: newOrder });
  };

  const columns: { key: keyof PromotionType; label: string }[] = [
    { key: 'name', label: 'Promotion / Package' },
    { key: 'sales', label: 'Sales (THB)' },
    { key: 'amount', label: 'Voucher' },
    { key: 'redeemed', label: 'Redeemed' },
    { key: 'expired', label: 'Expired' },
    { key: 'salesDate', label: 'Sales Date' },
    { key: 'useDate', label: 'Use Date' },
  ];

  return (
    <div className="rounded-xl bg-[#E1E1E1] p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`cursor-pointer px-4 py-2 text-sm font-semibold text-gray-700 ${
                    index === 0 ? 'text-start' : 'text-center'
                  }`}
                >
                  <span
                    className={`flex items-center gap-1 ${
                      index === 0 ? 'justify-start' : 'justify-center'
                    }`}
                  >
                    {col.label}
                    <ArrowDownUp
                      className={`w-5 text-[#888888] ${
                        sortOrder.field === col.key &&
                        sortOrder.order === 'desc'
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-dashed border-[#ADADAD]"
              >
                {columns.map((col, index) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-sm text-gray-800 ${
                      index === 0 ? 'text-start' : 'text-center'
                    }`}
                  >
                    {col.key === 'sales'
                      ? `${item[col.key]} THB`
                      : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Promotion;
