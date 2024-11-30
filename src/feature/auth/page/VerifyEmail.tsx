import { userInfo } from '@/utils/user/userinfo';
import Verify from '../components/verifyEmail/Verify';

const VerifyEmail = () => {
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <h1 className="mb-4 mt-6 text-2xl font-semibold text-basicGray">
        Verify Email
      </h1>
      <div className="mb-6 text-center text-sm text-gray-500">
        <p>An OTP has been sent to your email address</p>
        <p className="font-semibold">
          {userInfo.email} <p>Please check your inbox.</p>
        </p>
      </div>
      <Verify />
    </div>
  );
};

export default VerifyEmail;
