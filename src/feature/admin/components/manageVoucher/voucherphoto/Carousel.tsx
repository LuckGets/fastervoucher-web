import { useParams } from 'react-router-dom';
import useVoucherStore from '../../../../../stores/voucher-store';
import Sortable from './Sortable';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

type ImageType = {
  id: number;
  src: string;
};

const Carousel = () => {
  const { id } = useParams<{ id: string }>();
  const { vouchers } = useVoucherStore();
  // const updateVoucher = useVoucherStore((state) => state.updateVoucher);

  const voucher = vouchers.find((v) => v.id === id);

  const images: ImageType[] = voucher?.images || [];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      const updatedImages = arrayMove(images, oldIndex, newIndex);
      console.log('updatedImages :>> ', updatedImages);
      // updateVoucher(Number(id), { carouselImages: updatedImages });
    }
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && id) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const newImage = { id: Date.now(), src: reader.result as string };
          // updateVoucher(Number(id), {
          //   carouselImages: [...images, newImage],
          // });
          console.log('newImage :>> ', newImage);
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
    if (file && id) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const updatedImages = images.map((img) =>
            img.id === imageId ? { ...img, src: reader.result as string } : img,
          );

          console.log('updatedImages :>> ', updatedImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (imageId: number) => {
    if (id) {
      const updatedImages = images.filter((img) => img.id !== imageId);
      console.log('updatedImages :>> ', updatedImages);
      // updateVoucher(Number(id), { carouselImages: updatedImages });
    }
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
