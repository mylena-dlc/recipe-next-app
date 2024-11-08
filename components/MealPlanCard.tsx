import React from 'react'
import { formatDate } from '@/lib/utils'
import Tag from './Tag'
import { useRouter } from 'next/navigation'
import { Trash2, Croissant, Ham, EggFried, CookingPot, Clock } from 'lucide-react'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader';
import RecipeMealPlanCard from '@/components/RecipeMealPlanCard';


interface MealPlanRecipeProps {
  mealPeriodName: string;
  recipes: SimplifiedRecipe[];
  onDelete: () => void; // Fonction de suppression en prop
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

const MealPlanCard = ({ mealPeriodName, recipes, onDelete }: MealPlanRecipeProps) => {

  return (
    <div className="relative group border p-10 rounded-md bg-white dark:bg-slate-800 dark:border-slate-800 dark:hover:bg-slate-700">
        <button onClick={onDelete} className="bg-red-400 text-white flex items-center p-2 rounded-md cursor-pointer absolute top-2 right-2">
          <Trash2 /> 
        </button>
        
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