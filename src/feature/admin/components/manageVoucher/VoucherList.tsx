import { useNavigate } from 'react-router-dom';
import VoucherItem from './VoucherItem';
import { ProductDataSchema } from '@/data-schema/product.type';

interface ProductListProps {
  products: ProductDataSchema[];
}

const VoucherList: React.FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleVoucherClick = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <div className="grid w-full grid-cols-4 gap-4 px-6">
      {products.map((product) => (
        <VoucherItem
          key={product.id}
          handleVoucherClick={handleVoucherClick}
          voucher={product}
        />
      ))}
    </div>
  );
};

export default VoucherList;
