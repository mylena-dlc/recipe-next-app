import { NextRequest } from "next/server";
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {

    // Récupérer la query string
    const url = new URL(req.url); // création de l'objet URL
    const query = url.searchParams.get('q') || ''; // Extraction des paramètres de recheche (valeur q)


    try {
        // Recherche des recettes basées sur la query
        const recipes = await db.recipe.findMany({
            where: {
                nameRecipe: {
                    contains: query, // Recherche de correspondance partielle dans le nom de la recette
                    mode: 'insensitive' // Insensible à la casse
                }
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
            }
        });

        return NextResponse.json(recipes);

    } catch (error) {
        console.log("[SEARCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
