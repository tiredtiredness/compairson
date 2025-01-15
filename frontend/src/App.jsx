import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './pages/AppLayout';
import { AuthProvider } from './contexts/AuthContext.jsx';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
