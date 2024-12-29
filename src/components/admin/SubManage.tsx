import { useFilterStore } from '@/stores/filter-store';

const SubManage = () => {
  const { setSelectedChannel } = useFilterStore();

  const handleFilterByChannel = (channel: string) => {
    setSelectedChannel(channel);
  };

  return (
    <div className="mt-2 flex flex-col">
      <button
        onClick={() => handleFilterByChannel('')}
        className="rounded-lg px-10 py-2 text-start hover:bg-[#D9D9D9]"
      >
        Your store
      </button>
      <button
        onClick={() => handleFilterByChannel('Line Shopping')}
        className="rounded-lg px-10 py-2 text-start hover:bg-[#D9D9D9]"
      >
        Line Shopping
      </button>
      <button
        onClick={() => handleFilterByChannel('Shopee')}
        className="rounded-lg px-10 py-2 text-start hover:bg-[#D9D9D9]"
      >
        Shopee
      </button>
    </div>
  );
};

export default SubManage;
