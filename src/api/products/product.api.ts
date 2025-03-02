import { ResponseDataList } from '@/data-schema/common.type';
import axios from '../../config/axios';
import { ProductDataSchema } from '@/data-schema/product.type';

const PRODUCT_BASE_API_ENDPOINT = '/products';

const PRODUCTS_API_ENDPOINTS = {
  GET_MANY: `${PRODUCT_BASE_API_ENDPOINT}`,
};

export const productApi = {
  getMany(sortQuery: string): Promise<ResponseDataList<ProductDataSchema[]>> {
    return axios
      .get(`${PRODUCTS_API_ENDPOINTS.GET_MANY}${sortQuery}`)
      .then((resp) => resp.data);
  },
};
