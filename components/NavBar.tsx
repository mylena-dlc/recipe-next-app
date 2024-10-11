"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'
import { checkUserRole } from '../lib/utils';
import { SignedOut, UserButton, SignedIn, useSession } from '@clerk/nextjs';


const NavBar: React.FC = () => {
    const links = [
        { title: 'Profil', url: '/profile' },
        { title: 'Tableau de bord', url: '/user' },
        { title: 'Admin Dashboard', url: '/admin', role: 'admin' },
        // Add more placeholder links as needed
    ];

    const { session } = useSession();
    const userRole = checkUserRole(session);

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // vérifier la préférence du mode sombre au chargement
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Fonction pour basculer entre les modes
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Fonction pour basculer le menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (

        <nav className='h-25 bg-white dark:bg-gray-800 py-5 px-20 fixed w-full top-0 left-0 flex justify-between items-center z-[100]' >
            <div className='text-red-400 font-bold text-4xl'>
                <Link className='cursor-pointer' href="/">
                    MyRecipes
                </Link>
            </div>

            {/* Bouton du menu burger */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-500 dark:text-white focus:outline-none">
                    {isOpen ? '✖️' : '☰'}
                </button>
            </div>

            <ul className={`hidden md:flex font-normal items-center text-slate-500 dark:text-white`}>

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
                    <Link className='cursor-pointer hover:underline' href="/favoris">
                        Favoris
                    </Link>
                </li>
                <li className='p-5'>
                    <SearchBar />
                </li>

                <SignedIn>
                    {links.map((link) =>
                        (link.role === 'admin' && userRole === 'admin') || !link.role ? (
                            <li key={link.title} className='p-5'>
                                <Link  href={link.url} className='cursor-pointer hover:underline'>
                                    {link.title}
                                </Link>
                            </li>
                            
                        ) : null
                    )}
                </SignedIn>

                {/* SignedOut Component */}
                <SignedOut>
                    <a href='/sign-in'>
                        <button className='text-white bg-red-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-500 rounded text-base mr-4'>
                            Connexion
                        </button>
                    </a>
                    <a href='/sign-up'>
                        <button className='text-white bg-red-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-500 rounded text-base'>
                            Inscription
                        </button>
                    </a>
                </SignedOut>

                {/* UserButton Component */}
                <SignedIn>
                    <div className='ml-4'>
                        <UserButton afterSignOutUrl='/' />
                    </div>
                </SignedIn>


                <li className='p-5'>
                    <button
                        onClick={toggleDarkMode}
                        className='p-2 rounded-md bg-gray-100 dark:bg-gray-600'
                    >
                        {isDarkMode ? 'Dark mode' : 'Light mode'}
                    </button>
                </li>
            </ul>

            {/* Menu mobile */}
            <div className={`fixed inset-0 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'} z-50`}>
                <div className="flex justify-between items-center p-5 border-b">
                    <div className='text-red-400 font-bold text-4xl'>
                        <Link className='cursor-pointer' href="/">
                            MyRecipes
                        </Link>
                    </div>
                    <button onClick={toggleMenu} className="text-gray-500 dark:text-white focus:outline-none">
                        ✖️ {/* Icône pour fermer le menu */}
                    </button>
                </div>
                <ul className='flex flex-col items-center text-slate-500 dark:text-white'>
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
                        <Link className='cursor-pointer hover:underline' href="/favoris">
                            Favoris
                        </Link>
                    </li>
                    <li className='p-5'>
                        <SearchBar />
                    </li>
                    <li className='p-5'>
                        <button
                            onClick={toggleDarkMode}
                            className='p-2 rounded-md bg-gray-100 dark:bg-gray-600'
                        >
                            {isDarkMode ? 'Dark mode' : 'Light mode'}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default NavBar