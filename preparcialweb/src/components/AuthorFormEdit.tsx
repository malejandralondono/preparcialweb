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

      alert("Autor actualizado con éxito");
      router.push("/authors");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al actualizar");
    }
  };

  return (
<form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto p-6 bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg rounded-lg space-y-4"
>
  <h2 className="text-2xl font-bold text-white">Actualizar autor</h2>

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
    Actualizar Autor
  </button>
</form>
  );
}
