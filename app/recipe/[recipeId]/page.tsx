"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import DifficultyRating from '@/components/DifficultyRating';
import { Clock11, ListChecks, CookingPot, Waypoints, MessageSquareQuote, Lightbulb, Download, Heart, Leaf, Apple, Drumstick, Wheat, Droplet, Candy, Citrus } from 'lucide-react';
import Image from 'next/image';
import Card from '@/components/Card';
import Step from '@/components/Step';
import Comment from '@/components/Comment';
import AddComment from '@/components/AddComment';
import RecipeCard from '@/components/RecipeCard';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useUser } from '@clerk/nextjs';
import translations from '@/lib/translations';
import NutritionalCard from '@/components/NutritionalCard';
import Chart from '@/components/Chart';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

interface NutritionDataProp {
    calories?: number;
    totalNutrients?: {
        PROCNT?: { quantity: number };  
        CHOCDF?: { quantity: number }; 
        FAT?: { quantity: number };   
        VITC?: { quantity: number };
        SUGAR?: { quantity: number };
    };
}

const RecipeDetailPage = ({ params }: { params: { recipeId: string } }) => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
    const stepsCount = recipe ? recipe.steps.length : 0;
    const commentsCount = recipe ? recipe.comments.length : 0;
    const [isFavorite, setIsFavorite] = useState(false);
    const pageRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();
    const [nutritionData, setNutritionData] = useState<NutritionDataProp | null>(null);

    const getNutritionData = useCallback(async () => {
        if (!recipe) {
            console.log("Recette non chargée, impossible de récupérer les données nutritionnelles.");
            return;
        }
        // Fonction de traduction des ingrédients
        const translateIngredient = (ingredientName: string) => {
            return translations[ingredientName.toLowerCase()];
        };
        

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipe/${params.recipeId}`);
            const data: Recipe = await response.json();
            setRecipe(data);

            console.log("Détails de la recette chargés : ", data);

            // Récupérez les recettes de la même catégorie
            if (data.category && data.category.id) {
                const categoryResponse = await fetch(`/api/category/${data.category.id}`);
                if (!categoryResponse.ok) throw new Error('Erreur; catégorie non trouvée');

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

        // Ce useEffect sera déclenché lorsque "recipe" sera défini
        useEffect(() => {
            if (!recipe) return;
            console.log("Recette disponible, appel de getNutritionData...");
            getNutritionData();
        }, [recipe, getNutritionData]); // Ce useEffect dépend de la valeur de "recipe"



        const recipeData = {
            title: recipe.nameRecipe,
            ingredients: recipe.ingredients.map((ingredient) => {
                // Traduction des ingrédients en anglais
                const translatedIngredient = translateIngredient(ingredient.ingredient.nameIngredient);

                // Si la traduction n'est pas trouvée, on retourne null
                if (!translatedIngredient) return null;

                // Formatage de l'ingrédient uniquement si la traduction est valide
                return `${ingredient.quantity}${ingredient.unity === "gr" ? "g" : ingredient.unity} ${translatedIngredient}`;
            })
                // On filtre les ingrédients pour exclure ceux qui sont null
                .filter(Boolean) // Ceci élimine les valeurs null
        };

        console.log("Données à envoyer:", recipeData);

        try {
            const response = await fetch('/api/nutrition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données nutritionnelles');
            }

            const data = await response.json();
            console.log("Données nutritionnelles reçues : ", data);
            setNutritionData(data);
        } catch (error) {
            console.error('Erreur dans getNutritionData:', error);
        }
    
}, [recipe]);

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
                return 'rgb(37 90 37)';
            case 'dessert':
                return 'rgb(144 139 117)';
            case 'entrée':
                return '#D0838E';
            default:
                return 'rgb(59 102 123)';
        }
    };

    const generatePDF = () => {
        if (!recipe) return;

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true
        });

        // Titre de la recette
        doc.setFontSize(20);
        doc.text(recipe.nameRecipe, 10, 30);

        // Catégorie, durée de préparation, difficulté
        doc.setFontSize(12);
        doc.text(`Catégorie: ${recipe.category.nameCategory}`, 10, 50);
        doc.text(`Durée de préparation: ${recipe.preparationTime} minutes`, 10, 60);
        doc.text(`Difficulté: ${recipe.difficulty}/5`, 10, 70);

        // Ingrédients
        let yPosition = 100;
        doc.setFontSize(12);
        doc.text("Ingrédients:", 10, yPosition);
        yPosition += 10; // Ajouter un peu d'espace avant les ingrédients
        recipe.ingredients.forEach((ingredient, index) => {
            doc.setFontSize(12);
            doc.text(`${ingredient.ingredient.nameIngredient}: ${ingredient.quantity} ${ingredient.unity}`, 10, yPosition);
            yPosition += 10;
        });

        // Ustensiles
        doc.setFontSize(12);
        doc.text("Ustensiles:", 10, yPosition);
        yPosition += 10;
        recipe.tools.forEach((tool, index) => {
            doc.setFontSize(12);
            doc.text(`${tool.tool.nameTool}: ${tool.quantity || '1'}`, 10, yPosition);
            yPosition += 10;
        });

        // Instructions
        doc.setFontSize(12);
        doc.text("Instructions:", 10, yPosition);
        yPosition += 10;
        recipe.steps.forEach((step, index) => {
            const stepText = `${index + 1}. ${step.text}`;
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 10;
            const maxLineWidth = pageWidth - margin * 2;

            // Utilisation de splitTextToSize pour ne pas couper les mots
            const splitText: string[] = doc.splitTextToSize(stepText, maxLineWidth);

            // Afficher chaque ligne de l'instruction
            splitText.forEach((line: string) => {
                doc.text(line, margin, yPosition);
                yPosition += 8; 
            });
            yPosition += 5; // Un peu d'espace après chaque instruction
    });

        // Télécharger le PDF
        doc.save(`${recipe.nameRecipe}.pdf`);
    };


    return (
        <div>
            {recipe ? (
                <>
                    {/* Première section */}
                    <div className='bg-white dark:bg-slate-600 rounded-md p-6 lg:flex lg:space-x-6 m-6 lg:m-12' ref={pageRef}>
                        <div className="lg:w-1/2 mb-6 lg:mb-0 flex flex-col justify-center">
                            <h1 className='text-2xl sm:text-3xl lg:text-4xl text-center p-5'>{recipe.nameRecipe}</h1>
                            <div className='flex flex-col md:flex-row  items-center justify-center'>
                                <Tag
                                    text={recipe.category.nameCategory}
                                    style={{ backgroundColor: getCategoryColor(recipe.category.nameCategory) }}
                                    className='mr-5 text-white'
                                />
                                <span className='inline-flex mr-5'>
                                    <Clock11 className='mr-2' />
                                    {recipe.preparationTime} min
                                </span>
                                <DifficultyRating difficulty={recipe.difficulty} />
                            </div>
                            <div className='flex items-center justify-center lg:mx-44 mx-0 flex-col md:flex-row '>
                                {user ? (
                                    <>
                                        <Button
                                            label="Télécharger"
                                            href="#"
                                            className="mx8 mt-3 p-2 bg-gradient-to-tr from-[#e56d59] to-[#ea8869] rounded-md text-white hover:opacity-80 focus:border-transparent
                                            focus:outline-none focus:ring-0 flex justify-center"
                                            icon={<Download />}
                                            onClick={generatePDF}
                                        />
                                        <Button
                                            label={""}
                                            href="#"
                                            className="mx-8 mt-3 p-2 bg-gradient-to-tr from-[#e56d59] to-[#ea8869] rounded-md text-color-white hover:opacity-80 focus:border-transparent
                                            focus:outline-none focus:ring-0 flex justify-center pl-0"
                                            icon={<Heart fill={isFavorite ? "white" : "none"} stroke={isFavorite ? "none" : "#FFFFFF"} />}
                                            onClick={handleFavoriteClick}
                                        />
                                    </>
                                ) : (
                                    <div className='mt-3 text-slate-800 text-sm italic text-center'>
                                        <p>Veuillez vous connecter pour accéder aux fonctionnalités de téléchargement et de favoris.</p>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="lg:w-1/2 relative h-64">
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
                    <div className='m-6 lg:m-12 flex flex-col lg:flex-row'>
                        <div className='w-full lg:w-1/2 p-2'>
                            <SectionHeader
                                icon={ListChecks}
                                text="Instructions"
                            />
                            <p>{recipe.instructions}</p>
                        </div>

                        <div className='w-full p-2 lg:w-1/2 lg:p-4'>
                            <SectionHeader
                                icon={CookingPot}
                                text="Ingrédients et Ustensiles"
                            />
                            <TabGroup>
                                <TabList className='flex bg-red-200 dark:bg-slate-800 rounded-md p-2 mb-8 sm:p-1 sm:mb-4'>
                                    <Tab
                                        className={({ selected }) =>
                                            `text-white w-auto mr-4 p-2 uppercase rounded-md ${selected ? 'bg-gradient-to-tr from-[#e56d59] to-[#ea8869]' : 'text-white hover:bg-gradient-to-tr from-[#e56d59] to-[#ea8869]'}`
                                        }
                                    >
                                        Ingrédients
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            `text-white w-auto p-2 uppercase rounded-md ${selected ? 'bg-gradient-to-tr from-[#e56d59] to-[#ea8869]' : 'text-white hover:bg-gradient-to-tr from-[#e56d59] to-[#ea8869]'}`
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
                    <div className='m-6 lg:m-12'>
                        <div className='pt-8'>
                            <SectionHeader
                                icon={Waypoints}
                                text="Étapes"
                                count={stepsCount}
                            />
                        </div>

                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                // Quand la taille de l'écran est >= 768px (tablette ou plus grand)
                                768: {
                                    slidesPerView: 2, // Deux étapes à partir de 768px
                                },
                                // Quand la taille de l'écran est >= 1024px (desktop ou plus grand)
                                1024: {
                                    slidesPerView: 3, // Trois étapes à partir de 1024px
                                },
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

                    {/* Section des valeurs nutritionnelles */}
                    <div className='m-6 lg:m-12'>
                        <SectionHeader
                            icon={Leaf}
                            text="Valeurs Nutritionnelles"
                        />
                        {nutritionData ? (
                            <div>
                                <div className='grid grid-cols-3 gap-4'>
                                    <NutritionalCard
                                        icon={Apple}
                                        title="Calories"
                                        result={nutritionData?.calories ?? 0}
                                        unit="kcal"
                                    />
                                    <NutritionalCard
                                        icon={Drumstick}
                                        title="Protéines"
                                        result={nutritionData?.totalNutrients?.PROCNT?.quantity ?? 0}
                                        unit="g"
                                    />
                                    <NutritionalCard
                                        icon={Wheat}
                                        title="Glucides"
                                        result={nutritionData?.totalNutrients?.CHOCDF?.quantity ?? 0}
                                        unit="g"
                                    />
                                    <NutritionalCard
                                        icon={Droplet}
                                        title="Lipides"
                                        result={nutritionData?.totalNutrients?.FAT?.quantity ?? 0}
                                        unit="g"
                                    />
                                    <NutritionalCard
                                        icon={Candy}
                                        title="Sucres"
                                        result={nutritionData?.totalNutrients?.SUGAR?.quantity ?? 0}
                                        unit="kcal"
                                    />
                                    <NutritionalCard
                                        icon={Citrus}
                                        title="Vitamine C"
                                        result={nutritionData?.totalNutrients?.VITC?.quantity ?? 0}
                                        unit="mg"
                                    />
                                </div>

                                <div className='flex justify-center items-center my-8'>
                                    <Chart
                                        labels={["Protéines", "Glucides", "Lipides"]}
                                        values={[
                                            nutritionData?.totalNutrients?.PROCNT?.quantity ?? 0,
                                            nutritionData?.totalNutrients?.CHOCDF?.quantity ?? 0,
                                            nutritionData?.totalNutrients?.FAT?.quantity ?? 0
                                        ]}
                                    />

                                </div>
                            </div>
                        ) : (
                            <p>Chargement des données nutritionnelles...</p>
                        )}
                    </div>

                    {/* Commentaire */}
                    <div className='m-6 lg:m-12'>
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

                            {user ? (
                                <AddComment recipeId={recipe.id} />
                            ) : (
                                <div className='mt-3 text-slate-800 text-sm italic'>
                                    <p >Veuillez vous connecter pour ajouter un commentaire.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='m-6 lg:m-12'>
                        <SectionHeader
                            icon={Lightbulb}
                            text="Suggestions"
                        />

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
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
