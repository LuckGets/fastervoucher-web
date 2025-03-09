import {
  ProductDataSchema,
  ProductDiscountEnum,
} from '@/data-schema/product.type';
import { prependHttpsToString } from '@/utils/function/stringToUrl';
import { IOnSelectVoucherArgument } from './VoucherListModal';

interface VoucherItemChoiceProps {
  product: ProductDataSchema;
  handleOnClick: ({ id, title, img }: IOnSelectVoucherArgument) => void;
}

const VoucherItemChoice: React.FC<VoucherItemChoiceProps> = ({
  product,
  handleOnClick,
}) => {
  const defaultStockAmountWarningNumber: number = 20;
  const mainImg = prependHttpsToString(product.images[0].imgPath);

  const { id, title, images } = product;

  const img = images.filter((item) => !!item.mainImg)[0].imgPath;

  const handleClick = () => handleOnClick({ id, title, img });

  return (
    <div
      key={product.id}
      onClick={handleClick}
      className="cursor-pointer rounded-2xl active:bg-[#0000003a] md:flex md:flex-col md:items-center md:pt-2"
    >
      <img
        src={mainImg || '/placeholder-image.png'}
        alt={product.title}
        className="h-44 w-44 rounded-2xl object-cover md:h-48 md:w-48 lg:h-52 lg:w-52"
      />
      <div>
        <h1 className="mt-1 truncate px-2 text-sm md:text-lg">
          {product.title}
        </h1>
        <div className="flex items-center px-2">
          {product.discount &&
          product.discount.status === ProductDiscountEnum.ACTIVE ? (
            <>
              <h2 className="text-[11px] text-gray-500 line-through md:text-sm">
                THB {product.price} ++
              </h2>
              <span className="ml-2 text-[11px] text-red-500 md:text-sm">
                THB {product.discount.discountedPrice.toLocaleString()} NET
              </span>
            </>
          ) : (
            <h2 className="text-xs text-gray-500 md:text-sm">
              THB {product.price.toLocaleString()} ++
            </h2>
          )}
        </div>
      </div>
      {product?.stockAmount !== undefined &&
        product?.stockAmount !== null &&
        product?.stockAmount < defaultStockAmountWarningNumber && (
          <p className="mt-2 text-[10px] text-red-500 md:text-xs">
            Only {product.stockAmount} left!
          </p>
        )}
    </div>
  );
};

export default VoucherItemChoice;
