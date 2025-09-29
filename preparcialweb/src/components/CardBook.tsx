// src/components/CardBook.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface BookCardProps {
  id: string;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;

  
}

const CardBook = ({ id, name, isbn, image, publishingDate, description }: BookCardProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/books/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      const authorsRes = await fetch(`http://localhost:8080/api/books/${id}/authors`);
      if (!authorsRes.ok) throw new Error("Error al obtener autores asociados");

      const authors = await authorsRes.json();

      for (const author of authors) {
        const unassignRes = await fetch(
          `http://localhost:8080/api/authors/${author.id}/books/${id}`,
          { method: "DELETE" }
        );

        if (!unassignRes.ok) {
          console.error(`Error al desasignar autor ${author.id}`);
          throw new Error("No se pudo desasignar un autor");
        }
      }

      const deleteRes = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "DELETE",
      });

      if (!deleteRes.ok) {
        const errorText = await deleteRes.text();
        console.error("Error al eliminar libro. Status:", deleteRes.status, "Detalle:", errorText);
        alert("Hubo un error al eliminar el libro");
        return;
      }

      alert("Libro y sus relaciones con autores eliminados correctamente");
      window.location.reload();
    } catch (err) {
      console.error("Error al eliminar libro:", err);
      alert("Error de conexión al intentar eliminar el libro");
    }
  };

  return (
    <div className="bg-purple-400 border rounded-lg shadow-lg overflow-hidden max-w-sm flex flex-col">
      <img
        src={image}
        alt={`Portada de ${name}`}
        className="w-full h-150 object-cover"
      />
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">ISBN: {isbn}</p>
        <p className="text-sm text-gray-600 mb-2">Publicado: {publishingDate}</p>
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="p-4 flex justify-center">
        <button
          onClick={handleEdit}
          className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
        >
          Editar
        </button>
      </div>
      <div className="p-4 flex justify-center">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Eliminar
        </button>
      </div>
      <div className="p-4 flex justify-center">
        <button
          onClick={() => router.push(`/books/${id}`)}
          className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
        >
          Ver Detalle
        </button>
      </div>
    </div>
  );
};

export default CardBook;
