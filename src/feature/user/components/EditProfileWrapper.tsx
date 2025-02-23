import useAccountStore from '../../../stores/account-store';
import ProfileInfo from './ProfileInfo';

const EditProfileWrapper = () => {
  const { accountInfo } = useAccountStore();

  return (
    <div>
      <div className="flex flex-col gap-6 text-text">
        <ProfileInfo
          userInfo={{
            info: accountInfo?.fullname ?? null,
            label: 'Name',
            field: 'fullname',
          }}
        />
        <ProfileInfo
          userInfo={{
            info: accountInfo?.email ?? null,
            label: 'Email',
            field: 'email',
          }}
        />
        <ProfileInfo
          userInfo={{
            info: accountInfo?.phone ?? null,
            label: 'Phone',
            field: 'phone',
          }}
        />
      </div>
    </div>
  );
};

export default EditProfileWrapper;
