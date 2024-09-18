import React from 'react'


interface StepProps {
  text: string;
  number: number;
}

const Step:React.FC<StepProps> = ({ text, number }) => {
  return (
        <div className='bg-slate-800 rounded-md flex flex-col justify-center items-center py-10 min-h-80'>
            <span className='text-red-400 text-3xl font-bold'> {number} </span>
            <p> {text} </p>
        </div>
  )
}

export default Step