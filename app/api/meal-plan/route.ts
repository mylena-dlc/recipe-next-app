import { db } from '@/lib/db' 
import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'

export async function GET() {
    
  try {
    // Récupère l'utilisateur connecté avec Clerk
    const user = await currentUser()
    if (!user) {
      console.log("utilisateur non trouvé");

      return new NextResponse("User non identifié", { status: 401 });
    } else {
      console.log("user ok");
    }

    // Récupère les plans de repas de l'utilisateur
    const mealPlans = await db.mealPlan.findMany({
      where: {
        userId: user.id, 
      },
      include: {
        mealPeriod: true, // Inclure le mealPeriod (petit-déjeuner, déjeuner, dîner)
        mealPlanRecipes: {
          include: {
            recipe: true, // Inclure les recettes associées à chaque MealPlanRecipe
          },
        },
      },
    })
    return NextResponse.json(mealPlans)

  } catch (error) {
    console.log("[MEAL PLANS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
