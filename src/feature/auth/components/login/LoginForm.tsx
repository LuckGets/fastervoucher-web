import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Form, handleInputChange } from '@/utils/function/handleOnchange';
import SubmitButton from '@/components/SubmitButton';
import useAuthStore from '@/stores/auth-store';
import type { LoginForm } from '@/api/auth/types/login-form.types';

const LoginForm = () => {
  const { actionLogin, errorLogin } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<Partial<Form>>({});
  const [errors, setErrors] = useState({
    identifier: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = { identifier: '', password: '' };
    if (!form.identifier) {
      newErrors.identifier = 'Email or phone is required';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', form);
      try {
        await actionLogin(form as LoginForm);
      } catch (err) {
        console.log('Login error:', err);
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <form
      className="mt-4 flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className={`w-[80%] rounded-full p-2 text-center md:p-4 md:text-xl ${errors.identifier && 'border border-[#F87171]'}`}
        placeholder="Email or phone"
        name="identifier"
        value={form.identifier}
        onChange={(e) => handleInputChange(e, setForm, form)}
      />
      <div className="relative w-[80%]">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full rounded-full p-2 pr-10 text-center md:p-4 md:text-xl ${errors.password && 'border border-[#F87171]'}`}
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={(e) => handleInputChange(e, setForm, form)}
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

      {(errors.identifier || errors.password) && (
        <span className="text-xs text-[#F87171]">
          {errors.identifier || errors.password}
        </span>
      )}

      {errorLogin && (
        <span className="text-xs text-[#F87171]">{errorLogin}</span>
      )}

      <SubmitButton
        text="Login"
        className="w-[80%] rounded-full bg-primary p-2 text-lg text-white md:p-4 md:text-xl"
      />
    </form>
  );
};

export default LoginForm;
