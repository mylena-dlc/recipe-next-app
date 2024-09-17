"use client"

import React, { useEffect, useState } from 'react'
import RecipeCard from '@/components/RecipeCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


const RecipePage = () => {

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
        <div>
            <h1 className='text-5xl pb-8'>Dernières Recettes</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={5}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {recipes.map((recipe) => (

                    <SwiperSlide className='w-[20%]'>
                        <RecipeCard recipe={recipe} />
                    </SwiperSlide>

                ))}
            </Swiper>
        </div>
    )

}
export default RecipePage