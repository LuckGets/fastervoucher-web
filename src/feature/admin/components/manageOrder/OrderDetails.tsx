import { X } from 'lucide-react';

interface Item {
  date: string;
}

interface Detail {
  id: number;
  name: string;
  customer: string;
}

interface Voucher {
  expireDate: string;
}

const OrderDetails = ({
  item,
  detail,
  voucher,
  onClose,
}: {
  item: Item;
  detail: Detail;
  voucher: Voucher;
  onClose: () => void;
}) => {
  const historyLog = [
    {
      date: 'Tue, 31 Dec 2024 3:45 PM',
      description: 'Create order successfully',
    },
    { date: 'Tue, 31 Dec 2024 3:45 PM', description: 'Edit order' },
    { date: 'Tue, 31 Dec 2024 3:45 PM', description: 'Resend Email' },
    { date: 'Tue, 31 Dec 2024 3:45 PM', description: 'Voucher Redeemed' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
      <div className="relative flex h-[90%] w-[90%] max-w-5xl flex-col rounded-xl bg-[#F7F3ED] p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-700 hover:bg-gray-300"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-1 gap-6 overflow-hidden">
          <div className="flex w-1/2 flex-col gap-4 overflow-auto">
            <div>
              <h2 className="text-xl">Voucher Details</h2>
              <hr className="w-[90%] border border-[#888888]" />
              <div>
                <p className="mt-4 font-semibold">Order ID</p>
                <p className="text-[#888888]">{detail.id}</p>
              </div>
              <div>
                <p className="mt-4 font-semibold">
                  Voucher Name / Package / Promotion
                </p>
                <p className="text-[#888888]">{detail.name}</p>
              </div>
              <div>
                <p className="mt-4 font-semibold">Voucher Start Date</p>
                <p className="text-[#888888]">
                  {new Date(item.date).toLocaleDateString('en-GB')} Time{' '}
                  {new Date(item.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>
              </div>
              <div>
                <p className="mt-4 font-semibold">Voucher Expiry Date</p>
                <p className="text-[#888888]">
                  {new Date(voucher.expireDate).toLocaleDateString('en-GB')}{' '}
                  Time{' '}
                  {new Date(voucher.expireDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-1/2 flex-col overflow-auto">
            <h2 className="text-xl">History log</h2>
            <div className="mx-4 mt-4">
              <ol className="relative border-s border-gray-200">
                {historyLog.map((log, index) => (
                  <li key={index} className="ms-4">
                    <span className="absolute -left-1 flex h-2 w-2 items-center justify-center rounded-full bg-[#888888] ring-4 ring-[#F7F3ED]">
                      <span className="block h-2 w-2 rounded-full bg-[#888888]"></span>
                    </span>
                    <time className="mb-1 text-sm font-normal leading-none text-[#888888]">
                      {log.date}
                    </time>
                    <p className="text-base font-semibold text-[#3F3F3F]">
                      {log.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
