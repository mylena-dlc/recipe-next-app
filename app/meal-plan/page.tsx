"use client"

import { useEffect, useState } from 'react'
import { formatDate } from '@/lib/utils'
import MealPlanCard from '@/components/MealPlanCard';
import Button from '@/components/Button';
import { SquarePlus } from 'lucide-react';


const MealPlans = () => {

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])

  useEffect(() => {
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
    return <p>Vous n'avez pas encore créé de planning.</p>
  }

  return (
    <div className='bg-white dark:bg-slate-600 rounded-md p-6'>

      <h1 className='text-3xl md:text-5xl pb-6'>Mon planning</h1>

        <Button
            href="/meal-plan/add"
            label="Ajouter un planning"
            icon={<SquarePlus />}
            className="bg-red-400 w-full md:w-40 flex-row-reverse justify-center pl-0 text-white mb-4"
        />

      {mealPlans.map((mealPlan) => (
        <MealPlanCard
          key={mealPlan.id}
          date={formatDate(mealPlan.date)}  // Formatage de la date
          mealPeriodName={mealPlan.mealPeriod.name}  // Nom de la période de repas
          recipes={mealPlan.mealPlanRecipes.map((mealPlanRecipe) => ({
            id: mealPlanRecipe.recipe.id,
            nameRecipe: mealPlanRecipe.recipe.nameRecipe,
            preparationTime: mealPlanRecipe.recipe.preparationTime,
            image: mealPlanRecipe.recipe.image,
          }))}  // Extraction des recettes du plan
        />
      ))}
    </div>
  );
};

export default MealPlans;
