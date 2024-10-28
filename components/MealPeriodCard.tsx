import React, { useState } from 'react';
import Button from '@/components/Button';
import RecipeModal from '@/components/RecipeModal';


interface MealPeriodCardProps {
  mealPeriodName: string;
  onRecipesAdded: (recipes: string[]) => void; // Fonction pour remonter les recettes ajoutées
}

const MealPeriodCard: React.FC<MealPeriodCardProps> = ({ mealPeriodName, onRecipesAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Contrôle de la modale
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);


  return (
    <div className="group border p-10 rounded-md bg-white dark:bg-slate-800 dark:border-slate-800 dark:hover:bg-slate-700 cursor-pointer hover:translate-y-2 duration-300">
      <h2 className="text-2xl md:text-xl font-bold mb-6">{mealPeriodName}</h2>
    </div>
  );
};

export default MealPeriodCard