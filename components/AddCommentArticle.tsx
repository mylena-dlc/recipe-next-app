import React, { useState } from 'react';

interface AddCommentArticleProps {
    articleId: string; 
}

const AddCommentArticle: React.FC<AddCommentArticleProps> = ({ articleId }) => {
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!commentText.trim()) {
            setError('Le commentaire ne peut pas être vide.');
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch(`/api/commentArticle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: commentText,
                    articleId,  
                }),
            });

            if (!res.ok) {
                throw new Error('Erreur lors de l\'ajout du commentaire');
            }

            setCommentText('');  // Réinitialise le champ après succès
            location.reload();    // Recharge la page pour afficher le nouveau commentaire
        } catch (error) {
            console.error('Erreur lors de l\'ajout du commentaire', error);
            setError('Impossible d\'ajouter le commentaire.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-2 rounded-md bg-white dark:bg-slate-700"
                placeholder="Ajoutez votre commentaire ici ..."
                rows={3}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                type="submit"
                className="mt-3 p-2 bg-gradient-to-tr from-[#e56d59] to-[#ea8869] rounded-md text-white disabled:bg-gray-400 hover:opacity-80 focus:border-transparent
                focus:outline-none focus:ring-0"
                disabled={isSubmitting}
            >

                {isSubmitting ? 'Envoi...' : 'Ajouter un commentaire'}
            </button>
        </form>
    );
};

export default AddCommentArticle;
