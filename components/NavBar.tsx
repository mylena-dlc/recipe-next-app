import React from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'


const NavBar:React.FC = () => {
    return (

        <nav className='h-25 bg-gray-800 py-5 px-20 fixed w-full top-0 left-0 flex justify-between items-center z-[100]' >
            <div className='text-red-400 font-bold text-4xl'>  
                <Link className='cursor-pointer' href="/"> 
                    MyRecipes
                </Link>
            </div>
            <ul className='flex font-normal items-center'>
                <li className='p-5'>
                     <Link className='cursor-pointer hover:underline' href="/recipe"> 
                        Recettes
                    </Link>
                </li>
                <li className='p-5'>
                     <Link className='cursor-pointer hover:underline' href="/article"> 
                        Blog
                    </Link>
                </li>
                <li className='p-5'>
                    <SearchBar />
                </li>
            </ul>
        </nav>
       
    )
}

export default NavBar