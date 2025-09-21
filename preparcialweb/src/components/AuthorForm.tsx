"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function AuthorForm() {
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAuthor = {
      birthDate,
      name,
      description,
      image,
    };

    try {
      const res = await fetch("http://localhost:8080/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuthor),
      });

      if (!res.ok) {
        throw new Error("Error al crear autor");
      }

      const data = await res.json();
      console.log("Autor creado:", data);

      setBirthDate("");
      setName("");
      setDescription("");
      setImage("");

      alert("Autor creado con éxito");
      router.push("/authors");

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

  <button
    type="submit"
    className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
  >
    Crear Autor
  </button>
</form>

  );
}