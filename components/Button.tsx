import React from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface ButtonProps {
  label: string;
  href: string;
  className?: string;
  icon?: React.ReactNode;
}
const Button:React.FC<ButtonProps> = ({ label, href, icon, className }) => {
  return (
    <Link className={`w-2/3 flex items-center px-5 py-2 mt-3  cursor-pointer rounded-lg duration-300 ${className}`}
      href={href}
      >
          {label}
          {icon && <span className="ml-2">{icon}</span>} {/* Affiche l'icône uniquement si elle est fournie */}
    </Link>
  )
}

export default Button