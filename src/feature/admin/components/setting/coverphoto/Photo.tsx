import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import Sortable from './Sortable';
import useSettingStore from '../../../../../stores/setting-store';

interface Image {
  id: number;
  src: string;
}

const Photo: React.FC = () => {
  const initialImages = useSettingStore((state) => state.carouselImages);
  const [images, setImages] = useState<Image[]>(
    initialImages.map((img: { src: string }, index: number) => ({
      id: index,
      src: img.src,
    })),
  );

  const updateCarouselImages = useSettingStore(
    (state) => state.updateCarouselImages,
  );

  const [imageToDelete, setImageToDelete] = useState<number | null>(null);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImage: Image = {
        id: images.length,
        src: URL.createObjectURL(file),
      };
      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      updateCarouselImages(updatedImages);
    }
  };

  const handleDeleteImage = (id: number) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    updateCarouselImages(updatedImages);
    setImageToDelete(null);
  };

  const handleEditImage = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedImages = images.map((image) =>
        image.id === id ? { ...image, src: URL.createObjectURL(file) } : image,
      );
      setImages(updatedImages);
      updateCarouselImages(updatedImages);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      const updatedImages = arrayMove(images, oldIndex, newIndex);
      setImages(updatedImages);
      updateCarouselImages(updatedImages);
    }
  };

  const handleConfirmDelete = (id: number) => {
    setImageToDelete(id);
  };

  const handleCancelDelete = () => {
    setImageToDelete(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          {images.map((image) => (
            <Sortable
              key={image.id}
              id={image.id}
              src={image.src}
              onEditImage={(e) => handleEditImage(image.id, e)}
              onDeleteImage={() =>
                imageToDelete === image.id
                  ? handleDeleteImage(image.id)
                  : handleConfirmDelete(image.id)
              }
              isDeleting={imageToDelete === image.id}
              onCancelDelete={handleCancelDelete}
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

export default Photo;
