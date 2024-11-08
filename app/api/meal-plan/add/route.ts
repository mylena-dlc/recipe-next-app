import { db } from "@/lib/db";
import {  NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server';

interface MealPlanRequest {
  mealPeriodId: string; 
  recipes: string[]; 
}

export async function POST(req: Request) {
    try {
      // Récupère l'utilisateur connecté avec Clerk
      const user = await currentUser();
      if (!user) {
        return new NextResponse("Utilisateur non identifié", { status: 401 });
      }

    // Récupérer les données de la requête
    const { date, mealPlans }: { date: string; mealPlans: MealPlanRequest[] } = await req.json();

     if (!date || !mealPlans || mealPlans.length === 0) {
      return new NextResponse("Date ou MealPlan manquant", { status: 400 });
    }

 // Créez le Meal Plan et les associations avec les recettes
 const createdMealPlans = await Promise.all(
  mealPlans.map(async ({ mealPeriodId, recipes }) => {
    const mealPlan = await db.mealPlan.create({
      data: {
        date: new Date(date), // Convertir en objet Date
        userId: user.id, // l'ID de l'utilisateur connecté
        mealPeriodId, // ID de la période de repas
        mealPlanRecipes: {
          create: recipes.map(recipeId => ({
            recipeId, // Assurez-vous que vous avez uniquement les IDs des recettes
          })),
        },
      },
    });
    return mealPlan;
  })
);

// Retourner une réponse avec le nouveau Meal Plan
return NextResponse.json(createdMealPlans);
    
} catch (error) {
  console.error("[ADD MEAL PLAN ERROR]:", error);
  return new NextResponse("Erreur interne", { status: 500 });
}
}

