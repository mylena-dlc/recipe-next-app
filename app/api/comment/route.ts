import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { text, recipeId } = await req.json();

        if (!text || !recipeId) {
            return new NextResponse('Invalid Input', { status: 400 });
        }

        const newComment = await db.comment.create({
            data: {
                text,
                recipeId,  // Associe le commentaire à une recette
                userId: "userId",  
            }
        });

        return new NextResponse(JSON.stringify(newComment), { status: 201 });
    } catch (error) {
        console.error("[COMMENT POST]", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
