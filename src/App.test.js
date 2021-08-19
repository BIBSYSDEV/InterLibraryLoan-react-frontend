import { render, screen } from '@testing-library/react';
import App from './App';

test('it renders', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welkommen Erling/i);
  expect(headerElement).toBeInTheDocument();
});
