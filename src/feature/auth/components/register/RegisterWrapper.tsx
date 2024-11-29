import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { paths } from '@/config/path';

const RegisterWrapper = () => {
  return (
    <div className="mx-auto w-[22rem] rounded-3xl border bg-[#D9DFD7] p-4 shadow-xl md:w-[35rem]">
      <RegisterForm />
      <div className="mb-6 mt-6 flex justify-center md:text-lg">
        <span className="flex gap-1 text-[#787676]">
          Back to
          <Link
            to={paths.auth.login.path}
            className="font-semibold text-primary"
          >
            login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterWrapper;
