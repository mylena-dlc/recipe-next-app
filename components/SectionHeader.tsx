import React from 'react'
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
    icon: LucideIcon;
    text: string;
    count?: number;
}
const SectionHeader:React.FC<SectionHeaderProps> = ({ icon: Icon, text, count}) => {
    return (
        <h2 className='text-2xl font-semibold flex text-red-400 pb-3'>
             <Icon className="mr-4" />
              {text} 
              {count !== undefined && <span className='pl-2'>({count})</span>} 
        </h2>        
    )
}

export default SectionHeader