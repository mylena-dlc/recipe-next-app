import React from 'react'
import Link from 'next/link'


const NavBar:React.FC = () => {
    return (

        <nav className='h-25 bg-gray-800 py-5 px-20 fixed w-full top-0 left-0 flex justify-between items-center z-[100]' >
            <div className='text-red-400 font-bold text-4xl'>MyRecipes</div>
            <ul className='flex font-bold'>
                <li className='p-5'>
                     <Link className='cursor-pointer hover:underline' href="/recipe"> 
                        Recipes
                    </Link>
                </li>
                <li className='p-5'>
                     <Link className='cursor-pointer hover:underline' href="#"> 
                        Search
                    </Link>
                </li>
                <li className='p-5'>
                     <Link className='cursor-pointer hover:underline' href="#"> 
                        Blog
                    </Link>
                </li>
            </ul>
        </nav>
       
    )
}

export default NavBar