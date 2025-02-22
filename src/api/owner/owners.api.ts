import { AxiosResponse } from 'axios';
import axios from '../../config/axios';
import { ResponseDataList } from '@/data-schema/common.type';
import { OwnerDataSchema, password } from '@/data-schema/owner.type';

const OWNER_BASE_API_ENDPOINT = {
  BASE: '/owners',
} as const;

const OWNER_API_ENDPOINTs = {
  GET_INFO: `${OWNER_BASE_API_ENDPOINT.BASE}`,
  UPDATE_INFO: `${OWNER_BASE_API_ENDPOINT.BASE}`,
  PASSWORD: `${OWNER_BASE_API_ENDPOINT.BASE}/password`,
  CREATE: `${OWNER_BASE_API_ENDPOINT.BASE}`,
  UPLOAD_IMAGE: `${OWNER_BASE_API_ENDPOINT.BASE}/images`,
  UPDATE_IMAGE: function (imageId: string): string {
    return `${OWNER_BASE_API_ENDPOINT.BASE}/images/${imageId}`;
  },
};

export const ownerApi = {
  getOwnerInfo: (): Promise<AxiosResponse<ResponseDataList<OwnerDataSchema>>> =>
    axios.get(`${OWNER_API_ENDPOINTs.GET_INFO}`),
  updateInfo: (
    data: OwnerDataSchema,
  ): Promise<AxiosResponse<ResponseDataList<OwnerDataSchema>>> =>
    axios.patch(`${OWNER_API_ENDPOINTs.UPDATE_INFO}`, data),
  getPass: (): Promise<AxiosResponse<ResponseDataList<password>>> =>
    axios.get(`${OWNER_API_ENDPOINTs.PASSWORD}`),
  updatePass: (
    data: password,
  ): Promise<AxiosResponse<ResponseDataList<password>>> =>
    axios.patch(`${OWNER_API_ENDPOINTs.PASSWORD}`, data),
  createImages: (
    data: ImageData,
  ): Promise<AxiosResponse<ResponseDataList<ImageData>>> =>
    axios.post(`${OWNER_API_ENDPOINTs.UPLOAD_IMAGE}`, data),
  updateImages: (imageId: string, data: ImageData): Promise<AxiosResponse> =>
    axios.patch(`${OWNER_API_ENDPOINTs.UPDATE_IMAGE(imageId)}`, data),
  deleteImages: (imageId: string): Promise<AxiosResponse> =>
    axios.delete(`${OWNER_API_ENDPOINTs.UPDATE_IMAGE(imageId)}`),
};
