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

    // Remplacez ces valeurs par vos propres clés API Edamam
    // const app_id = '1906a19e';
    // const app_key = '330f5c8d23c1374665ac71905a57af29';

    // Appel à l'API Edamam
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-details?app_id=${app_id}&app_key=${app_key}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,        // Titre de la recette
          ingr: ingredients,   // Liste des ingrédients envoyée dans le body
        }),
      }
    );

    // Vérification de la réussite de la requête vers l'API Edamam
    // if (!response.ok) {
    //   throw new Error('Erreur lors de la récupération des données nutritionnelles');
    // }

    // Récupération des données de réponse sous forme JSON
    const data = await response.json();

    // Renvoi des données nutritionnelles avec un statut 200
    return NextResponse.json(data);

  } catch (error) {
    console.error("Erreur dans l'API nutrition:", error); 
        // Gestion des erreurs et retour d'un statut 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
