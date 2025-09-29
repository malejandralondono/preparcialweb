"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function AuthorForm() {

  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const [bookName, setBookName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [publishingDate, setPublishingDate] = useState("");
  const [bookDescription, setBookDescription] = useState("");  

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const newAuthor = {
      birthDate,
      name,
      description,
      image,
    };

    const authorRes = await fetch("http://localhost:8080/api/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAuthor),
    });

    if (!authorRes.ok) throw new Error("Error al crear autor");

    const createdAuthor = await authorRes.json();
    console.log("Autor creado:", createdAuthor);

   let createdBook = null;

try {
  if (bookName.trim() !== "") {
    const searchRes = await fetch(
      `http://localhost:8080/api/books?isbn=${isbn}`
    );

    if (!searchRes.ok) throw new Error("Error al buscar libro");

    const foundBooks = await searchRes.json();

    if (foundBooks.length > 0) {
      createdBook = foundBooks[0];
      console.log("Libro ya existente:", createdBook);
    } else {
      const newBook = {
        name: bookName,
        isbn,
        image: bookImage,
        publishingDate,
        description: bookDescription,
        editorial: {
          id: 1006,
          name: "Pottermore Publishing",
        },
      };

      const bookRes = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!bookRes.ok) throw new Error("Error al crear libro");

      createdBook = await bookRes.json();
      console.log("Libro creado:", createdBook);
    }

    const assignRes = await fetch(
      `http://localhost:8080/api/authors/${createdAuthor.id}/books/${createdBook.id}`,
      {
        method: "POST",
      }
    );

    if (!assignRes.ok) throw new Error("Error al asignar libro al autor");

    console.log("Libro asignado al autor");
  }

  setBirthDate("");
  setName("");
  setDescription("");
  setImage("");
  setBookName("");
  setIsbn("");
  setBookImage("");
  setPublishingDate("");
  setBookDescription("");

  alert("Autor y libro creados/asignados con éxito");
  router.push("/authors");
} catch (err) {
  console.error(err);
  alert("Hubo un error al crear o asignar el libro");
}
  } catch (err) {
    console.error(err);
    alert("Hubo un error al crear el autor");
  }
};


  return (
<form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto p-6 bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg rounded-lg space-y-4"
>
  <h2 className="text-2xl font-bold text-white">Crear nuevo autor</h2>

  <div>
    <label className="block mb-1 text-white">Nombre</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full border border-purple-800 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 px-3 py-2 rounded bg-white text-gray-900"
      required
    />
  </div>

  <div>
    <label className="block mb-1 text-white">Fecha de nacimiento</label>
    <input
      type="date"
      value={birthDate}
      onChange={(e) => setBirthDate(e.target.value)}
      className="w-full border border-purple-800 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 px-3 py-2 rounded bg-white text-gray-900"
      required
    />
  </div>

  <div>
    <label className="block mb-1 text-white">Descripción</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full border border-purple-800 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 px-3 py-2 rounded bg-white text-gray-900"
      rows={3}
      required
    />
  </div>

  <div>
    <label className="block mb-1 text-white">URL de la imagen</label>
    <input
      type="url"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      className="w-full border border-purple-800 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 px-3 py-2 rounded bg-white text-gray-900"
      required
    />
  </div>

  <h3 className="text-xl font-bold text-white mt-4">Añadir Libro</h3>

      <div>
        <label className="block mb-1 text-white">Título</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-1 text-white">ISBN</label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-1 text-white">Imagen del libro</label>
        <input
          type="url"
          value={bookImage}
          onChange={(e) => setBookImage(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-1 text-white">Fecha de publicación</label>
        <input
          type="date"
          value={publishingDate}
          onChange={(e) => setPublishingDate(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-1 text-white">Descripción del libro</label>
        <textarea
          value={bookDescription}
          onChange={(e) => setBookDescription(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white text-gray-900"
          rows={2}
        />
      </div>

  <button
    type="submit"
    className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
  >
    Crear Autor
  </button>
</form>

  );
}