import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Form, handleInputChange } from '@/utils/function/handleOnchange';

interface Errors {
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<Partial<Form>>({});

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone number must be a 10-digit number';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6 && !(form.password.length > 20)) {
      newErrors.password = 'Password must be at least 6-20 characters';
    }
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted', form);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form
      className="mt-4 flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className={`w-[80%] rounded-full p-2 text-center md:p-4 md:text-xl ${errors.email ? 'border border-error' : ''}`}
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={(e) => handleInputChange(e, setForm, form)}
      />

      <input
        type="text"
        className={`w-[80%] rounded-full p-2 text-center md:p-4 md:text-xl ${errors.phone ? 'border border-error' : ''}`}
        placeholder="Phone number"
        name="phone"
        value={form.phone}
        onChange={(e) => handleInputChange(e, setForm, form)}
      />

      <div className="relative w-[80%]">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full rounded-full p-2 pr-10 text-center md:p-4 md:text-xl ${errors.password ? 'border border-error' : ''}`}
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

      <div className="relative w-[80%]">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          className={`w-full rounded-full p-2 pr-10 text-center md:p-4 md:text-xl ${errors.confirmPassword ? 'border border-error' : ''}`}
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={(e) => handleInputChange(e, setForm, form)}
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
      {errors.name ||
      errors.phone ||
      errors.password ||
      errors.confirmPassword ? (
        <span className="text-xs text-[#F87171]">
          {errors.name ||
            errors.phone ||
            errors.password ||
            errors.confirmPassword}
        </span>
      ) : null}

      <button
        type="submit"
        className="mt-4 w-[80%] rounded-full bg-primary p-2 text-lg text-white md:p-4"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
