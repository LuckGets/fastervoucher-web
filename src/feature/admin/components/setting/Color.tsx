import { useState } from 'react';
import { Pencil } from 'lucide-react';
import Swal from 'sweetalert2';
import useSettingStore from '../../../../stores/setting-store';

const Color = () => {
  const { colorCode, actionGetShopInfo, actionEditShopInfo } =
    useSettingStore();
  const [color, setColor] = useState<string>(colorCode);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event.target.value;
    if (!value.startsWith('#')) {
      value = `#${value}`;
    }
    setColor(value);
  };

  const handleSave = async () => {
    try {
      await setIsEditing(false);
      actionEditShopInfo({ colorCode: color });
      Swal.fire({
        icon: 'success',
        title: 'Color saved!',
        text: `New color: ${color}`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      await actionGetShopInfo();
    } catch (error) {
      console.error('Error saving color:', error);
      Swal.fire({
        icon: 'error',
        title: 'Save failed!',
        text: 'There was an issue saving the color.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const handleCancel = () => {
    setColor(colorCode);
    setIsEditing(false);
    Swal.fire({
      icon: 'info',
      title: 'Changes discarded!',
      text: 'Color changes have been canceled.',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  return (
    <div className="mb-10">
      <div className="my-4 flex items-center justify-between">
        <h1>Store logo / Hotel logo Color</h1>
        {!isEditing ? (
          <span
            onClick={() => setIsEditing(true)}
            className="flex cursor-pointer items-center gap-1 text-basicGray"
          >
            <Pencil className="h-4 w-4" />
            <p>Edit</p>
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <input
              id="color-picker"
              type="color"
              value={color}
              onChange={handleColorChange}
              className="h-8 w-8 cursor-pointer border-none outline-none"
            />
            <input
              type="text"
              value={color}
              onChange={handleTextInputChange}
              className="w-24 rounded border border-gray-300 p-1"
              placeholder="Enter HEX"
            />
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
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <div className="text-xs text-basicGray">
          <p>HEX color {color}</p>
        </div>
      </div>
    </div>
  );
};

export default Color;
