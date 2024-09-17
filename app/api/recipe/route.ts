import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {

    try {
        // récupérer la liste des recettes
        const recipes = await db.recipe.findMany({
            orderBy: {
            createdAt: 'desc'
            },
            include: {
                // category: true,
                tools: {
                    include: {
                        tool: true
                    }
                },
                ingredients: {
                    include: {
                        ingredient: true
                    }
                },            
            }
        })
      
        // retourne une réponse au format JSON 
        return NextResponse.json(recipes)

    } catch (error) {
        console.log("[RECIPES]", error)
        return new NextResponse("Internal Error", { status: 500})
    }

}