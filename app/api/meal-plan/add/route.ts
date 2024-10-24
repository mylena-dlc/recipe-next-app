import { db } from "@/lib/db";
import {  NextResponse } from "next/server";
import { auth, currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        // Récupère l'utilisateur connecté avec Clerk
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Utilisateur non identifié", { status: 401 });
    }

    // Récupérer les données de la requête
    const { date, mealPeriodId } = await req.json();

    if (!date || !mealPeriodId) {
      return new NextResponse("Date ou MealPeriod manquant", { status: 400 });
    }

      // Insérer un nouveau "Meal Plan" dans la base de données
      const addMealPlan = await db.mealPlan.create({
        data: {
          date: new Date(date), // convertir en objet Date
          userId: user.id, // l'ID de l'utilisateur connecté
          mealPeriodId,    // ID de la période de repas
        },
      });
  
    // Retourner une réponse avec le nouveau Meal Plan
    return NextResponse.json(addMealPlan);
    
} catch (error) {
  console.error("[ADD MEAL PLAN ERROR]:", error);
  return new NextResponse("Erreur interne", { status: 500 });
}
}

