import { useState, useEffect, useRef, FC } from 'react';
import VoucherDetails from './VoucherDetails';
import { VoucherDataSchema } from '@/data-schema/voucher.type';
import VoucherItem from './VoucherItem';
import { IVoucherListQueriesAndState } from './ProductPart';
import { VoucherQueryFunc } from '@/api/voucher/voucher-query';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import NullableType from '@/utils/types/nullable.type';

interface HomePageVoucherWrapperProps {
  queries: IVoucherListQueriesAndState;
}

const HomePageVoucherWrapper: FC<HomePageVoucherWrapperProps> = ({
  queries,
}) => {
  // for infinite scroll
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  const [selectedVoucherId, setSelectedVoucherId] = useState<
    VoucherDataSchema['id'] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let selectedVoucher: NullableType<VoucherDataSchema> = null;

  const {
    data: vouchersAxiosData,
    isError,
    error,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(VoucherQueryFunc.getManyInifinite(queries));

  const {
    data: axiosSelectedVoucherResp,
    isError: selectedVoucherIsError,
    error: selectedVoucherError,
  } = useQuery({
    ...VoucherQueryFunc.getById(selectedVoucherId ?? ''),
    enabled: !!selectedVoucherId,
  });

  if (selectedVoucherIsError) throw new Error(selectedVoucherError?.message);

  if (axiosSelectedVoucherResp?.data)
    selectedVoucher = axiosSelectedVoucherResp?.data.data;

  const vouchers: VoucherDataSchema[] =
    vouchersAxiosData?.pages?.flatMap((page) => page.data.data) || [];

  // --- Infinite scrolling part. --- //

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );
    if (bottomSentinelRef.current) {
      observer.observe(bottomSentinelRef.current);
    }

    return () => {
      if (bottomSentinelRef.current) {
        observer.unobserve(bottomSentinelRef.current);
      }
    };
  }, [hasNextPage]);

  // --- End of  Infinite scrolling part. --- //

  const handleOnclick = (voucherId: VoucherDataSchema['id']) => {
    setSelectedVoucherId(voucherId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // setSelectedVoucher(null);
  };

  if (isError) {
    throw new Error(error?.message);
  }

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="mb-20 grid w-full grid-cols-2 gap-4 px-6 md:grid-cols-3 lg:grid-cols-5">
      {vouchers.map((voucher) => (
        <VoucherItem
          key={voucher.id}
          voucher={voucher}
          handleOnClick={handleOnclick}
        />
      ))}
      {hasNextPage && (
        <div ref={bottomSentinelRef} style={{ height: '1px' }}></div>
      )}

      {/* Or a small spinner if next page is loading */}
      {isFetchingNextPage && <p>Loading more vouchers...</p>}

      {isModalOpen && selectedVoucher && (
        <VoucherDetails voucher={{ ...selectedVoucher }} onClose={closeModal} />
      )}
    </div>
  );
};

export default HomePageVoucherWrapper;
