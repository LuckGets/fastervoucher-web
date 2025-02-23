export interface ResponseDataList<T> {
  page: number;
  cursor: string;
  data: T;
  message: string;
  HTTPStatusCode: number;
}

export interface ResponseData<T> {
  data: T;
  message: string;
  HTTPStatusCode: number;
}

export interface IPaginationOption {
  page?: number;
  limit?: number;
}

export function commonQueryOptionsMapper(queries: IPaginationOption): string[] {
  const { page, limit } = queries;
  if (!page && !limit) return [];

  const queriesStrArr = [];

  if (page) queriesStrArr.push(`p=${page}`);

  if (limit) queriesStrArr.push(`lm=${limit}`);

  return queriesStrArr;
}
