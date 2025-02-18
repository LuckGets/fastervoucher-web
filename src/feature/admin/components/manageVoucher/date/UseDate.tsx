import useVoucherStore from '../../../../../stores/voucher-store';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

const UseDate = () => {
  const { voucherById } = useVoucherStore();

  const [useDate, setUseDate] = useState<string>(voucherById?.usableAt || '');
  const [endDate, setEndDate] = useState<string>(
    voucherById?.usableExpiredAt || '',
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseDate(e.target.value);
  };
  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (voucherById) {
      // updateVoucher(voucherId, {
      //   useDateStart: useDate || undefined,
      //   useDateEnd: endDate || undefined,
      // });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUseDate(voucherById?.usableAt || '');
    setEndDate(voucherById?.usableExpiredAt || '');
    setIsEditing(false);
  };

  const formatDateTime = (date: string) => {
    if (!date) return '';
    const [datePart, timePart] = date.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    return `${day}/${month}/${year} time ${hours}:${minutes}`;
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Use Date</h1>
        {isEditing ? (
          <div className="flex gap-2">
            <span
              onClick={handleSave}
              className="cursor-pointer text-primary hover:underline"
            >
              Save
            </span>
            |
            <span
              onClick={handleCancel}
              className="cursor-pointer text-red-500 hover:underline"
            >
              Cancel
            </span>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 text-basicGray"
          >
            <Pencil className="h-4 w-4" />
            <p>Edit</p>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex items-center gap-24">
          <div className="flex flex-col gap-2">
            <h1>Sale Start Date & Time</h1>
            <input
              type="datetime-local"
              value={useDate}
              onChange={handleDateChange}
              className="rounded-full bg-[#D9D9D9] p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1>Sale End Date & Time</h1>
            <input
              type="datetime-local"
              value={endDate}
              onChange={handleEndDate}
              className="rounded-full bg-[#D9D9D9] p-2"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h1>
            Start use voucher:{' '}
            {useDate ? formatDateTime(useDate) : 'No use date set'}
          </h1>
          <h1>
            Use use voucher:{' '}
            {endDate ? formatDateTime(endDate) : 'No use date set'}
          </h1>
        </div>
      )}
    </div>
  );
};

export default UseDate;
