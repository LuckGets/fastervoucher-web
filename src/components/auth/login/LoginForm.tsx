import { Link } from 'react-router-dom';
import LoginInput from './LoginInput';
import LoginGoogle from './LoginGoogle';

const LoginForm = () => {
  return (
    <div className="mx-auto w-[22rem] rounded-3xl border bg-[#D9DFD7] p-4 shadow-xl md:w-[35rem]">
      <LoginInput />
      <div className="mt-6 flex justify-center md:text-lg">
        <Link to="/forget-password">Forget Password</Link>
      </div>
      <LoginGoogle />
      <div className="mb-6 mt-6 flex justify-center md:text-lg">
        <span className="flex gap-1 text-[#787676]">
          Create Account
          <Link to="/register" className="font-semibold text-primary">
            register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
