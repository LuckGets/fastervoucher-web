import axios from '../../config/axios';

export const getVouchers = () => axios.get('/vouchers');

export const getVouchersBySearch = (search: string) =>
  axios.get('/vouchers/search/' + search);

export const getVoucherById = (voucherId: string) =>
  axios.get('/vouchers/' + voucherId);
