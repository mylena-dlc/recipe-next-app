import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';

interface RecipeModalProps {
  onClose: () => void;
  onSubmit: (selectedRecipes: { id: string; name: string }[]) => void; // Mettre à jour le type ici
}
const RecipeModal: React.FC<RecipeModalProps> = ({ onClose, onSubmit  }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]); // État pour les recettes sélectionnées


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipe');
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error('Erreur lors de la récupération des recettes');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchRecipes();
  }, []);


  const toggleRecipeSelection = (recipeId: string) => {
    setSelectedRecipes((prevSelected) =>
      prevSelected.includes(recipeId)
        ? prevSelected.filter((id) => id !== recipeId) // Retire la recette si elle est déjà sélectionnée
        : [...prevSelected, recipeId] // Ajoute la recette si elle n'est pas sélectionnée
    );
  };

  const handleAddRecipes = () => {
    const newSelectedRecipes = recipes.filter(recipe => selectedRecipes.includes(recipe.id)).map(recipe => ({
      id: recipe.id,
      name: recipe.nameRecipe // Ajoute le nom de la recette
    }));

    onSubmit(newSelectedRecipes); // Appelle la fonction de soumission avec les recettes sélectionnées
    onClose(); // Ferme la modale
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Sélectionner les recettes</h2>
        <div className="max-h-64 overflow-y-scroll mb-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedRecipes.includes(recipe.id)} // Coche la case si la recette est sélectionnée
                onChange={() => toggleRecipeSelection(recipe.id)} // Gère le changement de sélection

              />
              <label>{recipe.nameRecipe}</label>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">


                 {/* Bouton Annuler */}
            <button
            onClick={onClose}
            className="bg-red-400 text-white py-2 px-4 rounded-md"
          >
            Annuler
          </button>
          {/* Bouton Ajouter */}
          <button
            type="button"
            className="bg-red-400 w-full md:w-40 flex-row-reverse justify-center pl-0 text-white mb-4 py-2 rounded-md"
            onClick={handleAddRecipes} // Appelle la fonction pour ajouter les recettes

          >
            Ajouter
          </button>

        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
