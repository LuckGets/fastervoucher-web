import { Skeleton } from './ui/skeleton';

const FilterLoading = () => {
  return (
    <div className="my-4 flex flex-shrink flex-wrap items-center gap-2 px-4 text-xs lg:justify-start lg:gap-4 lg:px-10 lg:text-sm">
      <Skeleton className="flex h-10 min-w-[80px] items-center justify-center rounded-3xl px-4" />
      <Skeleton className="flex h-10 min-w-[120px] items-center justify-center rounded-3xl px-4" />
      <Skeleton className="flex h-10 min-w-[120px] items-center justify-center rounded-3xl px-4" />
    </div>
  );
};

export default FilterLoading;
