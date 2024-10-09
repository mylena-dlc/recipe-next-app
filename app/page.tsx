"use client"

import React, { useEffect, useState } from 'react'
import RecipeCard from '@/components/RecipeCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';


export default function Home() {
    // redirect('/recipe');
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipe')
            const data: Recipe[] = await response.json()
            setRecipes(data)
        }

        fetchRecipes()
    }, [])

    return (
        <div className='pt-6'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl pb-4 md:pb-8 text-slate-500 dark:text-white'>
                Dernières Recettes
            </h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                 // Nombre de slides visibles varie en fonction de la taille de l'écran
                 slidesPerView={1} 
                 breakpoints={{
                     768: { 
                         slidesPerView: 3,
                     },
                     1024: { 
                         slidesPerView: 5,
                     },
                 }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow]}
                className="mySwiper"
            >

                {/* Affichage limiter à 5 recettes */}
                {recipes.slice(0, 5).map((recipe) => (
                    <SwiperSlide className='w-[20%]' key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )
}

