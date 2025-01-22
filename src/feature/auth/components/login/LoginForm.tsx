import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Form, handleInputChange } from '@/utils/function/handleOnchange';
import SubmitButton from '@/components/SubmitButton';
import useAuthStore from '@/stores/auth-store';
import type { LoginForm } from '@/api/auth/types/login-form.types';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const LoginForm = () => {
  const { actionLogin, actionRefreshToken } = useAuthStore();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<Partial<Form>>({
    identifier: '',
    password: '',
  });
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
      try {
        await actionLogin(form as LoginForm);
        Swal.fire({
          title: 'Login Successful!',
          icon: 'success',
          width: '80%',
          padding: '20px',
          confirmButtonText: 'Ok',
          buttonsStyling: false,
          customClass: {
            popup: 'small-popup',
            confirmButton: 'custom-confirm-button',
          },
        }).then(async () => {
          await actionRefreshToken();
          navigate('/');
        });
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const errorMessage =
          err.response?.data?.message ||
          'An error occurred while Login. Please try again.';
        Swal.fire({
          title: 'Login Failed!',
          text: errorMessage,
          icon: 'error',
          width: '80%',
          padding: '20px',
          confirmButtonText: 'Ok',
          buttonsStyling: false,
          customClass: {
            popup: 'small-popup',
            confirmButton: 'custom-confirm-button',
          },
        });
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
          className={`w-full rounded-full p-2 pl-10 pr-10 text-center md:p-4 md:text-xl ${errors.password && 'border border-[#F87171]'}`}
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

      <SubmitButton
        text="Login"
        className="w-[80%] rounded-full bg-primary p-2 text-lg text-white md:p-4 md:text-xl"
      />
    </form>
  );
};

export default LoginForm;
