import { render, screen, fireEvent } from '@testing-library/react';
import AddBookPage from './page';
import '@testing-library/jest-dom';

// Mock navigasi
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      refresh: jest.fn(),
    };
  },
}));

describe('AddBookPage', () => {
  test('menampilkan input judul dan dropdown author', () => {
    render(<AddBookPage />);
    
    expect(screen.getByText(/Judul Buku/i)).toBeInTheDocument();
    expect(screen.getByText(/Pilih Penulis/i)).toBeInTheDocument();
  });

  test('user bisa mengisi judul buku', () => {
    render(<AddBookPage />);
    const input = screen.getByPlaceholderText(/Masukkan judul buku.../i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Mastering Go' } });
    expect(input.value).toBe('Mastering Go');
  });
});