import { render, screen } from '@testing-library/react';
import UploadImage from './Page_UploadImage';

test('renders learn react link', () => {
  render(<UploadImage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
