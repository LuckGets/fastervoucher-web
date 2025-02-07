import { QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './routes/AppRoute';
import { queryClient } from './config/react-query';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
