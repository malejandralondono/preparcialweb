// src/components/BooksList.tsx
"use client";
import { useEffect, useState } from "react";
import CardBook from "@/components/CardBook";

interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;

}



export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = () => {
    fetch("http://localhost:8080/api/books")
      .then((res) => res.json())
      .then((data) => {
        const booksArray = Array.isArray(data) ? data : [data];
        setBooks(booksArray);
      })
      .catch((err) => console.error("Error al obtener libros:", err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Libros</h1>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <CardBook
            key={book.id}
            id={book.id.toString()}
            name={book.name}
            isbn={book.isbn}
            description={book.description}
            image={book.image}
            publishingDate={book.publishingDate}
          />
        ))}
      </div>
    </main>
  );
}
