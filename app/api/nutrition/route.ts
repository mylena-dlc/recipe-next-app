import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Récupérer les données envoyées par le frontend (la liste des ingrédients)
    const { ingredients } = await request.json();

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json({ error: 'Ingrédients manquants' }, { status: 400 });
    }
    // console.log(ingredients);

    // Appel à l'API Edamam Nutrition Analysis
    const response = await fetch(
    //   `https://api.edamam.com/api/nutrition-details?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`,
      `https://api.edamam.com/api/nutrition-details?app_id=1906a19e&app_key=330f5c8d23c1374665ac71905a57af29%09`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Analyse nutritionnelle',
          ingr: ingredients,  // Liste d'ingrédients envoyée dans le body
        })
      }
    );
    console.log('Sending ingredients to Edamam:', ingredients);


    // Vérifier si la requête vers Edamam est réussie
    if (!response.ok) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des données de l\'API Edamam' }, { status: response.status });
    }

    // Convertir la réponse en JSON
    const nutritionData = await response.json();

    // Retourner les données nutritionnelles
    return NextResponse.json(nutritionData);

  } catch (error) {
    console.error("[EDAMAM_API_ERROR]:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
