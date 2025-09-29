"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditAuthorPage() {
const params = useParams();
const id = params?.id as string;
  const router = useRouter();

  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [bookName, setBookName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [publishingDate, setPublishingDate] = useState("");
  const [bookDescription, setBookDescription] = useState(""); 

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/authors/${id}`);
        if (!res.ok) throw new Error("Error al cargar autor");
        const data = await res.json();

        setBirthDate(data.birthDate);
        setName(data.name);
        setDescription(data.description);
        setImage(data.image);
      } catch (err) {
        console.error(err);
        alert("No se pudo cargar el autor");
      }
    };

    if (id) fetchAuthor();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const updatedAuthor = { birthDate, name, description, image };

  try {
    const res = await fetch(`http://localhost:8080/api/authors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAuthor),
    });

    if (!res.ok) throw new Error("Error al actualizar autor");
    const updated = await res.json();
    console.log("Autor actualizado:", updated);

    if (bookName.trim() !== "" || isbn.trim() !== "") {
      let bookToAssign = null;

      const searchRes = await fetch(
        `http://localhost:8080/api/books?isbn=${isbn}`
      );

      if (!searchRes.ok) throw new Error("Error al buscar libro");

      const foundBooks = await searchRes.json();

      if (foundBooks.length > 0) {
        bookToAssign = foundBooks[0];
        console.log("Libro ya existente:", bookToAssign);
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

        bookToAssign = await bookRes.json();
        console.log("Libro creado:", bookToAssign);
      }

      const assignRes = await fetch(
        `http://localhost:8080/api/authors/${id}/books/${bookToAssign.id}`,
        {
          method: "POST",
        }
      );

      if (!assignRes.ok) throw new Error("Error al asignar libro al autor");

      console.log("Libro asignado al autor");
    }

    alert("Autor actualizado con éxito");
    router.push("/authors");
  } catch (err) {
    console.error(err);
    alert("Hubo un error al actualizar autor o asignar libro");
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
