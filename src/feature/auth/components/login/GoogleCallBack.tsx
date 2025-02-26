import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../../stores/auth-store';
import { paths } from '../../../../config/path';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  useEffect(() => {
    const savedAccessToken = localStorage.getItem('accessToken');
    if (savedAccessToken) {
      setTokens(savedAccessToken);
      navigate('/');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('token');

    console.log('accessToken :>> ', accessToken);

    if (accessToken && accessToken.trim() !== '') {
      localStorage.setItem('accessToken', accessToken);
      console.log('accessTokenIf1 :>> ', accessToken);
      setTokens(accessToken);
      navigate('/');
    } else {
      console.error('AccessToken not found in URL');
      navigate(`${paths.auth.login.path}`);
    }
  }, [navigate, setTokens]);

  return (
    <div>
      <p>Processing login...</p>
    </div>
  );
};

export default GoogleCallback;
