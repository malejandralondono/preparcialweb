// src/components/Header.tsx
import React from "react";
import Link from "next/link";


interface Route {
  name: string;
  path: string;
}


const Header = ({ routes }: { routes: Route[] }) => {
  return (
    <header className="bg-purple-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Authors App</span>
        </Link>
        <nav>
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="px-3 hover:text-gray-300"
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};



export default Header;