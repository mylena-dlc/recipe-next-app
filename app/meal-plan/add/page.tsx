"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import MealPeriodCard from '@/components/MealPeriodCard';

const AddMealPlan = () => {
  const [date, setDate] = useState('');
  const [mealPeriodId, setMealPeriodId] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/meal-plan/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date,
            mealPeriodId,
          }),
        });
  
        if (response.ok) {
          // Rediriger vers la page des plannings après l'ajout
          router.push('/meal-plan');
        } else {
          console.error('Erreur lors de la création du planning');
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la requête:', error);
      }
    };
  
    return (
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">Créer un nouveau planning</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              required
            />
          </div>
  
          <div className="mb-4">
            {/* <label htmlFor="mealPeriodId" className="block text-sm font-medium text-gray-700">
              Période de repas
            </label>
            <select
              id="mealPeriodId"
              value={mealPeriodId}
              onChange={(e) => setMealPeriodId(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              required
            >
              <option value="">Sélectionnez une période</option>
              <option value="1">Petit-déjeuner</option>
              <option value="2">Déjeuner</option>
              <option value="3">Dîner</option>
            </select> */}

            
          </div>
  



        <Button
            type="submit"
            label="Ajouter le planning"
            className="bg-red-400 w-full md:w-40 flex-row-reverse justify-center pl-0 text-white mb-4"
        />

        </form>
      </div>
    );
  };
  

export default AddMealPlan;
