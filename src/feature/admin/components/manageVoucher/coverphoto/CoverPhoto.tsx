import useVoucherStore from '@/stores/voucher-store';
import { Pencil, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const CoverPhoto = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const updateVoucher = useVoucherStore((state) => state.updateVoucher);
  const { id } = useParams();
  const vouchers = useVoucherStore((state) => state.vouchers);

  const currentVoucher = vouchers.find((voucher) => voucher.id === Number(id));
  const [previewSrc, setPreviewSrc] = useState<string | null>(
    currentVoucher?.src || null,
  );
  const [tempSrc, setTempSrc] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setTempSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (id && tempSrc) {
      updateVoucher(Number(id), { src: tempSrc });
      setPreviewSrc(tempSrc);
      setTempSrc(null);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempSrc(null);
    setIsEditing(false);
  };

  const triggerFileUpload = () => {
    inputRef.current?.click();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    triggerFileUpload();
  };

  return (
    <div className="flex w-[90%] flex-col items-center gap-6 rounded-2xl p-6 px-8">
      <div className="flex items-center gap-6">
        <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-xl bg-[#E1E1E1]">
          {tempSrc || previewSrc ? (
            <img
              src={tempSrc || previewSrc || ''}
              alt="Preview"
              className="absolute inset-0 h-full w-full rounded-xl object-cover"
            />
          ) : (
            <Plus className="text-[#888888]" />
          )}
        </div>
      </div>

      <input
        type="file"
        ref={inputRef}
        accept=".jpg,.png"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="flex justify-between">
        {!isEditing ? (
          <span
            onClick={handleEditClick}
            className="flex cursor-pointer items-center gap-1 text-basicGray"
          >
            <Pencil className="h-4 w-4" />
            <p>Cover Photo</p>
          </span>
        ) : (
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
    </div>
  );
};

export default CoverPhoto;
