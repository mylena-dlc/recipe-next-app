import { Clock } from 'lucide-react'

interface RecipeMealPlanCard {
    nameRecipe: string;
    preparationTime: number;
    image: string;
  }
  
  const RecipeMealPlanCard = ({ nameRecipe, preparationTime, image }: RecipeMealPlanCard) => {
    return (
      <div className="recipe-card bg-white shadow-md rounded-md p-2 flex items-center mb-4">
        <div className="recipe-info flex-grow p-2">
          <h4 className="text-md font-semibold">{nameRecipe}</h4>
          <p className="text-sm text-gray-600 flex items-center"> <Clock className='pr-2'/> {preparationTime} min</p>
        </div>
        <div className="recipe-image ml-4">
          <img src={image} alt={nameRecipe} className="w-20 h-20 object-cover rounded-md" />
        </div>
      </div>
    );
  };
  
  export default RecipeMealPlanCard;
  