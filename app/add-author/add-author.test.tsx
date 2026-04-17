import { render, screen, fireEvent } from '@testing-library/react';
import AddAuthorPage from './page';
import '@testing-library/jest-dom';

// Kita mock useRouter karena AddAuthorPage pake navigasi
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('AddAuthorPage', () => {
  test('render form input author dengan benar', () => {
    render(<AddAuthorPage />);
    
    // Cek apakah label "Author Name" ada
    expect(screen.getByText(/Author Name/i)).toBeInTheDocument();
    
    // Cek apakah input text ada
    const input = screen.getByPlaceholderText(/e.g. Ahmad Reihan Alavi/i);
    expect(input).toBeInTheDocument();
  });

  test('user bisa mengetik di input nama', () => {
    render(<AddAuthorPage />);
    const input = screen.getByPlaceholderText(/e.g. Ahmad Reihan Alavi/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Reihan Alavi' } });
    expect(input.value).toBe('Reihan Alavi');
  });

  test('tombol simpan tidak boleh disabled saat awal', () => {
    render(<AddAuthorPage />);
    const button = screen.getByRole('button', { name: /Save Author/i });
    expect(button).not.toBeDisabled();
  });
});