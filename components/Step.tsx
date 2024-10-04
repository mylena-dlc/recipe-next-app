import React from 'react'


interface StepProps {
  text: string;
  number: number;
}

const Step:React.FC<StepProps> = ({ text, number }) => {
  return (
        <div className='bg-white before:dark:bg-slate-800 rounded-md flex flex-col justify-center items-center p-10 min-h-80'>
            <span className='text-red-400 text-3xl font-bold'> {number} </span>
            <p className='text-center'> {text} </p>
        </div>
  )
}

export default Step