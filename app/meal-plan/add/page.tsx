"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import RecipeModal from '@/components/RecipeModal';

interface MealPeriod {
  id: string;
  name: string;
}

const AddMealPlan = () => {
  const [date, setDate] = useState('');
  const [mealPeriodId, setMealPeriodId] = useState('');
  const [mealPeriods, setMealPeriods] = useState<MealPeriod[]>([]); // État pour stocker les périodes de repas
  const [isModalOpen, setModalOpen] = useState(false); // Contrôle de la modale
  const [selectedRecipes, setSelectedRecipes] = useState<{ [key: string]: { id: string; name: string }[] }>({}); // État pour stocker les recettes sélectionnées par période

  const router = useRouter();

  useEffect(() => {
    const fetchMealPeriods = async () => {
      try {
        const response = await fetch('/api/mealperiod');
        if (response.ok) {
          const data = await response.json();
          setMealPeriods(data);
        } else {
          console.error('Erreur lors de la récupération des périodes de repas');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des périodes de repas:', error);
      }
    };

    fetchMealPeriods();
  }, []);

  // Fonction pour ajouter les recettes sélectionnées à la période actuelle
  const addRecipes = (newRecipes: { id: string; name: string }[]) => {
    setSelectedRecipes((prev) => {
      // Récupération des recettes actuelles
      const currentRecipes = prev[mealPeriodId] || [];
      
      // Filtre pour éviter les doublons
      const filteredRecipes = newRecipes.filter(
        newRecipe => !currentRecipes.some(recipe => recipe.id === newRecipe.id)
      );
  
      return {
        ...prev, // Copie l'état précédent
        [mealPeriodId]: [...currentRecipes, ...filteredRecipes], // Ajoute les nouvelles recettes
      };
    });
    
    setModalOpen(false); 
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Transforme l'objet selectedRecipes en tableau pour l'envoyer dans la requête
    const mealPlans = Object.keys(selectedRecipes).map((mealPeriodId) => ({
      mealPeriodId,
      recipes: selectedRecipes[mealPeriodId].map(recipe => recipe.id), // Passer uniquement les IDs
    }));


    try {
      const response = await fetch('/api/meal-plan/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          mealPlans,
        }),
      });

      if (response.ok) {
        // Redirige vers la page des plannings après l'ajout
        router.push('/meal-plan');
      } else {
        console.error('Erreur lors de la création du planning');
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Créer un nouveau planning</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-transparent p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="date" className="block font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm dark:text-slate-500"
            required
          />
        </div>

        {/* Affichage des périodes de repas */}
        <div className="mb-4">
          <div className="flex justify-between flex-wrap">
            {mealPeriods.map((mealPeriod) => (
              <div key={mealPeriod.id} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md my-4">
                <div className='flex items-center justify-around'>
                  <h2 className="m-8">{mealPeriod.name}</h2>
                  <button
                    onClick={() => {
                      setMealPeriodId(mealPeriod.id); // Définit l'ID de la période de repas sélectionnée
                      setModalOpen(true); // Ouvre la modale
                    }}
                    type="button"
                    className="bg-red-400 justify-center text-white h-12 w-12 rounded-md"
                  >
                    +
                  </button>
                </div>

                {/* Affichage des recettes sélectionnées pour la période actuelle */}
                <div className="mt-4">
                {selectedRecipes[mealPeriod.id] && selectedRecipes[mealPeriod.id].length > 0 ? (
                  <ul>
                    {selectedRecipes[mealPeriod.id]?.map((recipe) => (
                      <div key={recipe.id} className='bg-slate-300 dark:bg-slate-800 p-2 my-2 rounded-md'>{recipe.name}</div>
                    ))}
                  </ul>
                   ) : (
                    <p className="text-gray-500 bg-slate-300 dark:bg-slate-800 p-2 rounded-md">Aucune recette sélectionnée</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiche la modale si isModalOpen est vrai */}
        {isModalOpen && (
          <RecipeModal
            onSubmit={addRecipes}
            onClose={() => setModalOpen(false)}
          />
        )}

        <button
          type="submit"
          className="bg-red-400 justify-center text-white mb-4 rounded-md p-4"
        >
          Ajouter le planning
        </button>
      </form>
    </div>
  );
};

export default AddMealPlan;
