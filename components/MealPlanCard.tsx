import React from 'react'
import { formatDate } from '@/lib/utils'
import Tag from './Tag'
import { useRouter } from 'next/navigation'
import { Trash2, Croissant, Ham, EggFried, CookingPot, Clock } from 'lucide-react'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader';
import RecipeMealPlanCard from '@/components/RecipeMealPlanCard';


interface MealPlanRecipeProps {
  date: string;
  mealPeriodName: string;
  recipes: Recipe[];
}

const getIcon = (mealPeriodName: string) => {
  switch (mealPeriodName) {
    case 'Petit déjeuner':
      return Croissant;
    case 'Déjeuner':
      return Ham;
    case 'Dîner':
      return EggFried;
      default:
      return CookingPot; 
  }
};

const MealPlanCard = ({ date, mealPeriodName, recipes }: MealPlanRecipeProps) => {

  return (
    <div className="group border p-10 rounded-md bg-white dark:bg-slate-800 dark:border-slate-800 dark:hover:bg-slate-700 cursor-pointer hover:translate-y-2 duration-300">

        <h2 className="text-2xl md:text-xl font-bold mb-6">{date}</h2>

        <SectionHeader
          icon={getIcon(mealPeriodName)} 
          text={mealPeriodName}
        />

        <div className="recipes">
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <RecipeMealPlanCard 
                      key={recipe.id} 
                      nameRecipe={recipe.nameRecipe} 
                      preparationTime={recipe.preparationTime} 
                      image={recipe.image}
                    />
                  ))
                ) : (
                  <p>Vous n'avez pas encore ajouté de recette.</p>
                )}
              </div>


    </div>
  )
}

export default MealPlanCard