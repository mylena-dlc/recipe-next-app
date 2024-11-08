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

        const { text, articleId } = await req.json();

        if (!text || !articleId) {
            return new NextResponse('Invalid Input', { status: 400 });
        }

        const newArticleComment = await db.articleComment.create({
            data: {
                text,
                articleId,  // Associe le commentaire à un article
                userId: user.id,
            }
        });

        return new NextResponse(JSON.stringify(newArticleComment), { status: 201 });
        
    } catch (error) {
        console.error("[COMMENT POST]", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
