import ResetPassInput from '../components/resetPassword/ResetPassInput';

const ResetPassWord = () => {
  return (
    <div className="flex w-screen flex-col items-center justify-center px-6">
      <h1 className="mb-4 mt-6 text-2xl font-semibold text-basicGray">
        Reset Your Password
      </h1>
      <div className="mb-6 text-center text-sm text-gray-500">
        <p>Please enter your new password (6-20 characters).</p>
      </div>
      <ResetPassInput />
    </div>
  );
};

export default ResetPassWord;
