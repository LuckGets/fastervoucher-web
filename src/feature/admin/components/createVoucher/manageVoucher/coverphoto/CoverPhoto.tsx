import { Pencil, Plus } from 'lucide-react';
import { useRef, useState } from 'react';

interface CoverPhotoProps {
  src: File | null | undefined;
  onChange: (field: string, value: string | null) => void;
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({ src, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewSrc, setPreviewSrc] = useState<File | null>(src || null);
  const [tempSrc, setTempSrc] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setTempSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Unsupported file format. Please upload .jpg or .png files.');
    }
  };

  const handleSave = () => {
    if (tempSrc) {
      setPreviewSrc(tempSrc);
      onChange('src', tempSrc);
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

  const displaySrc = tempSrc || previewSrc || '';

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <div className="flex justify-between">
        <h1>Voucher Cover Photo</h1>
        {!isEditing ? (
          <span
            onClick={handleEditClick}
            className="flex cursor-pointer items-center gap-1 text-basicGray"
          >
            <Pencil className="h-4 w-4" />
            <p>Edit</p>
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
      <div className="flex items-center gap-6">
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl bg-[#E1E1E1]">
          {displaySrc ? (
            <img
              src={displaySrc}
              alt="Preview"
              className="absolute inset-0 h-full w-full rounded-xl object-cover"
            />
          ) : (
            <Plus className="text-[#888888]" />
          )}
        </div>
        <div className="text-xs text-[#888888]">
          <h1>Aspect Ratio: 1:1</h1>
          <h1>Recommended Size: 1040px x 1040px</h1>
          <h1>Supported File Formats: .jpg, .png</h1>
        </div>
      </div>

      <input
        type="file"
        ref={inputRef}
        accept=".jpg,.png"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CoverPhoto;
