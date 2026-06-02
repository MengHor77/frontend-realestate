import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Real estate platform', () => {
  test('renders landing page content', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /find your next home with confidence/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search properties/i })).toBeInTheDocument();
  });

  test('navigates to listings and login pages', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('link', { name: /^properties$/i }));
    expect(await screen.findByRole('heading', { name: /property listings/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /login/i }));
    expect(await screen.findByRole('heading', { name: /^login$/i })).toBeInTheDocument();
  });
});
