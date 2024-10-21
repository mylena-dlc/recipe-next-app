import React from 'react'
import { formatDate } from '@/lib/utils'
import Tag from './Tag'
import { useRouter } from 'next/navigation'
import { MessageSquareIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader';
import RecipeMealPlanCard from '@/components/RecipeMealPlanCard';


interface MealPlanRecipeProps {
  article: MealPlan
}

const MealPlanCard = ({ date, mealPeriodName, recipes }: MealPlanRecipeProps) => {

  return (
    <div className="group border p-10 rounded-md bg-white dark:bg-slate-800 dark:border-slate-800 dark:hover:bg-slate-700 cursor-pointer hover:translate-y-2 duration-300" key={article.id}>

        <h2 className="text-2xl md:text-xl font-bold">{date}</h2>

        <SectionHeader
          icon={Trash2}
          text={mealPeriodName}
        />

        <div className="recipes mt-4">
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
                  <p>Aucune recette pour cette période.</p>
                )}
              </div>


    </div>
  )
}

export default MealPlanCard