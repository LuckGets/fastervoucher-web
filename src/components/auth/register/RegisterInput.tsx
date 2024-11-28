import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const RegisterInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="mt-4 flex flex-col items-center gap-4">
      <input
        type="text"
        className="w-[80%] rounded-full p-2 text-center md:p-4 md:text-xl"
        placeholder="Email"
      />
      <input
        type="text"
        className="w-[80%] rounded-full p-2 text-center md:p-4 md:text-xl"
        placeholder="Phone number"
      />
      <div className="relative w-[80%]">
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full rounded-full p-2 pr-10 text-center md:p-4 md:text-xl"
          placeholder="Password"
        />
        <button
          type="button"
          className="absolute right-6 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-[#787676]" />
          ) : (
            <Eye className="h-5 w-5 text-[#787676]" />
          )}
        </button>
      </div>
      <div className="relative w-[80%]">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          className="w-full rounded-full p-2 pr-10 text-center md:p-4 md:text-xl"
          placeholder="Confirm Password"
        />
        <button
          type="button"
          className="absolute right-6 top-1/2 -translate-y-1/2"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? (
            <EyeOff className="h-5 w-5 text-[#787676]" />
          ) : (
            <Eye className="h-5 w-5 text-[#787676]" />
          )}
        </button>
      </div>
      <button className="w-[80%] rounded-full bg-primary p-2 text-lg text-white md:p-4">
        Register
      </button>
    </form>
  );
};

export default RegisterInput;
