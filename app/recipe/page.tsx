"use client";

import React, { useEffect, useState } from 'react';
import RecipeCard from '@/components/RecipeCard';

const RecipePage = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipe');
            const data: Recipe[] = await response.json();
            setRecipes(data);
        };

        fetchRecipes();
    }, []);

    return (
        <div className='pt-6 px-4 md:px-8 lg:px-12'>
            <h1 className='text-3xl md:text-5xl pb-6'>Toutes les recettes</h1>
            <div className='m-0 md:m-4 lg:m-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecipePage;
