import useVoucherStore from '@/stores/voucher-store';
import { Pencil } from 'lucide-react';
import { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';

const VoucherTerm = () => {
  const { id } = useParams<{ id: string }>();
  const voucherId = parseInt(id || '0');
  const { vouchers, updateVoucher } = useVoucherStore();
  const voucher = vouchers.find((v) => v.id === voucherId);

  const [conditions, setConditions] = useState(voucher?.conditions || '');
  const [isEditing, setIsEditing] = useState(false);

  // Move this useMemo outside of any conditions
  const modules = useMemo(() => ({ toolbar: false }), []);

  if (!voucher) {
    return <p>Voucher not found!</p>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateVoucher(voucherId, { conditions });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setConditions(voucher?.conditions || '');
    setIsEditing(false);
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Voucher Terms and Conditions</h1>
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
            value={conditions}
            onChange={setConditions}
            className="w-full rounded-xl bg-[#E1E1E1]"
            theme="snow"
          />
        ) : (
          <div className="mt-2">
            <ReactQuill
              value={voucher.conditions || '<p>No information</p>'}
              readOnly={true}
              modules={modules}
              formats={formats}
              className="border-0 text-xs md:text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VoucherTerm;
