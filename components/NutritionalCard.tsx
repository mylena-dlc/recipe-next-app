import React from 'react'
import { LucideIcon } from 'lucide-react';

interface NutritionalCardProps {
    icon: LucideIcon;
    title: string;
    result: number;
    unit: string;
}

const NutritionalCard:React.FC<NutritionalCardProps> = ({ icon:Icon, title, result, unit}) => {

const roundedResult = result.toFixed(2);

  return (
    <div className="flex flex-col items-center border p-10 rounded-md bg-white dark:bg-slate-800 dark:border-slate-800 dark:hover:bg-slate-700 cursor-pointer hover:translate-y-2 duration-300">
        <span className='text-2xl font-semibold flex text-red-400 pb-3 bg-red-50 p-4 rounded-full'> 
            <Icon />
         </span> 
        <p>{title}</p>
        <p>{roundedResult} {unit}</p>         
    </div>
  )
}

export default NutritionalCard