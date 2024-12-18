import { paths } from '@/config/path';
import LoginForm from '@/feature/auth/components/login/LoginForm';
import { Link } from 'react-router-dom';

const LoginAdminWrapper = () => {
  return (
    <div className="m-auto mt-10 flex flex-col gap-6 bg-[#F7F3ED] md:ml-[15%]">
      <h1 className="text-center text-2xl">Login</h1>
      <div className="mx-auto w-[20rem] rounded-3xl border bg-[#D9DFD7] p-4 shadow-xl md:w-[35rem]">
        <LoginForm />
        <div className="mt-6 flex justify-center md:text-lg">
          <Link to={paths.auth.forgetPassword.path}>Forget Password</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginAdminWrapper;
