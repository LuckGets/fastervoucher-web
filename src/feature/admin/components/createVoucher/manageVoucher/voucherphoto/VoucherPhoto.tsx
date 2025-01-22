/* eslint-disable react/prop-types */
import Carousel from './Carousel';

interface VoucherPhotoProps {
  carouselImages?: Image[];
  onChange: (field: string, value: Image[]) => void;
}

interface Image {
  id: number;
  src: string;
}

const VoucherPhoto: React.FC<VoucherPhotoProps> = ({
  carouselImages,
  onChange,
}) => {
  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Voucher images</h1>
      <Carousel
        images={carouselImages || []}
        onUpdateImages={(updatedImages) =>
          onChange('carouselImages', updatedImages)
        }
      />
      <div className="text-xs text-basicGray">
        <h1>
          The aspect ratio of 1:2 means the width is twice the height. For
          example, an image with dimensions of 400px by 200px follows this
          ratio.
        </h1>
        <h1> Supported file formats include .jpg and .png.</h1>
      </div>
    </div>
  );
};

export default VoucherPhoto;
