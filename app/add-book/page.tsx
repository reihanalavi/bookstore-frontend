"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuthors, createBook } from '../services/api';
import { Author } from '../types';

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState<string>('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Load authors pas halaman dibuka
  useEffect(() => {
    getAuthors().then(data => setAuthors(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !authorId) {
      alert("Han, judul sama author jangan dikosongin ya!");
      return;
    }

    setLoading(true);
    try {
      await createBook(title, parseInt(authorId));
      alert("Mantap! Buku berhasil disimpan.");
      router.push('/'); // Balik ke home
      router.refresh(); // Biar data terbaru muncul
    } catch (err: unknown) {
    if (err instanceof Error) {
        alert("Waduh error: " + err.message);
    } else {
        alert("Terjadi kesalahan yang aneh");
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
        
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="text-blue-600 hover:underline">← Kembali</Link>
          <h1 className="text-2xl font-bold">Tambah Buku Baru</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-1">Judul Buku</label>
            <input
                id="title" // Hubungkan dengan htmlFor di atas
              type="text"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Masukkan judul buku..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
  <div className="flex justify-between items-end mb-1">
    <label htmlFor="author_id" className="block text-sm font-semibold">Pilih Penulis</label>
    <Link href="/add-author" className="text-xs text-blue-600 hover:underline font-bold">
      + Author Baru
    </Link>
  </div>
  <select
    className="w-full border border-gray-300 p-2 rounded-lg text-black outline-none"
    value={authorId}
    onChange={(e) => setAuthorId(e.target.value)}
  >
    <option value="">-- Pilih Author --</option>
    {authors.map((author) => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ))}
  </select>
</div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-bold transition ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Menyimpan...' : 'Simpan Buku'}
          </button>
        </form>
      </div>
    </div>
  );
}