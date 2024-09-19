"use client"

import React, { useEffect, useState } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { useRouter, useSearchParams } from 'next/navigation';


const SearchResults = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [query, setQuery] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams(); // Utilise les paramètres de recherche de l'URL

    useEffect(() => {
         // Fonction pour extraire la query string des paramètres de l'URL
         const fetchRecipes = async () => {
            const searchQuery = searchParams.get('q') || '';
            setQuery(searchQuery);

            if (searchQuery) {
                try {
                    const response = await fetch(`/api/search?q=${searchQuery}`);
                    const data: Recipe[] = await response.json();
                    setRecipes(data);
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                }
            }
        };

        fetchRecipes();
    }, [searchParams]); // Dépendance sur les paramètres de recherche - afin que searchParams se mette à jour

    return (
        <div>
            <h1 className='text-5xl pb-8'>Résultats de la Recherche</h1>
            <div className='m-28 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;