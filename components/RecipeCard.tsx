import React from 'react'
import  Tag  from './Tag'
import Button from './Button'
import {Clock11, ArrowRight } from 'lucide-react'
import DifficultyRating from './DifficultyRating';
import Image from 'next/image'


interface RecipeCardProps {
    recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
          case 'plat':
            return 'rgb(37 90 37)'; // vert foncé
          case 'dessert':
            return 'rgb(144 139 117)'; // beige
          case 'entrée':
            return '#D0838E'; // vieux rose
          default:
            return 'rgb(59 102 123)'; // couleur par défaut
        }
      }

    return (
        <div className='bg-slate-500 rounded-lg p-10'>

        <Image
            src={recipe.image}
            width={500}
            height={500}
            alt={recipe.nameRecipe}
            />

        <h2 className='text-3xl py-6'>{recipe.nameRecipe}</h2>

        <div className='pb-5'>
            <Tag text={recipe.category.nameCategory} style={{ backgroundColor: getCategoryColor(recipe.category.nameCategory) }} />
        </div>

      
        <p className='text-xl pb-5 flex items-center'>
            <Clock11 className='mr-2' />
            {recipe.preparationTime} min
        </p>

        <div className='pb-5'>
            <DifficultyRating difficulty={recipe.difficulty} />
        </div>        

        <Button 
            label="Voir la Recette" 
            href={`/recipe/${recipe.id}`} 
            className="border-2 border-white hover:bg-slate-900 hover:border-slate-900" 
            icon={<ArrowRight />}
        />
    </div>
    
    )
}

export default RecipeCard