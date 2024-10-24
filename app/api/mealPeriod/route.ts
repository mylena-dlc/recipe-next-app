import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    
  try {
    // Récupère toutes les périodes de repas
    const mealPeriods = await db.mealPeriod.findMany();
    return NextResponse.json(mealPeriods);
  } catch (error) {
    console.error("[MEAL PERIODS]", error);
    return new NextResponse("Erreur lors de la récupération des périodes de repas", { status: 500 });
  }
}
