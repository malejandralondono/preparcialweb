"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookForm() {
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [image, setImage] = useState("");
  const [publishingDate, setPublishingDate] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newBook = {
        name,
        isbn,
        image,
        publishingDate,
        description,
        editorial: {
          id: 1006, 
          name: "Pottermore Publishing",
        },
      };

      const res = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!res.ok) throw new Error("Error al crear libro");

      const createdBook = await res.json();
      console.log("Libro creado:", createdBook);

      alert("Libro creado con éxito");
      router.push("/books"); 
    } catch (err) {
      console.error(err);
      alert("Hubo un error al crear el libro");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gradient-to-br from-green-500 to-green-700 shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-white">Crear nuevo libro</h2>

      <div>
        <label className="block mb-1 text-white">Título</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-green-800 focus:border-green-600 focus:ring-2 focus:ring-green-400 px-3 py-2 rounded bg-white text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-white">ISBN</label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="w-full border border-green-800 focus:border-green-600 focus:ring-2 focus:ring-green-400 px-3 py-2 rounded bg-white text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-white">Imagen del libro (URL)</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-green-800 focus:border-green-600 focus:ring-2 focus:ring-green-400 px-3 py-2 rounded bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-1 text-white">Fecha de publicación</label>
        <input
          type="date"
          value={publishingDate}
          onChange={(e) => setPublishingDate(e.target.value)}
          className="w-full border border-green-800 focus:border-green-600 focus:ring-2 focus:ring-green-400 px-3 py-2 rounded bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-1 text-white">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-green-800 focus:border-green-600 focus:ring-2 focus:ring-green-400 px-3 py-2 rounded bg-white text-gray-900"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800 transition"
      >
        Crear Libro
      </button>
    </form>
  );
}
