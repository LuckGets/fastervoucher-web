import useAccountStore from '../../../stores/account-store';

const UserAvatar = () => {
  const { accountInfo } = useAccountStore();

  const photoUrl = accountInfo?.photo
    ? accountInfo.photo.startsWith('http')
      ? accountInfo.photo
      : `https://${accountInfo.photo}`
    : 'https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg';

  return (
    <div className="h-44 w-44 overflow-hidden rounded-full bg-[#cecdcd] md:h-48 md:w-48">
      <img
        src={photoUrl}
        alt="Profile"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default UserAvatar;
