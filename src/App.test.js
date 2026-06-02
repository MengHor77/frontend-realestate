import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

test('renders platform navigation links', async () => {
  const queryClient = new QueryClient();
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );
  expect(await screen.findByRole('link', { name: /RealEstate Pro/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Listings/i })).toBeInTheDocument();
});
