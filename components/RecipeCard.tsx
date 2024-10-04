import React from 'react'
import Tag from './Tag'
import Button from './Button'
import { Clock11, ArrowRight, Vegan, HeartPulse } from 'lucide-react'
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
    <div className='bg-white dark:bg-slate-800 rounded-lg'>

      <div className='relative'>
        
      {(recipe.isVegan || recipe.isHealthy) && (
          <div className='absolute top-3 right-3 bg-white p-2 rounded-full flex items-center opacity-50 z-10'>
            {recipe.isVegan && <Vegan className="text-green-500 mr-2" />}
            {recipe.isHealthy && <HeartPulse className='text-pink-700' />}
          </div>
      )}

        <div className='relative aspect-ratio'>
          <Image
            src={recipe.image}
            fill
            alt={recipe.nameRecipe}
            className='object-cover rounded-md'
          />
        </div>
      </div>
      <div className='p-5'>
        <h2 className='text-2xl py-6'>{recipe.nameRecipe}</h2>

        <div className='pb-5 text-white'>
          <Tag text={recipe.category.nameCategory} style={{ backgroundColor: getCategoryColor(recipe.category.nameCategory) }} />
        </div>

        <p className='text-xl pb-5 flex items-center'>
          <>
            <Clock11 className='mr-2' />
            {recipe.preparationTime} min
          </>
        </p>

        <div className='pb-5'>
          <DifficultyRating difficulty={recipe.difficulty} />
        </div>

        <Button
          label="Voir la Recette"
          href={`/recipe/${recipe.id}`}
          className="border-2 border-slate-500 dark:border-white hover:bg-red-400 hover:text-white hover:border-white dark:hover:bg-slate-900 dark:hover:border-slate-900"
          icon={<ArrowRight />}
        />
      </div>
    </div>
  )
}

export default RecipeCard