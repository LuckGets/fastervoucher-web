import { useState, useEffect, useRef, FC } from 'react';
import { VoucherDataSchema } from '../../../data-schema/voucher.type';
import { VoucherQueryFunc } from '../../../api/voucher/voucher-query';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import NullableType from '../../../utils/types/nullable.type';
import { HomePageProductListProps } from './ProductWrapper';
import ProductItem from './ProductItem';
import { PackageQueryFunc } from '../../../api/package/package-query';
import {
  isProductPackageType,
  PackageDataSchema,
} from '../../../data-schema/package.type';
import ProductDetails from './ProductDetails';
import { ProductDataSchema } from '../../../data-schema/product.type';
import VoucherLoading from '../../../components/VoucherLoading';

const DEFAULT_PRODUCT_LIMIT = 10;

type SelectedProductType = {
  id: string;
  type: 'voucher' | 'package' | '';
};

const INIT_SELECTED_PRODUCT: {
  id: string;
  type: 'voucher' | 'package' | '';
} = {
  id: '',
  type: '',
};

const HomePageProductList: FC<HomePageProductListProps> = ({ queries }) => {
  // for infinite scroll
  const voucherBottomSentinelRef = useRef<HTMLDivElement>(null);
  const packageBottomSentinelRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<SelectedProductType>(
    INIT_SELECTED_PRODUCT,
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let selectedVoucher: NullableType<VoucherDataSchema> = null;

  const currentPage = 1;

  // Fetching pagination voucher list.
  const {
    data: vouchersAxiosData,
    isError: isErrorVoucher,
    error: errorVoucher,
    isPending: isPendingVoucher,
    isFetchingNextPage: isFetchingVoucherNextPage,
    fetchNextPage: fetchVoucherNextPage,
    hasNextPage: hasNextVoucherPage,
  } = useInfiniteQuery(VoucherQueryFunc.getManyInifinite(queries));

  // ---------------------------------

  // Fetching pagination package list.
  const {
    data: packagesAxiosData,
    isError: isErrorPackage,
    error: errorPackage,
    isPending: isPendingPackage,
    isFetchingNextPage: isFetchingNextPackagePage,
    fetchNextPage: fetchPackageNextPage,
    hasNextPage: hasNextPackagePage,
  } = useInfiniteQuery(PackageQueryFunc.getManyInfinite(queries));

  // ---------------------------------

  const vouchers: VoucherDataSchema[] =
    vouchersAxiosData?.pages?.flatMap((page) => page.data.data) || [];
  const packages: PackageDataSchema[] =
    packagesAxiosData?.pages?.flatMap((page) => page.data.data) || [];

  const products: (VoucherDataSchema | PackageDataSchema)[] = [...packages];

  if (
    products.length < currentPage * DEFAULT_PRODUCT_LIMIT &&
    !hasNextPackagePage
  ) {
    products.push(...vouchers);
  }
  // Always call both hooks
  const voucherQuery = useQuery({
    ...VoucherQueryFunc.getById(selectedProduct.id),
    enabled: !!selectedProduct.id && selectedProduct.type === 'voucher',
  });

  const packageQuery = useQuery({
    ...PackageQueryFunc.getById(selectedProduct.id),
    enabled: !!selectedProduct.id && selectedProduct.type === 'package',
  });

  if (selectedProduct.type === 'voucher') {
    if (voucherQuery.isError) {
      throw new Error(voucherQuery.error?.message);
    }
    if (voucherQuery.data?.data) {
      const { data } = voucherQuery.data.data;
      selectedVoucher = data;
    }
  } else if (selectedProduct.type === 'package') {
    if (packageQuery.isError) {
      throw new Error(packageQuery.error?.message);
    }
    if (packageQuery.data?.data) {
      const { data } = packageQuery.data.data;
      selectedVoucher = data;
    }
  }

  // --- Infinite scrolling part. --- //

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (
        entry.isIntersecting &&
        hasNextVoucherPage &&
        !isFetchingVoucherNextPage
      ) {
        fetchVoucherNextPage();
      }

      if (
        entry.isIntersecting &&
        hasNextPackagePage &&
        !isFetchingNextPackagePage
      ) {
        fetchPackageNextPage();
      }
    });

    const voucherSentinel = voucherBottomSentinelRef.current;
    const packageSentinel = packageBottomSentinelRef.current;

    if (voucherSentinel) observer.observe(voucherSentinel);
    if (packageSentinel) observer.observe(packageSentinel);

    return () => {
      if (voucherSentinel) observer.unobserve(voucherSentinel);
      if (packageSentinel) observer.unobserve(packageSentinel);
    };
  }, [
    hasNextVoucherPage,
    hasNextPackagePage,
    fetchVoucherNextPage,
    fetchPackageNextPage,
    isFetchingVoucherNextPage,
    isFetchingNextPackagePage,
    currentPage,
  ]);

  // --- End of Infinite scrolling part. --- //

  const handleOnclick = (product: ProductDataSchema | PackageDataSchema) => {
    if (isProductPackageType(product)) {
      setSelectedProduct({ id: product.id, type: 'package' });
    } else setSelectedProduct({ id: product.id, type: 'voucher' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // setSelectedVoucher(null);
  };

  if (isErrorVoucher || isErrorPackage) {
    throw new Error(errorVoucher?.message || errorPackage?.message);
  }

  if (isPendingVoucher || isPendingPackage) return <VoucherLoading />;

  return (
    <div className="mb-20 grid w-full grid-cols-2 gap-4 px-4 md:grid-cols-3 md:px-12 lg:grid-cols-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          handleOnClick={handleOnclick}
        />
      ))}

      {hasNextPackagePage && (
        <div ref={packageBottomSentinelRef} style={{ height: '1px' }}></div>
      )}
      {hasNextVoucherPage && (
        <div ref={voucherBottomSentinelRef} style={{ height: '10px' }}></div>
      )}

      {isFetchingVoucherNextPage && <p>Loading more vouchers...</p>}

      {isModalOpen && selectedVoucher && (
        <ProductDetails product={{ ...selectedVoucher }} onClose={closeModal} />
      )}
    </div>
  );
};

export default HomePageProductList;
