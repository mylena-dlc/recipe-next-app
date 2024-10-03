import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {

    try {
        // récupérer la liste des articles
        const articles = await db.article.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                },
                comments: true
            }
        })

        console.log('Articles:', articles);

        // retourne une réponse au format JSON 
        return NextResponse.json(articles)

    } catch (error) {
        console.log("[ARTICLES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }

}