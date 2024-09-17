import React from 'react'
import  Tag  from './Tag'
import Button from './Button'
import {MessageSquareIcon, Clock11 } from 'lucide-react'

interface RecipeCardProps {
    recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {

    return (
        <div className='bg-slate-500 rounded-lg p-10'>

             {recipe.image && (
                <img
                src={recipe.image}
                alt={recipe.nameRecipe}
                className="w-full h-full object-cover"
                />
            )}
        <h2 className='text-3xl pb-5'>{recipe.nameRecipe}</h2>

        <div className='pb-5'>
            {/* <Tag text={recipe.category.nameCategory} /> */}
        </div>

      
        <p className='text-xl pb-5 flex items-center'>
            <Clock11 className='mr-2' />
            {recipe.preparationTime} min
        </p>

        <Button label="Voir la Recette" href="#" />
    </div>
    
    )
}

export default RecipeCard