import SubmitButton from '@/components/SubmitButton';
import useAccountStore from '@/stores/account-store';
import useAuthStore from '@/stores/auth-store';
import { Form, handleInputChange } from '@/utils/function/handleOnchange';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface Errors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePassForm = () => {
  const { accessToken } = useAuthStore();
  const { accountInfo, actionChangePassword } = useAccountStore();
  const [form, setForm] = useState<Partial<Form>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const accountId = accountInfo?.id || '';

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!(form.oldPassword && form.newPassword && form.confirmPassword)) {
      newErrors.oldPassword = 'All fields are required';
    } else if (
      form.newPassword &&
      (form.newPassword.length < 6 || form.newPassword.length > 20)
    ) {
      newErrors.newPassword = 'Password must be between 6-20 characters';
    }
    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const formData = {
        oldPassword: form.oldPassword || '',
        newPassword: form.newPassword || '',
        confirmPassword: form.confirmPassword || '',
      };

      try {
        await actionChangePassword(formData, accountId, accessToken || '');
        console.log(
          'ChangePasswordData :>> ',
          form.oldPassword,
          form.newPassword,
          form.confirmPassword,
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const isFormValid =
    form.oldPassword && form.newPassword && form.confirmPassword;

  return (
    <form
      className="mt-4 flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="relative w-[80%]">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full rounded-full bg-[#D9D9D9] p-2 pr-10 text-center md:p-4 md:text-xl ${errors.oldPassword ? 'border border-error' : ''}`}
          placeholder="Current Password"
          name="oldPassword"
          value={form.oldPassword || ''}
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
      {errors.oldPassword && <p className="text-error">{errors.oldPassword}</p>}
      <div className="relative w-[80%]">
        <input
          type={showNewPassword ? 'text' : 'password'}
          className={`w-full rounded-full bg-[#D9D9D9] p-2 pr-10 text-center md:p-4 md:text-xl ${errors.newPassword ? 'border border-error' : ''}`}
          placeholder="New Password"
          name="newPassword"
          value={form.newPassword || ''}
          onChange={(e) => handleInputChange(e, setForm, form)}
        />
        <button
          type="button"
          className="absolute right-6 top-1/2 -translate-y-1/2"
          onClick={() => setShowNewPassword((prev) => !prev)}
        >
          {showNewPassword ? (
            <EyeOff className="h-5 w-5 text-[#787676]" />
          ) : (
            <Eye className="h-5 w-5 text-[#787676]" />
          )}
        </button>
      </div>
      {errors.newPassword && <p className="text-error">{errors.newPassword}</p>}
      <div className="relative w-[80%]">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          className={`w-full rounded-full bg-[#D9D9D9] p-2 pr-10 text-center md:p-4 md:text-xl ${errors.confirmPassword ? 'border border-error' : ''}`}
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword || ''}
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
      {errors.confirmPassword && (
        <p className="text-error">{errors.confirmPassword}</p>
      )}
      <SubmitButton
        className="mt-4 w-[80%] rounded-full p-2 text-lg text-white md:p-4"
        text="Change Password"
        disabled={!isFormValid}
      />
    </form>
  );
};

export default ChangePassForm;
