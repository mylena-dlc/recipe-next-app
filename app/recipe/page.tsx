"use client"

import React, { useEffect, useState } from 'react'
import RecipeCard from '@/components/RecipeCard'


const RecipePage = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipe')
            const data: Recipe[] = await response.json()
            setRecipes(data)
        }

        fetchRecipes()
    }, [])

    return (
        <div>
            <h1 className='text-5xl pb-8'>Toutes les recettes</h1>
           
           <div className='m-28'>
             <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
                {recipes.map((recipe) => (
                   
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    
                    ))}
                    </div>
           </div>

        </div>
    )

}
export default RecipePage