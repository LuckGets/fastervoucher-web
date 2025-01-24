import axios from '../../config/axios';

export const loginGoogle = () => axios.get('/auth/google/login');

export const loginGoogleCallBack = () => axios.get('/auth/google/callback');
