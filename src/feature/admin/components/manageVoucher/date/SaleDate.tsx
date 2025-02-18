import useVoucherStore from '../../../../../stores/voucher-store';
import { Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';

const SaleDate = () => {
  const { voucherById } = useVoucherStore();

  const [saleDate, setSaleDate] = useState<string>(
    voucherById?.sellStartAt || '',
  );
  const [endDate, setEndDate] = useState<string>(
    voucherById?.sellExpiredAt || '',
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setSaleDate(voucherById?.sellStartAt || '');
    setEndDate(voucherById?.sellExpiredAt || '');
  }, [voucherById?.sellStartAt, voucherById?.sellExpiredAt]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaleDate(e.target.value);
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
      //   saleStartDate: saleDate || undefined,
      //   saleEndDate: endDate || undefined,
      // });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSaleDate(voucherById?.sellStartAt || '');
    setEndDate(voucherById?.sellExpiredAt || '');
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
        <h1 className="font-semibold">Sale Date</h1>
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
              value={saleDate}
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
            Start sale:{' '}
            {saleDate ? formatDateTime(saleDate) : 'No sale date set'}
          </h1>
          <h1>
            End sale: {endDate ? formatDateTime(endDate) : 'No end date set'}
          </h1>
        </div>
      )}
    </div>
  );
};

export default SaleDate;
