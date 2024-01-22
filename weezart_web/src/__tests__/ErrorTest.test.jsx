import { render, screen } from '@testing-library/react';
import Error from '../Pages/Error';

test('renders the 404 message', () => {
  render(<Error />);

  // Assert the 404 text is displayed
  expect(screen.getByText('404')).toBeInTheDocument();
});