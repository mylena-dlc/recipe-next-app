import { NextRequest, NextResponse } from 'next/server';

interface NutritionRequestBody {
  title: string;
  ingredients: string[];
}

export async function POST(req: NextRequest) {
  try {
    // Vérifie que la méthode est bien POST
    if (req.method !== 'POST') {
      return new NextResponse('Méthode non autorisée', { status: 405 });
    }

    // Extraction des données envoyées par le client (titre et ingrédients)
    const { title, ingredients }: NutritionRequestBody = await req.json();  // Le corps de la requête doit être en JSON

    // Vérifie que les variables title et ingredients sont bien présentes
    if (!title || !ingredients || !Array.isArray(ingredients)) {
      return new NextResponse('Les données sont manquantes ou mal formatées', { status: 400 });
    }

    const app_id = process.env.EDAMAM_APP_ID;
    const app_key = process.env.EDAMAM_APP_KEY;

    // Appel à l'API Edamam
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-details?app_id=${app_id}&app_key=${app_key}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,       
          ingr: ingredients,  
        }),
      }
    );

    const data = await response.json();

    // Renvoi des données nutritionnelles avec un statut 200
    return NextResponse.json(data);

  } catch (error) {
    console.error("Erreur dans l'API nutrition:", error); 
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
