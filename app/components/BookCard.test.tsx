import { render, screen } from '@testing-library/react';
import BookCard from './BookCard';
import '@testing-library/jest-dom';

const mockBook = {
  id: 1,
  title: 'Belajar CI/CD',
  author: { id: 1, name: 'Ahmad Reihan' }
};

test('menampilkan judul buku dan nama penulis', () => {
  render(<BookCard book={mockBook} />);
  expect(screen.getByText('Belajar CI/CD')).toBeInTheDocument();
  expect(screen.getByText('By: Ahmad Reihan')).toBeInTheDocument();
});