import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { accountApi } from '@/api/accounts/account';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash');
  const [verificationStatus, setVerificationStatus] = useState<
    'loading' | 'success' | 'error'
  >('loading');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const verifyEmail = useCallback(async () => {
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
      setVerificationStatus('error');
      return;
    }

    try {
      const response = await accountApi.firstVerify(hash);
      Swal.fire({
        title: 'Email verification Successful!',
        icon: 'success',
        width: '80%',
        padding: '20px',
        confirmButtonText: 'Ok',
        buttonsStyling: false,
        customClass: {
          popup: 'small-popup',
          confirmButton: 'custom-confirm-button',
        },
      }).then(() => navigate('/'));
      setVerificationStatus('success');
      setEmail(response?.data?.email);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage =
        err.response?.data?.message ||
        'An error occurred while confirming email. Please try again.';
      Swal.fire({
        title: 'Email verification Failed!',
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
      setVerificationStatus('error');
    }
  }, [hash, navigate]);

  useEffect(() => {
    if (hash) {
      verifyEmail();
    }
  }, [hash, verifyEmail]);

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return <p>Verifying your email...</p>;
      case 'success':
        return (
          <p className="text-[#006838]">
            Your email has been successfully verified! {email && `(${email})`}
          </p>
        );
      case 'error':
        return (
          <p className="text-red-500">
            Verification failed. Please try again or contact support.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex w-screen flex-col items-center justify-center"
      >
        <h1 className="mb-4 mt-6 text-2xl font-semibold text-basicGray">
          Verify Email
        </h1>
        <div className="mb-6 text-center text-sm text-gray-500">
          {renderContent()}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VerifyEmail;
