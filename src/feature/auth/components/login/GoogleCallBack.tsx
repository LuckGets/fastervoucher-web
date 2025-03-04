import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../../stores/auth-store';
import { paths } from '../../../../config/path';
import Swal from 'sweetalert2';
import useAccountStore from '../../../../stores/account-store';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();
  const { actionGetMe } = useAccountStore();

  useEffect(() => {
    const savedAccessToken = localStorage.getItem('accessToken');
    if (savedAccessToken) {
      setTokens(savedAccessToken);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('token');

    console.log('accessToken :>> ', accessToken);

    if (accessToken && accessToken.trim() !== '') {
      localStorage.setItem('accessToken', accessToken);
      setTokens(accessToken);
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
        await actionGetMe();

        navigate('/');
      });
    } else {
      Swal.fire({
        title: 'Login Failed!',
        text: 'Please try again.',
        icon: 'error',
        width: '80%',
        padding: '20px',
        confirmButtonText: 'Ok',
        buttonsStyling: false,
        customClass: {
          popup: 'small-popup',
          confirmButton: 'custom-confirm-button',
        },
      }).then(async () => {
        navigate(`${paths.auth.login.path}`);
      });
    }
  }, [navigate, setTokens]);

  return (
    <div>
      <p>Processing login...</p>
    </div>
  );
};

export default GoogleCallback;
