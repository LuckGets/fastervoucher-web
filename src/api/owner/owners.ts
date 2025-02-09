import axios from '../../config/axios';

export const getShopDetails = () => axios.get('/owners');

export const editShopDetails = () => axios.patch('/owners');
