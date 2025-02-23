import { AxiosResponse } from 'axios';
import axios from '../../config/axios';
import { ResponseData, ResponseDataList } from '../../data-schema/common.type';
import { PackageDataSchema } from '../../data-schema/package.type';

const PACKAGE_BASE_API_ENDPOINT = {
  BASE: '/packages',
};

const PACKAGE_API_ENDPOINTS = {
  GET_MANY: `${PACKAGE_BASE_API_ENDPOINT.BASE}`,
  GET_BY_ID: (id: string) => `${PACKAGE_BASE_API_ENDPOINT.BASE}/${id}`,
};

export const packageApi = {
  getById(id: string): Promise<AxiosResponse<ResponseData<PackageDataSchema>>> {
    return axios.get(`${PACKAGE_API_ENDPOINTS.GET_BY_ID(id)}`);
  },
  getMany: (
    queryOptions: string = '',
  ): Promise<AxiosResponse<ResponseDataList<PackageDataSchema[]>>> =>
    axios.get(`${PACKAGE_API_ENDPOINTS.GET_MANY}${queryOptions}`),
};
