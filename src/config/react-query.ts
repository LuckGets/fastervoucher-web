import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

export function mutationOptions<T>(options: {
  mutationKey: string[];
  mutationFn: () => Promise<T>;
}) {
  return options;
}
