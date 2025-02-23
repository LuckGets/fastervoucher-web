import { VoucherDataSchema } from '../../../../../data-schema/voucher.type';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

interface CoverPhotoProps {
  voucher: VoucherDataSchema;
  mainImg: VoucherDataSchema['images'][number];
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({ voucher, mainImg }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useParams();
  console.log(voucher);

  const [previewSrc, setPreviewSrc] = useState<string | null>(
    mainImg.imgPath || null,
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
      // updateVoucher(Number(id), { src: tempSrc });
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
      <p>Cover Photo</p>
      <div className="flex items-center gap-6">
        <div className="relative flex h-52 w-52 items-center justify-center overflow-hidden rounded-xl bg-[#E1E1E1]">
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
      <div className="absolute left-[28rem] top-[24.5rem] z-30 rounded-full bg-[#F7F3ED] p-2 hover:bg-[#e2ded8]">
        <div className="flex justify-between">
          {!isEditing ? (
            <span
              onClick={handleEditClick}
              className="flex cursor-pointer items-center gap-1 text-basicGray"
            >
              <Pencil className="h-4 w-4" />
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span
                onClick={handleSave}
                className="cursor-pointer text-primary hover:underline"
              >
                <Save className="h-4 w-4" />
              </span>
              |
              <span
                onClick={handleCancel}
                className="cursor-pointer text-red-500 hover:underline"
              >
                <X className="h-4 w-4" />
              </span>
            </div>
          )}
        </div>
      </div>
      {!isEditing && (
        <div className="absolute left-[30.5rem] top-[24.5rem] z-30 rounded-full bg-[#F7F3ED] p-2 hover:bg-[#e2ded8]">
          <div className="flex justify-between">
            <span
              onClick={handleEditClick}
              className="flex cursor-pointer items-center gap-1 text-basicGray"
            >
              <Trash2 className="h-4 w-4" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverPhoto;
