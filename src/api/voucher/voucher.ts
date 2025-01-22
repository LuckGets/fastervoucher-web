import axios from '../../config/axios';

export const getVouchers = () => axios.get('/vouchers');
