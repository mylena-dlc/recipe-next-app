"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // empêche le comportement par défaut du formulaire

    // Si la requête n'est pas vide après avoir supprimé les espaces inutiles :
    // redirection vers la page des resultats de recherche
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher..."
        className="p-1 rounded-md text-slate-500 dark:color-white bg-gray-100"
      />
      <button type="submit" className="p-2 dark:text-white rounded-md abolute right-0">
        <Search className="dark:text-gray-800"/>
      </button>
    </form>
  );
}
