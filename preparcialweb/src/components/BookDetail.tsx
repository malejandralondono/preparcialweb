// src/components/BookDetail.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Review {
  idr?: number;
  name: string;
  source: string;
  description: string;
}

interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial?: {
    id: number;
    name: string;
  };
  reviews: Review[];
  authors: { id: number; name: string }[];
}

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");

  const fetchBook = () => {
    fetch(`http://localhost:8080/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener libro:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) fetchBook();
  }, [id]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = { name, source, description };

    fetch(`http://localhost:8080/api/books/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al agregar reseña");
        return res.json();
      })
      .then(() => {
        setName("");
        setSource("");
        setDescription("");
        fetchBook();
      })
      .catch((err) => {
        console.error("Error al enviar reseña:", err);
        alert("No se pudo agregar la reseña");
      });
  };

  if (loading) return <p className="p-8">Cargando libro...</p>;
  if (!book) return <p className="p-8">No se encontró el libro</p>;

  return (
    <main className="p-8">
      <button
        onClick={() => router.push("/books")}
        className="mb-6 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        ← Volver
      </button>


      <div className="bg-purple-400 border rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
        <img
          src={book.image}
          alt={`Portada de ${book.name}`}
          className="w-64 h-80 object-cover mb-4 rounded-lg shadow-md"
        />
        <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
        <p className="text-gray-700 mb-2">ISBN: {book.isbn}</p>
        <p className="text-gray-700 mb-2">Publicado: {book.publishingDate}</p>
        {book.editorial && (
          <p className="text-gray-700 mb-2">Editorial: {book.editorial.name}</p>
        )}
        <p className="text-gray-800 mt-4">{book.description}</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Autores</h2>
        <ul className="list-disc list-inside">
          {book.authors.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Reseñas</h2>
        {book.reviews.length > 0 ? (
          <ul className="space-y-3">
            {book.reviews.map((review, index) => (
              <li
                key={review.idr ?? index}
                className="bg-white p-3 rounded shadow-sm"
              >
                <p className="font-bold">{review.name}</p>
                <p>{review.source}</p>
                <p className="text-sm text-gray-600">{review.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay reseñas todavía.</p>
        )}

        <form onSubmit={handleAddReview} className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold">Agregar reseña</h3>
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            placeholder="Escribe tu reseña..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
<textarea
            placeholder="Escribe tu reseña..."
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Enviar reseña
          </button>
        </form>
      </div>
    </main>
  );
}
