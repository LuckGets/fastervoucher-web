/* eslint-disable react/prop-types */
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical, PencilLine, Trash2 } from 'lucide-react';

interface SortableProps {
  id: number;
  src: string;
  onEditImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: () => void;
}

const Sortable: React.FC<SortableProps> = ({
  id,
  src,
  onEditImage,
  onDeleteImage,
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
      <div className="flex gap-6 text-basicGray">
        <label className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#888888] hover:text-textWhite">
          <PencilLine />
          <input type="file" onChange={onEditImage} className="hidden" />
        </label>
        <label className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#888888] hover:text-textWhite">
          <Trash2 className="cursor-pointer" onClick={onDeleteImage} />
        </label>
      </div>
      <div className="text-basicGray">
        <GripVertical />
      </div>
    </div>
  );
};

export default Sortable;
