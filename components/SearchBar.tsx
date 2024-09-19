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
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher..."
        className="p-1 rounded-md text-slate-900"
      />
      <button type="submit" className=" p-2 text-white rounded-md">
        <Search />
      </button>
    </form>
  );
}
