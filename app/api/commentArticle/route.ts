import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { text, articleId } = await req.json();

        if (!text || !articleId) {
            return new NextResponse('Invalid Input', { status: 400 });
        }

        const newCommentArticle = await db.comment.create({
            data: {
                text,
                articleId,  // Associe le commentaire à un article
                userId: "userId",  
            }
        });

        return new NextResponse(JSON.stringify(newCommentArticle), { status: 201 });
        
    } catch (error) {
        console.error("[COMMENT POST]", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
