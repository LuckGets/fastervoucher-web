/* eslint-disable react/prop-types */
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import {
  GripVertical,
  PencilLine,
  Trash2,
  XCircle,
  CheckCircle,
} from 'lucide-react';

interface SortableProps {
  id: number;
  src: string;
  onEditImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: () => void;
  isDeleting: boolean;
  onCancelDelete: () => void;
}

const Sortable: React.FC<SortableProps> = ({
  id,
  src,
  onEditImage,
  onDeleteImage,
  isDeleting,
  onCancelDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex h-24 w-[90%] items-center justify-around rounded-xl bg-[#D9D9D9] hover:bg-[#a3a3a3a0]"
    >
      <div className="h-14 w-28 overflow-hidden rounded-xl">
        <img src={src} alt="pic" className="h-full w-full object-cover" />
      </div>

      {isDeleting ? (
        <div className="flex gap-6 text-basicGray">
          <button
            onClick={onDeleteImage}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#FF6B6B] hover:text-textWhite"
          >
            <CheckCircle />
            Save
          </button>
          <button
            onClick={onCancelDelete}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#6B6BFF] hover:text-textWhite"
          >
            <XCircle />
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-6 text-basicGray">
          <label className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#888888] hover:text-textWhite">
            <PencilLine />
            <input type="file" onChange={onEditImage} className="hidden" />
          </label>
          <button
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#888888] hover:text-textWhite"
            onClick={onDeleteImage}
          >
            <Trash2 />
          </button>
        </div>
      )}

      <div className="text-basicGray">
        <GripVertical />
      </div>
    </div>
  );
};

export default Sortable;
