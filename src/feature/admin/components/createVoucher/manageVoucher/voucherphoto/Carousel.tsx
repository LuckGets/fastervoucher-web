import {
  CreateVoucherData,
  ImageWithPreviewSrcType,
} from '@/stores/voucher-store';
import Sortable from './Sortable';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

// This is an interface for UI purpose only.
interface ImageItem extends ImageWithPreviewSrcType {
  id: number;
}

type CarouselProps = {
  images: CreateVoucherData['otherImgs'];
  onUpdateImages: (images: CreateVoucherData['otherImgs']) => void;
};

const Carousel: React.FC<CarouselProps> = ({ images, onUpdateImages }) => {
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);

  useEffect(() => {
    // Early return
    if (!images || images.length < 1) return;

    const initialItems: ImageItem[] = images
      .filter((image) => !!image && !!image.srcFile)
      .map((file, index) => ({
        id: Date.now() + index, // artificial id for draggable UI.
        srcFile: file.srcFile,
        srcStr: file.srcStr || URL.createObjectURL(file.srcFile as File),
      }));
    setImageItems(initialItems);
    // Cleanup: revoke object URLs when items change or on unmount
    return () => {
      initialItems.forEach((item) => {
        if (item.srcStr) URL.revokeObjectURL(item.srcStr);
      });
    };
  }, [images]);

  // Helper to update parent with just the File objects
  const updateParent = (items: ImageItem[]) => {
    onUpdateImages(items.map(({ srcFile, srcStr }) => ({ srcFile, srcStr })));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (images && over && active.id !== over.id) {
      const oldIndex = imageItems.findIndex((image) => image.id === active.id);
      const newIndex = imageItems.findIndex((image) => image.id === over.id);
      const updatedImages = arrayMove(imageItems, oldIndex, newIndex);
      setImageItems(updatedImages);
      updateParent(updatedImages);
    }
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   if (reader.result) {
      //     const newImage = { id: Date.now(), src: reader.result as string };
      //     onUpdateImages([...images, newImage]);
      //   }
      // };
      // reader.readAsDataURL(file);
      const newItem: ImageItem = {
        id: Date.now(),
        srcFile: file,
        srcStr: URL.createObjectURL(file),
      };
      const updatedItems = [...imageItems, newItem];
      setImageItems(updatedItems);
      updateParent(updatedItems);
    }
  };

  const handleEditImage = (
    imageId: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedItems = imageItems.map((item) =>
        item.id === imageId
          ? { ...item, file, preview: URL.createObjectURL(file) }
          : item,
      );
      setImageItems(updatedItems);
      updateParent(updatedItems);
    }
  };

  const handleDeleteImage = (imageId: number) => {
    const updatedItems = imageItems.filter((item) => item.id !== imageId);
    setImageItems(updatedItems);
    updateParent(updatedItems);
  };
  return (
    <div className="flex flex-col gap-3">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={imageItems.map((img) => img.id)}
          strategy={verticalListSortingStrategy}
        >
          {imageItems.map((image) => (
            <Sortable
              key={image.id}
              id={image.id}
              src={image.srcStr || ''}
              onEditImage={(e) => handleEditImage(image.id, e)}
              onDeleteImage={() => handleDeleteImage(image.id)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex h-12 w-[90%] cursor-pointer items-center justify-around rounded-xl bg-[#D9D9D9] text-basicGray">
        <label className="flex cursor-pointer">
          <Plus />
          <h1 className="ml-2">Add cover photo</h1>
          <input type="file" onChange={handleAddImage} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default Carousel;
