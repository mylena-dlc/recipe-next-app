import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  label: string;
  href: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
const Button:React.FC<ButtonProps> = ({ label, href, icon, className, onClick }) => {
  return (
    <Link onClick={onClick} className={`w-2/3 flex items-center pl-5 py-2 mt-3  cursor-pointer rounded-lg duration-300 ${className}`}
      href={href}
      >
          {label}
          {icon && <span className="mx-2">{icon}</span>} {/* Affiche l'icône uniquement si elle est fournie */}
    </Link>
  )
}

export default Button