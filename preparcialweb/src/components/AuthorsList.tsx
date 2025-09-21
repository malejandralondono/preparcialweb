// src/components/AuthorsList.tsx
"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";

interface Author {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
}

export default function AuthorsList() {
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchAuthors = () => {
    fetch("http://localhost:8080/api/authors")
      .then((res) => res.json())
      .then((data) => {
        const authorsArray = Array.isArray(data) ? data : [data];
        setAuthors(authorsArray);
      })
      .catch((err) => console.error("Error al obtener autores:", err));
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <main className="p-8">
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {authors.map((author) => (
          <Card
            key={author.id}
            id={author.id.toString()}
            birthDate={author.birthDate}
            name={author.name}
            description={author.description}
            image={author.image}
          />
        ))}
      </div>
    </main>
  );
}
