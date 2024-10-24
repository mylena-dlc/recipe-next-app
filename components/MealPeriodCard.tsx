import React from 'react'
import Button from '@/components/Button';


interface MealPeriodProps {
  mealPeriodName: string;
}

const MealPeriodCard = ({ mealPeriodName }: MealPeriodProps) => {

  return (
    <div className="group border p-10 rounded-md bg-white dark:bg-slate-800 dark:border-slate-800 dark:hover:bg-slate-700 cursor-pointer hover:translate-y-2 duration-300">

        <h2 className="text-2xl md:text-xl font-bold mb-6">{mealPeriodName}</h2>

        <Button
            type="submit"
            label="+"
            className="bg-red-400 w-full md:w-40 flex-row-reverse justify-center pl-0 text-white mb-4"
        />

    </div>
  )
}

export default MealPeriodCard