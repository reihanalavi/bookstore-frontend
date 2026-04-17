import Link from 'next/link';
import BookCard from './components/BookCard';
import { getBooks } from './services/api';

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-gray-100 p-10 text-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900">📚 Rehan's Library</h1>
          <Link 
            href="/add-book" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition shadow-md"
          >
            + Tambah Buku
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl shadow">
              <p className="text-gray-500 text-xl italic">Belum ada buku nih, Han. Tambahin dulu yuk!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}