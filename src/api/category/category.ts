import axios from '../../config/axios';

export const getCategories = () => axios.get('/categories');

export const getTag = () => axios.get('/categories/tags');
