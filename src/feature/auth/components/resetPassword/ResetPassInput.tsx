import useSettingStore from '@/stores/setting-store';
import { Form, handleInputChange } from '@/utils/function/handleOnchange';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface Errors {
  name?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const ResetPassInput = () => {
  const { color } = useSettingStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<Partial<Form>>({});

  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6 && !(form.password.length > 20)) {
      newErrors.password = 'Password must be at least 6-20 characters';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    console.log('Validation Errors:', validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted', form);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col items-center gap-4 px-6"
    >
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full rounded-full bg-[#D9D9D9] p-2 text-center md:p-4 md:text-xl ${errors.password ? 'border-2 border-error' : ''}`}
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

      <div className="relative w-full">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          className={`w-full rounded-full bg-[#D9D9D9] p-2 text-center md:p-4 md:text-xl ${errors.confirmPassword ? 'border-2 border-error' : ''}`}
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
      {(errors.password || errors.confirmPassword) && (
        <div className="text-sm text-error">
          {errors.password || errors.confirmPassword}
        </div>
      )}

      <button
        style={bgColor}
        type="submit"
        className="mt-4 w-full rounded-full p-2 text-lg text-white md:p-4"
      >
        Confirm
      </button>
    </form>
  );
};

export default ResetPassInput;
