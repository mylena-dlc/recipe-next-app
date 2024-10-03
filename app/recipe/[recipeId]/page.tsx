"use client";

import React, { useEffect, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import DifficultyRating from '@/components/DifficultyRating';
import { Clock11, ListChecks, CookingPot, Waypoints, MessageSquareQuote, Lightbulb, Download, Heart } from 'lucide-react';
import Image from 'next/image';
import Card from '@/components/Card';
import Step from '@/components/Step';
import Comment from '@/components/Comment';
import AddComment from '@/components/AddComment';
import RecipeCard from '@/components/RecipeCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'


const RecipeDetailPage = ({ params }: { params: { recipeId: string } }) => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
    const stepsCount = recipe ? recipe.steps.length : 0;
    const commentsCount = recipe ? recipe.comments.length : 0;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipe/${params.recipeId}`);
            const data: Recipe = await response.json();
            setRecipe(data);


            // Récupérez les recettes de la même catégorie
            if (data.category && data.category.id) {
                const categoryResponse = await fetch(`/api/recipe/category/${data.category.id}`);
                if (!categoryResponse.ok) throw new Error('Category recipes not found');

                const categoryRecipes: Recipe[] = await categoryResponse.json();

                // Filtre la recette actuelle
                const filteredRecipes = categoryRecipes.filter(recipe => recipe.id !== data.id);

                // Sélectionne 3 recettes aléatoires 
                // sort(() => 0.5 - Math.random()): mélange aléatoirement les recettes du tableau
                // slice(0, 3) : prend les 3 premières recettes du tableau
                const randomRecipes = filteredRecipes.sort(() => 0.5 - Math.random()).slice(0, 3);

                setRelatedRecipes(randomRecipes);
            };
             // Vérifier si la recette est déjà dans les favoris
             const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
             const isFav = favorites.some((fav: any) => fav.id === data.id);
             setIsFavorite(isFav);
        }
        fetchRecipe();
    }, [params.recipeId]);

    const handleFavoriteClick = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (isFavorite) {
            // Si la recette est déjà en favoris, on la retire
            favorites = favorites.filter((fav: any) => fav.id !== recipe?.id);
        } else {
            // Sinon, on l'ajoute aux favoris
            if (recipe) {
                favorites.push(recipe);
            }
        }

        // Met à jour le localStorage avec les favoris
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Met à jour l'état local pour afficher visuellement que la recette est en favoris
        setIsFavorite(!isFavorite);
    };

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
                            <div className='flex items-center justify-center mx-44'>
                                <Button
                                    label="Télécharger"
                                    href="#"
                                    className="mx8 mt-3 p-2 bg-gradient-to-tr from-[#e56d59] to-[#ea8869] rounded-md text-white disabled:bg-gray-400 hover:opacity-80 focus:border-transparent
                                    focus:outline-none focus:ring-0 flex justify-center"
                                    icon = {<Download />}
                                />
                                <Button
                                    label={isFavorite ? "Retirer des Favoris" : "Ajouter aux Favoris"} // Mise à jour du label selon l'état
                                    href="#"
                                    className="mx-8 mt-3 p-2 bg-gradient-to-tr from-[#e56d59] to-[#ea8869] rounded-md text-white disabled:bg-gray-400 hover:opacity-80 focus:border-transparent
                                    focus:outline-none focus:ring-0 flex justify-center"
                                    icon = {<Heart />}
                                    onClick={handleFavoriteClick}
                                />
                                
                            </div>

                        </div>
                        <div className="w-1/2 p-4 relative min-h-[400px]">
                            <Image
                                src={recipe.image}
                                fill // Utilise la propriété fill pour prendre toute la place du conteneur
                                style={{ objectFit: 'cover' }}
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
                            <TabGroup>
                                <TabList className='flex bg-slate-800 rounded-md p-2 mb-8 font-bold'>
                                    <Tab
                                        className={({ selected }) =>
                                            `w-auto mr-4 p-2 uppercase rounded-md ${selected ? 'bg-gradient-to-tr from-[#e56d59] to-[#ea8869]' : 'text-white hover:bg-gradient-to-tr from-[#e56d59] to-[#ea8869]'}`
                                        }
                                    >
                                        Ingrédients
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            `w-auto p-2 uppercase rounded-md ${selected ? 'bg-gradient-to-tr from-[#e56d59] to-[#ea8869]' : 'text-white hover:bg-gradient-to-tr from-[#e56d59] to-[#ea8869]'}`
                                        }
                                    >
                                        Ustensiles
                                    </Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        {/* Ingrédients */}
                                        <div className='grid grid-cols-1 sm:grid-cols-6 gap-4'>
                                            {recipe.ingredients.map((ingredient) => (
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
                                    </TabPanel>
                                    <TabPanel>
                                        {/* Ustensiles */}
                                        <div className='grid grid-cols-1 sm:grid-cols-6 gap-4'>
                                            {recipe.tools.map((tool) => (
                                                <Card
                                                    key={tool.id}
                                                    image={tool.tool.image}
                                                    alt={tool.tool.nameTool}
                                                    quantity={tool.quantity}
                                                    name={tool.tool.nameTool}
                                                />
                                            ))}
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>

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

                        <div className='grid grid-cols-1 sm:grid-cols-6 gap-4'>
                            {relatedRecipes.map((categoryRecipe: Recipe) => (
                                <RecipeCard
                                    key={categoryRecipe.id}
                                    recipe={categoryRecipe}
                                />
                            ))}
                        </div>


                    </div>
                </>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RecipeDetailPage;
