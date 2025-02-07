import axios from '../../config/axios';

const PACKAGE_BASE_API_ENDPOINT = {
  BASE: '/packages',
};

const PACKAGE_API_ENDPOINTS = {
  GET_MANY: `${PACKAGE_BASE_API_ENDPOINT.BASE}`,
};

export const packageApi = {
  getMany: (queryOptions: string = '') =>
    axios.get(`${PACKAGE_API_ENDPOINTS.GET_MANY}${queryOptions}`),
};
