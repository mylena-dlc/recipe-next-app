import { NextRequest } from "next/server";
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: {recipeId: string } })
{
    const { recipeId } = params;

    try {
        // récupérer une recette spécifique
        const recipe = await db.recipe.findUnique({
            where: {
                id: recipeId
            },
            include: {
                category: true,
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
                steps: true,
                comments: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },            
            }
        })
        console.log("Recipe Data:", recipe); 
        // retourne une réponse au format JSON 
        return NextResponse.json(recipe)

    } catch (error) {
        console.log("[RECIPE]", error)
        return new NextResponse("Internal Error", { status: 500})
    }
}