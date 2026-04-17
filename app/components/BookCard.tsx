import { Book } from "../types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="text-gray-600">By: {book.author.name}</p>
    </div>
  );
}