import { Link } from 'react-router-dom';

const SubManage = () => {
  return (
    <div className="mt-2 flex flex-col">
      <Link
        to="/admin/manage/store"
        className="rounded-lg px-10 py-2 hover:bg-[#D9D9D9]"
      >
        Your store
      </Link>
      <Link
        to="/admin/manage"
        className="rounded-lg px-10 py-2 hover:bg-[#D9D9D9]"
      >
        Line Shopping
      </Link>
      <Link
        to="/admin/manage"
        className="rounded-lg px-10 py-2 hover:bg-[#D9D9D9]"
      >
        Shopee
      </Link>
    </div>
  );
};

export default SubManage;
