import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginGoogle from './LoginGoogle';
import { paths } from '../../../../config/path';
import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginWrapper = () => {
  return (
    <div className="mx-auto w-[22rem] rounded-3xl border bg-[#D9DFD7] p-4 shadow-xl md:w-[35rem]">
      <LoginForm />
      <div className="mt-6 flex justify-center md:text-lg">
        <Link to={paths.auth.forgetPassword.path}>Forget Password</Link>
      </div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <LoginGoogle />
      </GoogleOAuthProvider>

      <div className="mb-6 mt-6 flex justify-center md:text-lg">
        <span className="flex gap-1 text-[#787676]">
          Create Account
          <Link
            to={paths.auth.register.path}
            className="font-semibold text-primary"
          >
            register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginWrapper;
