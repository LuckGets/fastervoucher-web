/* eslint-disable react/prop-types */
import Sortable from './Sortable';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

interface ImageType {
  id: number;
  src: string;
}

type CarouselProps = {
  images: ImageType[];
  onUpdateImages: (images: ImageType[]) => void;
};

const Carousel: React.FC<CarouselProps> = ({ images, onUpdateImages }) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      const updatedImages = arrayMove(images, oldIndex, newIndex);
      onUpdateImages(updatedImages);
    }
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const newImage = { id: Date.now(), src: reader.result as string };
          onUpdateImages([...images, newImage]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = (
    imageId: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const updatedImages = images.map((img) =>
            img.id === imageId ? { ...img, src: reader.result as string } : img,
          );
          onUpdateImages(updatedImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (imageId: number) => {
    const updatedImages = images.filter((img) => img.id !== imageId);
    onUpdateImages(updatedImages);
  };

  return (
    <div className="flex flex-col gap-3">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={verticalListSortingStrategy}
        >
          {images.map((image) => (
            <Sortable
              key={image.id}
              id={image.id}
              src={image.src}
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
