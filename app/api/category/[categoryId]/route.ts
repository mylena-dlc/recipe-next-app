import { NextRequest } from "next/server";
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: {categoryId: string } })
{
    const { categoryId } = params;

    try {
        // récupére les recettes par Id de catégorie
        const recipes = await db.recipe.findMany({
            where: {
                categoryId: categoryId
            },
            include: {
                category: true
            }
        })

        // retourne une réponse au format JSON 
        return NextResponse.json(recipes)

    } catch (error) {
        console.log("[CATEGORY_RECIPE]", error)
        return new NextResponse("Internal Error", { status: 500})
    }
}