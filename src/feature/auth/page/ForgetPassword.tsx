import ForgetPassInput from '../components/forgetPassword/ForgetPassInput';

const ForgetPassword = () => {
  return (
    <div className="flex w-screen flex-col items-center justify-center px-6">
      <h1 className="mb-4 mt-6 text-2xl font-semibold text-basicGray">
        Forgot Your Password?
      </h1>
      <div className="mb-6 text-center text-sm text-gray-500">
        <p>Enter the email address associated with your account.</p>
        <p>We’ll send you a One-Time Password (OTP) to reset your password.</p>
      </div>
      <ForgetPassInput />
    </div>
  );
};

export default ForgetPassword;
