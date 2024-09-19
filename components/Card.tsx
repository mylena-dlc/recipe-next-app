import React from 'react'
import Image from 'next/image'

interface CardProps {
  image: string;
  alt: string;
  name: string;
  quantity?: number;
  unity?: string;
}

const Card:React.FC<CardProps> = ({ image, alt, name, quantity, unity }) => {
    
  return (
    <div className='flex flex-col items-center'>
        <Image
            src={image}
            width={500}
            height={500}
            alt={alt}
            className="rounded-md"
            />
        <h4 className='text-2xl font-bold pt-4'>{name}</h4>
        <p>{quantity} {unity}</p>
    </div>
  )
}

export default Card