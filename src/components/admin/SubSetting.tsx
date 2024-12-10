import { subSetting } from '@/utils/admin/subsetting';
import { Link } from 'react-router-dom';

const SubSetting = () => {
  return (
    <div className="mt-2 flex flex-col">
      {subSetting.map((i, index) => (
        <Link
          key={index}
          to="/admin/setting/#"
          className="rounded-lg px-10 py-2 hover:bg-[#D9D9D9]"
        >
          {i.label}
        </Link>
      ))}
    </div>
  );
};

export default SubSetting;
