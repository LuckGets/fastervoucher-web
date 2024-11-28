import { Link } from 'react-router-dom';
import RegisterInput from './RegisterInput';

const RegisterForm = () => {
  return (
    <div className="mx-auto w-[22rem] rounded-3xl border bg-[#D9DFD7] p-4 shadow-xl md:w-[35rem]">
      <RegisterInput />
      <div className="mb-6 mt-6 flex justify-center md:text-lg">
        <span className="flex gap-1 text-[#787676]">
          Back to
          <Link to="/login" className="font-semibold text-primary">
            login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
