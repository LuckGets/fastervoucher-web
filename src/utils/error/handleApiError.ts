import { AxiosError } from 'axios';
import { ErrorResponse } from '@/data-schema/common.type';
import ErrorNotification from '@/pages/error/ErrorNotification';

const handleApiError = (
  err: unknown,
  customTitle: string = 'Error while performing the action.',
  customFallbackMessage: string = 'An unexpected error occurred.',
) => {
  console.error(err);
  const error = err as AxiosError<ErrorResponse>;
  const { response } = error;
  const errMsg = response?.data?.message;
  ErrorNotification({
    title: customTitle,
    text: errMsg ?? error.message ?? customFallbackMessage,
  });
};

export default handleApiError;
