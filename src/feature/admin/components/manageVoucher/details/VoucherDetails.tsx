import useVoucherStore from '@/stores/voucher-store';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Pencil } from 'lucide-react';

const VoucherDetails = () => {
  const { voucherById } = useVoucherStore();

  const [details, setDetails] = useState(voucherById?.description || '');
  const [isEditing, setIsEditing] = useState(false);

  if (!voucherById) {
    return <p>Voucher not found!</p>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // updateVoucher(voucherId, { details });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDetails(voucherById?.description || '');
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Voucher details</h1>
        {!isEditing && (
          <button onClick={handleEdit} className="ml-2">
            <span className="flex items-center gap-1 text-basicGray">
              <Pencil className="h-4 w-4" />
              <p>Edit</p>
            </span>
          </button>
        )}
        {isEditing && (
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
        )}
      </div>

      <div>
        {isEditing ? (
          <ReactQuill
            value={details}
            onChange={setDetails}
            className="w-full rounded-xl bg-[#E1E1E1]"
            theme="snow"
          />
        ) : (
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: details || '<p>No information</p>',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default VoucherDetails;
