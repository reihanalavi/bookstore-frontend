"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createAuthor } from '../services/api';

export default function AddAuthorPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert("Nama author jangan kosong ya!");

    setLoading(true);
    try {
      await createAuthor(name);
      alert("Author berhasil ditambahkan!");
      router.push('/add-book'); // Biasanya abis nambah author mau langsung nambah buku kan?
    } catch (err) {
      alert("Gagal nambah author");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black font-sans">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/add-book" className="text-gray-500 hover:text-blue-600 transition">
            <span className="text-xl">←</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">New Author</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
              Author Name
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition bg-gray-50 text-black"
              placeholder="e.g. Ahmad Reihan Alavi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition transform active:scale-95 ${
              loading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            }`}
          >
            {loading ? 'Processing...' : 'Save Author'}
          </button>
        </form>
      </div>
    </div>
  );
}