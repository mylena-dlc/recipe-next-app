//   "use client"

// import React, { useEffect, useState } from 'react';
// import RecipeCard from '@/components/RecipeCard';

// const Profile = () => {
//     const [favorites, setFavorites] = useState<Recipe[]>([]);

//     useEffect(() => {
//         const fetchFavorites = () => {
//             const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
//             setFavorites(favoritesFromStorage);
//         };

//         fetchFavorites();
//     }, []);


//     return (
//       <div>
//         <h1>Mon compte</h1>
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {favorites.length > 0 ? (
//                     favorites.map((recipe) => (
//                         <RecipeCard key={recipe.id} recipe={recipe} />
//                     ))
//                 ) : (
//                     <p>Aucune recette favorite.</p>
//                 )}
//             </div>
//       </div>
//     );
//   };
  
//   export default Profile;





