import { db } from "@/lib/db";
import {  NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { mealplanId: string } }) {
    try {
        const { mealplanId } = params;

        // Check if the mealplan exists
        const mealplan = await db.mealPlan.findUnique({
            where: {
                id: mealplanId
            }
        });

        if (!mealplan) {
            return new NextResponse('mealplan Not Found', { status: 404 });
        }

        // Delete the mealplan
        await db.mealPlan.delete({
            where: {
                id: mealplanId
            }
        });

        return new NextResponse('mealplan deleted successfully', { status: 200 });
    } catch (error) {
        console.error("[MEALPLAN]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
