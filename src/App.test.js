import { render, screen } from '@testing-library/react';
import App from './App';

test('it renders', () => {
  render(<App />);
  const headerElement = screen.getByText(/Resource not found/i);
  expect(headerElement).toBeInTheDocument();
});
