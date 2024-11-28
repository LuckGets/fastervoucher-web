import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });

  const hdlOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form className="mt-4 flex flex-col items-center gap-4">
      <input
        type="text"
        className="w-[80%] rounded-full p-2 text-center md:p-4 md:text-xl"
        placeholder="Email or Phone"
        name="identifier"
        value={form.identifier}
        onChange={hdlOnChange}
      />
      <div className="relative w-[80%]">
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full rounded-full p-2 pr-10 text-center md:p-4 md:text-xl"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={hdlOnChange}
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
      <button className="w-[80%] rounded-full bg-primary p-2 text-lg text-white md:p-4 md:text-xl">
        Login
      </button>
    </form>
  );
};

export default LoginInput;
