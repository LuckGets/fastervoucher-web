import { Skeleton } from './ui/skeleton';

const VoucherLoading = () => {
  return (
    <div className="flex w-screen items-center justify-center bg-[#F7F3ED]">
      <div className="mb-24 grid w-full grid-cols-2 gap-4 px-4 md:grid-cols-3 md:px-12 lg:grid-cols-5">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-44 w-44 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2 w-36" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-44 w-44 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2 w-36" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-44 w-44 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2 w-36" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-44 w-44 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherLoading;
