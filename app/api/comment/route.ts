import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        // Récupère l'utilisateur connecté avec Clerk
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Utilisateur non identifié", { status: 401 });
        }

        const { text, recipeId } = await req.json();

        if (!text || !recipeId) {
            return new NextResponse('Invalid Input', { status: 400 });
        }

        const newComment = await db.comment.create({
            data: {
                text,
                recipeId,  // Associe le commentaire à une recette
                userId: user.id,  
            }
        });

        return new NextResponse(JSON.stringify(newComment), { status: 201 });
        
    } catch (error) {
        console.error("[COMMENT POST]", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
