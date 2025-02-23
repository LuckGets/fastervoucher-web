import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAccountStore from '../../../stores/account-store';

const VerifyEmail = () => {
  const { actionFirstVerify } = useAccountStore();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        try {
          const response = await actionFirstVerify(token);
          if (response?.status === 200) {
            setVerificationStatus('success');
            setEmail(response?.data?.data?.email);
          } else {
            setVerificationStatus('error');
          }
        } catch (error) {
          console.error('Verification failed:', error);
          setVerificationStatus('error');
        }
      } else {
        setVerificationStatus('error');
      }
    };

    verifyEmail();
  }, [actionFirstVerify]);

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
