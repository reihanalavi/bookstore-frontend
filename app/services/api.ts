import { Book, Author } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Ambil daftar buku
export async function getBooks(): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

// Ambil daftar author (buat dropdown)
export async function getAuthors(): Promise<Author[]> {
  const res = await fetch(`${API_URL}/authors`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

// Kirim data buku baru ke backend
export async function createBook(title: string, authorId: number) {
  const res = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      author_id: authorId,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Gagal menyimpan buku');
  }

  return res.json();
}

// Kirim data author baru ke backend
export async function createAuthor(name: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error('Gagal menyimpan author');
  }

  return res.json();
}