import { useFilterStore } from '@/stores/filter-store';
import { orderLists } from '@/utils/main/orderLists';
import { CalendarDays, Clock, UserRound } from 'lucide-react';
import { useState } from 'react';

const VoucherTable = ({ searchTerm }: { searchTerm: string }) => {
  const { selectedChannel } = useFilterStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const isExpired = (expireDate: string) => {
    const currentDate = new Date();
    const expirationDate = new Date(expireDate);
    return expirationDate < currentDate;
  };

  const filteredData = selectedChannel
    ? orderLists.filter((item) =>
        item.OrderDetails.some((detail) => detail.channels === selectedChannel),
      )
    : orderLists;

  const searchFilteredData = filteredData.filter((item) =>
    item.OrderDetails.some((detail) =>
      detail.vouchers.some(
        (voucher) =>
          voucher.no.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          detail.customer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    ),
  );

  const totalPages = Math.ceil(searchFilteredData.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return searchFilteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-text">
            <tr className="grid grid-cols-7 items-center justify-center">
              <th className="ml-14 flex-grow-[1.5] py-3 text-center font-normal">
                OrderID
              </th>
              <th className="flex-grow py-3 text-center font-normal">
                Voucher no.
              </th>
              <th className="ml-14 flex flex-grow gap-1 py-3 text-center font-normal">
                <CalendarDays /> Date
              </th>
              <th className="flex-grow py-3 text-center font-normal">
                Promotion
              </th>
              <th className="ml-12 flex flex-grow-[1.5] gap-1 py-3 text-center font-normal">
                <UserRound /> Name
              </th>
              <th className="ml-12 flex flex-grow gap-1 py-3 text-center font-normal">
                <CalendarDays /> Expired
              </th>
              <th className="flex-grow py-3 text-center font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="mt-4 grid grid-cols-1 gap-4">
            {getCurrentPageData().map((item) =>
              item.OrderDetails.filter(
                (detail) =>
                  !selectedChannel || detail.channels === selectedChannel,
              ).map((detail) => (
                <>
                  {detail.vouchers.map((voucher) => (
                    <tr
                      key={voucher.no}
                      className="grid grid-cols-7 items-center justify-center rounded-xl border-t bg-[#E1E1E1] p-2 text-sm hover:bg-[#a3a3a3a0]"
                    >
                      <td className="flex flex-grow-[1.5] items-center text-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={detail.src}
                            alt="pic"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="ml-4">
                          <h4 className="max-w-sm truncate">{detail.name}</h4>
                          <p className="mt-2 text-start text-sm text-basicGray">
                            {detail.id}
                          </p>
                        </div>
                      </td>
                      <td className="mt-7 flex-grow text-center text-sm text-basicGray">
                        {voucher.no}
                      </td>
                      <td className="flex-grow text-center">
                        <div className="flex flex-col">
                          <h1>
                            {new Date(item.date).toLocaleDateString('en-GB')}
                          </h1>
                          <p className="mt-2 text-sm text-basicGray">
                            {new Date(item.date).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="flex-grow text-center">
                        <div>
                          <h1>ไทยเที่ยวไทย #71</h1>
                          <div
                            className={`inline-block rounded-full p-1 px-2 text-textWhite ${detail.channels === 'Line Shopping' ? 'bg-[#2BB673]' : detail.channels === 'Shopee' ? 'bg-[#EE4D2D]' : ''}`}
                          >
                            <p className="text-xs">{detail.channels}</p>
                          </div>
                        </div>
                      </td>
                      <td className="flex-grow-[1.5] text-center">
                        {detail.customer}
                      </td>
                      <td className="flex-grow text-center">
                        <h4>
                          {new Date(voucher.expireDate).toLocaleDateString(
                            'en-GB',
                          )}
                        </h4>
                        <div className="mt-2 flex justify-center gap-1 text-basicGray">
                          <Clock className="h-4 w-4" />
                          <p className="text-sm">
                            {new Date(voucher.expireDate).toLocaleTimeString(
                              [],
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                              },
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="flex flex-grow justify-center">
                        {voucher.isUse ? (
                          <div className="flex flex-col items-center gap-2">
                            <h1>
                              {voucher.useDate
                                ? new Date(voucher.useDate).toLocaleDateString(
                                    'en-GB',
                                  )
                                : 'N/A'}
                            </h1>
                            <h1 className="flex items-center gap-1 text-basicGray">
                              <Clock className="w-4" />
                              {voucher.useDate
                                ? new Date(voucher.useDate).toLocaleTimeString(
                                    [],
                                    {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false,
                                    },
                                  )
                                : 'N/A'}
                            </h1>
                          </div>
                        ) : (
                          <button
                            className={`rounded-md p-2 text-xs ${isExpired(voucher.expireDate) ? 'bg-[#b8b8b8] text-gray-500' : 'bg-primary text-white'}`}
                            disabled={isExpired(voucher.expireDate)}
                          >
                            {isExpired(voucher.expireDate)
                              ? 'Expired'
                              : 'Redeem Voucher'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              )),
            )}
          </tbody>
        </table>
      </div>

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

export default VoucherTable;
