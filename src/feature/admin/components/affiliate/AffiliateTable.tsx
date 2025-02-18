import { useState } from 'react';
import { affiliate } from '../../../../utils/affiliate/affiliateList';
import {
  ArrowDownUp,
  CalendarDays,
  Mail,
  MousePointer2,
  Percent,
  UsersRound,
} from 'lucide-react';

interface Affiliate {
  id: number;
  name: string;
  email: string;
  click: number;
  sales: number;
  com: number;
  created: string;
  status: 'Active' | 'Inactive';
}

interface AffiliateTableProps {
  searchTerm: string;
  statusFilter: 'All' | 'Active' | 'Inactive';
}

const AffiliateTable = ({ searchTerm, statusFilter }: AffiliateTableProps) => {
  const [sortedData, setSortedData] = useState<Affiliate[]>(
    affiliate as Affiliate[],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [sortOrder, setSortOrder] = useState<
    Record<'click' | 'sales' | 'com' | 'created', 'asc' | 'desc'>
  >({
    click: 'asc',
    sales: 'asc',
    com: 'asc',
    created: 'asc',
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (
    key: keyof Pick<Affiliate, 'click' | 'sales' | 'com' | 'created'>,
  ) => {
    const order = sortOrder[key] === 'asc' ? 'desc' : 'asc';
    const sorted = [...sortedData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
    setSortedData(sorted);
    setSortOrder((prev) => ({ ...prev, [key]: order }));
  };

  const toggleStatus = (id: number) => {
    setSortedData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'Active' ? 'Inactive' : 'Active',
            }
          : item,
      ),
    );
  };

  const filteredData = sortedData.filter(
    (affiliate) =>
      (statusFilter === 'All' || affiliate.status === statusFilter) &&
      (affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="mt-4 flex flex-col overflow-x-auto">
      <table className="min-w-full table-auto text-left">
        <thead>
          <tr className="grid grid-cols-7 items-center justify-center">
            <th className="flex items-center gap-1 px-8 py-2">
              <UsersRound />
              Name
            </th>
            <th className="flex items-center gap-1 px-8 py-2">
              <Mail className="w-5" />
              Email
            </th>
            <th
              className="flex cursor-pointer items-center gap-1 px-10 py-2"
              onClick={() => handleSort('click')}
            >
              <MousePointer2 className="w-4" />
              Clicks
              <ArrowDownUp className="w-5 text-[#888888]" />
            </th>
            <th
              className="flex cursor-pointer items-center gap-1 px-12 py-2"
              onClick={() => handleSort('sales')}
            >
              Sales
              <ArrowDownUp className="w-5 text-[#888888]" />
            </th>
            <th
              className="flex cursor-pointer items-center gap-1 px-10 py-2"
              onClick={() => handleSort('com')}
            >
              <Percent />
              Com
              <ArrowDownUp className="w-5 text-[#888888]" />
            </th>
            <th
              className="flex cursor-pointer items-center gap-1 px-6 py-2"
              onClick={() => handleSort('created')}
            >
              <CalendarDays />
              Created
              <ArrowDownUp className="w-5 text-[#888888]" />
            </th>
            <th className="px-14 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="mt-4 grid grid-cols-1 gap-4">
          {getCurrentPageData().map((aff) => (
            <tr
              key={aff.id}
              className="grid grid-cols-7 items-center justify-center rounded-xl border-t bg-[#E1E1E1] p-2 text-center text-sm hover:bg-[#a3a3a3a0]"
            >
              <td className="px-4 py-2">{aff.name}</td>
              <td className="px-4 py-2">{aff.email}</td>
              <td className="px-4 py-2">{aff.click}</td>
              <td className="px-4 py-2">{aff.sales}</td>
              <td className="px-4 py-2">{aff.com}%</td>
              <td className="px-4 py-2">
                {new Date(aff.created).toLocaleDateString()}
              </td>
              <td
                className={`cursor-pointer px-4 py-2 font-semibold ${aff.status === 'Active' ? 'text-[#006838]' : 'text-[#F87171]'}`}
                onClick={() => toggleStatus(aff.id)}
              >
                {aff.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md bg-gray-300 px-4 py-2 text-gray-500"
        >
          Previous
        </button>
        <span className="mx-4">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md bg-gray-300 px-4 py-2 text-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AffiliateTable;
