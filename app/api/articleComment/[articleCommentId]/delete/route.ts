import { db } from "@/lib/db";
import {  NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { articleCommentId: string } }) {
    try {
        const { articleCommentId } = params;

        // Check if the comment exists
        const comment = await db.articleComment.findUnique({
            where: {
                id: articleCommentId
            }
        });

        if (!comment) {
            return new NextResponse('Comment Not Found', { status: 404 });
        }

        // Delete the comment
        await db.articleComment.delete({
            where: {
                id: articleCommentId
            }
        });

        return new NextResponse('Comment deleted successfully', { status: 200 });
    } catch (error) {
        console.error("[COMMENT]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
