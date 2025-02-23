import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { accountApi } from '../../api/accounts/account';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

const ConfirmChangePassword = () => {
  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash');

  const navigate = useNavigate();

  const confirmPassword = async () => {
    if (!hash) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid confirmation link',
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
      return;
    }

    try {
      const response = await accountApi.confirmPassword(hash);
      Swal.fire({
        title: 'Password verification Successful!',
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
        navigate('/');
      });
      console.log('Password confirmed successfully:', response.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage =
        err.response?.data?.message ||
        'An error occurred while confirming password. Please try again.';
      Swal.fire({
        title: 'Password verification Failed!',
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
      console.log('Password verification error:', err);
    }
  };

  useEffect(() => {
    if (hash) {
      confirmPassword();
    }
  }, [hash]);

  return (
    <div className="flex min-h-screen justify-center">
      <div className="mt-12 p-6">
        <h1 className="mb-4 text-center text-xl font-semibold">
          Confirming Password Change...
        </h1>
      </div>
    </div>
  );
};

export default ConfirmChangePassword;
