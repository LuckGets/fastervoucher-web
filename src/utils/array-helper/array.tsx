import ErrorNotification from '@/pages/error/ErrorNotification';

export function findElementIndexOrThrow<T extends object, K extends keyof T>(
  attribute: K,
  array: T[],
  value: T[K],
  error: { title: string; text: string },
): number {
  const itemIndx = array.findIndex((item) => item[attribute] === value);

  if (itemIndx === -1) throw ErrorNotification(error);

  return itemIndx;
}
