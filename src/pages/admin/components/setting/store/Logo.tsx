import { useState } from 'react';
import { Pencil } from 'lucide-react';
import useSettingStore from '../../../../../stores/setting-store';

const Logo = () => {
  const logoImage = useSettingStore((state) => state.logoImage);
  const setSelectedImage = useSettingStore((state) => state.setSelectedImage);
  const [tempImage, setTempImage] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempImage(imageUrl);
      setIsEditing(true);
    }
  };

  const triggerFileUpload = () => {
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSave = () => {
    setSelectedImage(tempImage);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempImage('');
    setIsEditing(false);
  };

  return (
    <div>
      <div className="my-4 flex justify-between">
        <h1>Store logo / Hotel logo</h1>
        {!isEditing ? (
          <span
            onClick={triggerFileUpload}
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
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9]">
          <img
            src={isEditing ? tempImage : logoImage}
            alt="Uploaded logo"
            className="h-full w-full object-scale-down"
          />
        </div>
        <div className="text-xs text-basicGray">
          <p>Recommended image size: 1040 x 1040 px</p>
          <p>Supported file formats: .jpg, .png</p>
        </div>
      </div>

      <input
        id="file-upload"
        type="file"
        accept=".jpg,.png"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default Logo;
