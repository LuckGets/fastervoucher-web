import ProfileInfo from './ProfileInfo';
import { userInfo } from '@/utils/user/userinfo';

const EditProfileWrapper = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-2">
        {userInfo?.name && (
          <ProfileInfo userInfo={{ info: userInfo.name, label: 'Name' }} />
        )}
        {userInfo?.email && (
          <ProfileInfo userInfo={{ info: userInfo.email, label: 'Email' }} />
        )}
        {userInfo?.phone && (
          <ProfileInfo userInfo={{ info: userInfo.phone, label: 'Phone' }} />
        )}
      </div>
    </div>
  );
};

export default EditProfileWrapper;
