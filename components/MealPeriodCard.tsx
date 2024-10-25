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

  // // Fonction pour ouvrir la modale
  // const handleOpenModal = () => {
  //   console.log("Ouverture de la modale");
  //   setIsModalOpen(true);
  //   console.log("Valeur de isModalOpen après ouverture :", isModalOpen);

  // };

  // // Fonction pour fermer la modale
  // const handleCloseModal = () => {
  //   console.log("Fermeture de la modale");

  //   setIsModalOpen(false);
  // };

  // // Gérer l'ajout de recettes
  // const handleAddRecipes = (recipes: string[]) => {
  //   setSelectedRecipes(recipes);
  //   onRecipesAdded(recipes); // Remonter les recettes sélectionnées au parent
  //   setIsModalOpen(false);
  // };

  return (
    <div className="group border p-10 rounded-md bg-white dark:bg-slate-800 dark:border-slate-800 dark:hover:bg-slate-700 cursor-pointer hover:translate-y-2 duration-300">
      <h2 className="text-2xl md:text-xl font-bold mb-6">{mealPeriodName}</h2>
{/* 
      <Button
        label="+"
        onClick={handleOpenModal}
        className="bg-red-400 w-full md:w-40 flex-row-reverse justify-center pl-0 text-white mb-4"
      /> */}
<div>TEST

</div>
      {/* {isModalOpen && ( */}
      <RecipeModal
        // onClose={handleCloseModal}
        // onAddRecipes={handleAddRecipes}
        // existingRecipes={selectedRecipes}
        texte = "test"
      />
      {/* )}  */}

      {/* <div className="mt-4">
        <ul>
          {selectedRecipes.map((recipe, index) => (
            <li key={index} className="text-gray-700">
              {recipe}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default MealPeriodCard