import { useEffect, useState } from 'react';
import MealPeriodCard from './MealPeriodCard';

interface MealPeriod {
  id: string;
  name: string;
}

interface MealPeriodsListProps {
  onSelect: (id: string) => void; // Fonction de sélection de la période
}

const MealPeriodsList = ({ onSelect }: MealPeriodsListProps) => {
  const [mealPeriods, setMealPeriods] = useState<MealPeriod[]>([]);

  useEffect(() => {
    const fetchMealPeriods = async () => {
      try {
        const response = await fetch('/api/mealperiod'); 
        if (response.ok) {
          const data = await response.json();
          setMealPeriods(data);
        } else {
          console.error("Erreur lors de la récupération des périodes de repas");
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchMealPeriods(); 
  }, []);

  return (
    <div className="meal-periods-container grid grid-cols-1 md:grid-cols-3 gap-4">
      {mealPeriods.map((mealPeriod) => (
        <MealPeriodCard 
          key={mealPeriod.id} 
          mealPeriodName={mealPeriod.name} 
          onRecipesAdded={(recipes) => onSelect(mealPeriod.id, recipes)} 
          />
      ))}
    </div>
  );
};

export default MealPeriodsList;
