"use client"

import { useEffect, useState } from 'react'
import { formatDate } from '@/lib/utils'


const MealPlans = () => {

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])

  useEffect(() => {
    // Lorsque la session est chargée et l'utilisateur est connecté

      const fetchMealPlans = async () => {
        const response = await fetch('/api/meal-plan');
        if (response.ok) {
          const data = await response.json();
          setMealPlans(data);
        } else {
          console.error("Erreur lors de la recherche du planning");
        }
      };
      fetchMealPlans();
    
  }, []) 


  if (!mealPlans.length) {
    return <p>Aucun plan de repas trouvé pour cet utilisateur.</p> 
  }

  return (
    <div className='bg-white dark:bg-slate-600 rounded-md p-6'>
       
       <h1 className='text-3xl md:text-5xl pb-6'>Mes Plans de Repas</h1>

      {mealPlans.map((mealPlan) => (
        <div key={mealPlan.id} className="meal-plan">
          <h2>{formatDate(mealPlan.date)}</h2> 
          <div className="meal-periods">
            <h3>{mealPlan.mealPeriod.name}</h3> 
            <ul>
              {mealPlan.mealPlanRecipes.map((mealPlanRecipe: any) => (
                <li key={mealPlanRecipe.recipe.id}>
                  {mealPlanRecipe.recipe.nameRecipe} 
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MealPlans
