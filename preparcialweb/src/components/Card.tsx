// src/components/Card.tsx
import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  id: string;             
  birthDate: string;
  name: string;
  description: string;
  image: string;
  books?: string[];
  
}

const Card = ({ id, birthDate, name, description, image }: CardProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/authors/${id}/edit`);
  };

  const handleDelete = () => {
  fetch(`http://localhost:8080/api/authors/${id}`, {
    method: "DELETE",
  })
    .then(async (res) => {
      if (res.ok) {
        alert("Autor eliminado correctamente"); 
        window.location.reload(); 
      } else {
        const errorText = await res.text();
        console.error("rror al eliminar autor. Status:", res.status, "Detalle:", errorText);
        alert("Hubo un error al eliminar el autor");
      }
    })
    .catch((err) => {
      console.error("Error al eliminar autor:", err);
      alert("Error de conexión al intentar eliminar el autor");
    });
};


  return (
    <div className="bg-purple-400 border rounded-lg shadow-lg overflow-hidden max-w-sm flex flex-col">
      <img
        src={image}
        alt={`Imagen para ${name}`}
        className="w-full h-150 object-cover"
      />
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">Nacimiento: {birthDate}</p>
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
      </div>
  );
}
    
export default Card;


