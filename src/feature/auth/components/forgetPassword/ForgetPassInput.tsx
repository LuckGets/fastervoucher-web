import { paths } from '@/config/path';
import useSettingStore from '@/stores/setting-store';
import { Form, handleInputChange } from '@/utils/function/handleOnchange';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ForgetPassInput = () => {
  const { color } = useSettingStore();
  const [form, setForm] = useState<Partial<Form>>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  const handleSubmit = async () => {
    if (!form.email) {
      setError('Email is required');
      return;
    }

    try {
      console.log('form.email :>> ', form.email);
      navigate(paths.auth.verifyEmail.path);
    } catch (error) {
      setError('An error occurred, please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        customClass: {
          popup: 'small-popup',
          confirmButton: 'custom-confirm-button',
        },
      });
      console.log('error :>> ', error);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <input
        type="email"
        className={`w-[80%] rounded-full bg-[#D9D9D9] p-2 text-center md:p-4 md:text-xl${error ? 'border-2 border-error' : ''}`}
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={(e) => handleInputChange(e, setForm, form)}
      />
      {error && <p className="text-error">{error}</p>}
      <button
        style={bgColor}
        className="w-[80%] rounded-full p-2 text-lg text-white md:p-4 md:text-xl"
        onClick={handleSubmit}
      >
        Send OTP
      </button>
    </div>
  );
};

export default ForgetPassInput;
