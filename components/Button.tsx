import React from 'react'
import Link from 'next/link'
import {MessageSquareIcon, ArrowRight } from 'lucide-react'


interface ButtonProps {
  label: string;
  href: string;
}
const Button:React.FC<ButtonProps> = ({ label, href }) => {
  return (
    <Link className='w-2/3 flex items-center px-5 py-2 mt-3 border-2 border-white hover:bg-slate-900 hover:border-slate-900 cursor-pointer rounded-lg duration-300'
    href={href}>
        {label}
    <ArrowRight className='ml-2' /> 
  </Link>
  )
}

export default Button