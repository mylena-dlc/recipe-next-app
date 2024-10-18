"use client"

import { useEffect, useState } from 'react'


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
    <div>
      <h1>Mes Plans de Repas</h1>
      {mealPlans.map((mealPlan) => (
        <div key={mealPlan.id} className="meal-plan">
          <h2>{new Date(mealPlan.date).toLocaleDateString()}</h2> {/* Afficher la date du plan */}
          <div className="meal-periods">
            <h3>{mealPlan.mealPeriod.name}</h3> {/* Afficher la période du repas */}
            <ul>
              {mealPlan.mealPlanRecipes.map((mealPlanRecipe: any) => (
                <li key={mealPlanRecipe.recipe.id}>
                  {mealPlanRecipe.recipe.name} {/* Afficher le nom de la recette */}
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
