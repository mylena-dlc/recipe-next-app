"use client";

import React, { useEffect, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Tag from '@/components/Tag';
import DifficultyRating from '@/components/DifficultyRating';
import { Clock11, ListChecks, CookingPot, Waypoints, MessageSquareQuote, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Step from '@/components/Step';
import Comment from '@/components/Comment';
import AddComment from '@/components/AddComment';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const RecipeDetailPage = ({ params }: { params: { recipeId: string } }) => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [showIngredients, setShowIngredients] = useState(true); // État pour afficher les ingrédients ou les ustensiles
    const stepsCount = recipe ? recipe.steps.length : 0;
    const commentsCount = recipe ? recipe.comments.length : 0;

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipe/${params.recipeId}`);
            const data: Recipe = await response.json();
            setRecipe(data);
        };
        fetchRecipe();
    }, [params.recipeId]);

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'plat':
                return 'rgb(37 90 37)'; // vert foncé
            case 'dessert':
                return 'rgb(144 139 117)'; // beige
            case 'entrée':
                return '#D0838E'; // vieux rose
            default:
                return 'rgb(59 102 123)'; // couleur par défaut
        }
    };

    return (
        <div>
            {recipe ? (
                <>
                    {/* Première section */}
                    <div className='bg-slate-600 rounded-md m-28 flex'>
                        <div className="w-1/2 p-4 flex flex-col justify-center">
                            <h1 className='text-4xl text-center p-5'>{recipe.nameRecipe}</h1>
                            <div className='flex items-center justify-center'>
                                <Tag
                                    text={recipe.category.nameCategory}
                                    style={{ backgroundColor: getCategoryColor(recipe.category.nameCategory) }}
                                    className='mr-5'
                                />
                                <span className='inline-flex mr-5'>
                                    <Clock11 className='mr-2' />
                                    {recipe.preparationTime} min
                                </span>
                                <DifficultyRating difficulty={recipe.difficulty} />
                            </div>
                        </div>
                        <div className="w-1/2 p-4 relative min-h-[400px]">
                            <Image
                                src={recipe.image}
                                fill // Utilise la propriété fill pour prendre toute la place du conteneur
                                style={{ objectFit: 'cover' }} // Ajoute l'objet fit ici
                                alt={recipe.nameRecipe}
                                className='rounded-md'
                            />
                        </div>
                    </div>

                    {/* Deuxième section */}
                    <div className='flex m-28'>
                        <div className='w-1/2 p-4'>
                            <SectionHeader
                                icon={ListChecks}
                                text="Instructions"
                            />
                            {recipe.instructions}
                        </div>

                        <div className='w-1/2 p-4'>
                            <SectionHeader
                                icon={CookingPot}
                                text="Ingrédients et Ustensiles"
                            />
                            <div className='flex bg-slate-800 rounded-md p-2 mb-8'>
                                <Button
                                    label="Ingrédients"
                                    href="#"
                                    className={`hover:bg-gradient-to-tr from-[#e56d59] to-[#ea8869] uppercase font-bold w-auto ${showIngredients ? 'bg-gradient-to-tr from-[#e56d59] to-[#ea8869]' : 'bg-gray-300'}`}
                                />
                                <Button
                                    label="Ustensiles"
                                    href="#"
                                    className={`hover:bg-gradient-to-tr from-[#e56d59] to-[#ea8869] uppercase font-bold w-auto ${!showIngredients ? 'bg-gradient-to-tr from-[#e56d59] to-[#ea8869]' : 'bg-gray-300'}`}

                                />
                            </div>


                            {/*  Ingrédients */}
                            <div className='grid grid-cols-1 sm:grid-cols-6 gap-4'>
                                {recipe.ingredients.map((ingredient: RecipeIngredientType) => (
                                    <Card
                                        key={ingredient.id}
                                        image={ingredient.ingredient.image}
                                        alt={ingredient.ingredient.nameIngredient}
                                        name={ingredient.ingredient.nameIngredient}
                                        quantity={ingredient.quantity}
                                        unity={ingredient.unity}
                                    />
                                ))}
                            </div>

                            {/*  Ustensiles */}
                            <div className='grid grid-cols-1 sm:grid-cols-6 gap-4'>
                                {recipe.tools.map((tool: RecipeToolType) => (
                                    <Card
                                        key={tool.id}
                                        image={tool.tool.image}
                                        alt={tool.tool.nameTool}
                                        quantity={tool.quantity}
                                        name={tool.tool.nameTool}
                                    />
                                ))}
                            </div>

                        </div>

                    </div>

                    {/* Troisième partie */}
                    <div className='m-28'>
                        <div className='pt-8'>
                            <SectionHeader
                                icon={Waypoints}
                                text="Étapes"
                                count={stepsCount}

                            />
                        </div>

                        <Swiper
                            spaceBetween={30}
                            slidesPerView={2}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >

                            {recipe.steps.map((step: StepType) => (
                                <SwiperSlide key={step.id}>
                                    <Step
                                        key={step.id}
                                        text={step.text}
                                        number={step.number}
                                    />
                                </SwiperSlide>

                            ))}
                        </Swiper>
                    </div>

                    {/* Commentaire */}
                    <div className='m-28'>
                        <div className='pt-8'>
                            <SectionHeader
                                icon={MessageSquareQuote}
                                text="Commentaires"
                                count={commentsCount}
                            />
                        </div>

                        {recipe.comments && recipe?.comments.length > 0 ? (

                            recipe.comments.map((comment: CommentType) => (
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))
                        ) : (
                            <p>Aucun commentaire.</p>
                        )}

                        <div className='pt-12'>
                            <SectionHeader
                                icon={MessageSquareQuote}
                                text="Ajouter un commentaire"
                            />

                            <AddComment recipeId={recipe.id} />
                        </div>
                    </div>

                    <div className='m-28'>
                            <SectionHeader
                                icon={Lightbulb}
                                text="Suggestions"
                            />

                        </div>
                </>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RecipeDetailPage;
