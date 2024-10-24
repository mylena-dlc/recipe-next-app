import { useEffect, useState } from 'react';
import MealPeriodCard from './MealPeriodCard'; // Assurez-vous que le chemin est correct

interface MealPeriod {
  id: string;
  name: string;
}

const MealPeriodsList = () => {
  const [mealPeriods, setMealPeriods] = useState<MealPeriod[]>([]);

  // Utiliser useEffect pour récupérer les données depuis l'API
  useEffect(() => {
    const fetchMealPeriods = async () => {
      try {
        const response = await fetch('/api/meal-periods'); // Appelle votre route API
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

    fetchMealPeriods(); // Appelle l'API lorsque le composant est monté
  }, []);

  if (!mealPeriods.length) {
    return <p>Aucune période de repas trouvée.</p>; // Afficher un message si aucune période n'est trouvée
  }

  return (
    <div className="meal-periods-container grid grid-cols-1 md:grid-cols-3 gap-4">
      {mealPeriods.map((mealPeriod) => (
        <MealPeriodCard key={mealPeriod.id} mealPeriodName={mealPeriod.name} />
      ))}
    </div>
  );
};

export default MealPeriodsList;
