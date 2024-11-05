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

  // Fonction de suppression d'un planning
  const handleDelete = async (mealplanId: string) => {

    const confirmDelete = window.confirm('Etes vous sûr de vouloir supprimer ce planning?');
    if (!confirmDelete) return;

    try {
      await fetch(`/api/meal-plan/${mealplanId}/delete`, {
        method: 'DELETE'
      })
      // router.push('/comment')
      location.reload();
    } catch (error) {
      console.error('Error deleting meal plan')
    }
  }

  if (!mealPlans.length) {
    return (
      <div>
        <p>Vous n'avez pas encore créé de planning.</p>
        <Button
          href="/meal-plan/add"
          label="Ajouter des recettes"
          icon={<SquarePlus />}
          className="bg-red-400 flex-row-reverse justify-center pl-0 text-white mb-4"
        />
      </div>
    )
  }
// Définir l'ordre souhaité
const mealPeriodOrder = ["Petit déjeuner", "Déjeuner", "Dîner"];

// Regrouper les mealPlans par date et trier les périodes de repas
const groupedMealPlans = mealPlans.reduce((acc, mealPlan) => {
  const date = formatDate(mealPlan.date);
  if (!acc[date]) {
    acc[date] = [];
  }
  acc[date].push(mealPlan);
  return acc;
}, {} as Record<string, MealPlan[]>);


  return (
    <div className='rounded-md p-6'>

      <h1 className='text-3xl md:text-5xl pb-6'>Mon planning</h1>

      <Button
        href="/meal-plan/add"
        label="Ajouter des recettes"
        icon={<SquarePlus />}
        className="bg-red-400 flex-row-reverse justify-center pl-0 text-white mb-4"
      />
      <div className="">
        {Object.keys(groupedMealPlans).map((date) => (

          <div key={date} className="space-y-4 ">

            <h2 className="text-2xl font-semibold my-8">{date}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedMealPlans[date]
              .sort((a, b) => {
                // Trier selon l'ordre prédéfini des périodes de repas
                const orderA = mealPeriodOrder.indexOf(a.mealPeriod.name);
                const orderB = mealPeriodOrder.indexOf(b.mealPeriod.name);
                return orderA - orderB;
              })
              .map((mealPlan) => (
                  <MealPlanCard
                    key={mealPlan.id}
                    mealPeriodName={mealPlan.mealPeriod.name}
                    recipes={mealPlan.mealPlanRecipes.map((mealPlanRecipe) => ({
                      id: mealPlanRecipe.recipe.id,
                      nameRecipe: mealPlanRecipe.recipe.nameRecipe,
                      preparationTime: mealPlanRecipe.recipe.preparationTime,
                      image: mealPlanRecipe.recipe.image,
                    }))}
                    onDelete={() => handleDelete(mealPlan.id)} // Passer onDelete au composant
                  />
                ))}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlans;
