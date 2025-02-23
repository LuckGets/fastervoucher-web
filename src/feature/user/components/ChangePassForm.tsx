import { AxiosError } from 'axios';
import SubmitButton from '../../../components/SubmitButton';
import useAccountStore from '../../../stores/account-store';
import {
  Form,
  handleInputChange,
} from '../../../utils/function/handleOnchange';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { paths } from '../../../config/path';
import { useNavigate } from 'react-router-dom';

interface Errors {
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const ChangePassForm = () => {
  const { accountInfo, actionChangePassword } = useAccountStore();
  const [form, setForm] = useState<Partial<Form>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const accountId = accountInfo?.id || '';

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!(form.oldPassword && form.newPassword && form.confirmNewPassword)) {
      newErrors.oldPassword = 'All fields are required';
    } else if (
      form.newPassword &&
      (form.newPassword.length < 6 || form.newPassword.length > 20)
    ) {
      newErrors.newPassword = 'Password must be between 6-20 characters';
    }
    if (form.newPassword !== form.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
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
        confirmNewPassword: form.confirmNewPassword || '',
      };

      setIsLoading(true);

      try {
        await actionChangePassword(formData, accountId);
        Swal.fire({
          title: 'Success!',
          text: 'Your password has been successfully changed.',
          icon: 'success',
          width: '80%',
          padding: '20px',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            popup: 'small-popup',
            confirmButton: 'custom-confirm-button',
          },
        }).then(() => {
          navigate(paths.main.user.path);
        });
        console.log(
          'ChangePasswordData :>> ',
          form.oldPassword,
          form.newPassword,
          form.confirmNewPassword,
        );
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const errorMessage =
          err.response?.data?.message ||
          'Failed to change password. Please try again.';
        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          width: '80%',
          padding: '20px',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            popup: 'small-popup',
            confirmButton: 'custom-confirm-button',
          },
        });
        console.error('Error changing password:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const isFormValid =
    form.oldPassword && form.newPassword && form.confirmNewPassword;

  return (
    <form
      className="mt-4 flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="relative w-[80%]">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full rounded-full bg-[#D9D9D9] p-2 pl-8 pr-10 text-center md:p-4 md:text-xl ${errors.oldPassword ? 'border border-error' : ''}`}
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
          className={`w-full rounded-full bg-[#D9D9D9] p-2 pl-8 pr-10 text-center md:p-4 md:text-xl ${errors.newPassword ? 'border border-error' : ''}`}
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
          className={`w-full rounded-full bg-[#D9D9D9] p-2 pl-8 pr-10 text-center md:p-4 md:text-xl ${errors.confirmNewPassword ? 'border border-error' : ''}`}
          placeholder="Confirm Password"
          name="confirmNewPassword"
          value={form.confirmNewPassword || ''}
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
      {errors.confirmNewPassword && (
        <p className="text-error">{errors.confirmNewPassword}</p>
      )}
      <SubmitButton
        className="mt-4 w-[80%] rounded-full p-2 text-lg text-white md:p-4"
        text="Change Password"
        disabled={!isFormValid || isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};

export default ChangePassForm;
