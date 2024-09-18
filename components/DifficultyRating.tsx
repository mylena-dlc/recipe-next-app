import React from 'react';
import { ChefHat } from 'lucide-react';

interface DifficultyRatingProps {
  difficulty: number; 
}

const DifficultyRating: React.FC<DifficultyRatingProps> = ({ difficulty }) => {
  const totalClocks = 5;

  return (
    <div className="flex">
        {/* Tableau initial + une copie afin d'obtenir uen version utilisable avec map() */}
      {[...Array(totalClocks)].map((_, index) => (
        <ChefHat
          key={index}
          className="w-6 h-6 mr-1"
          color={index < difficulty ? '#FFD700' : '#FFFFFF'} // Toques colorées ou blanches
          fill="none" // Pas de remplissage, juste les contours
        />
      ))}
    </div>
  );
};

export default DifficultyRating;
