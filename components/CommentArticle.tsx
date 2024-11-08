import React from 'react'
import { formatDate } from '@/lib/utils'
import { Trash2 } from 'lucide-react'


interface ArticleCommentProps {
    articleComment: ArticleCommentType
}

const ArticleComment = ({ articleComment }: ArticleCommentProps) => {

    const handleDelete = async () => {

        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce commentaire ?');
        if (!confirmDelete) return;

        try {
            await fetch(`/api/articleComment/${articleComment.id}/delete`, {
                method: 'DELETE'
            })
            // router.push('/comment')
            location.reload();
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire')
        }
    }

    return (
        <div className='mt-5 rounded-md border border-slate-700 p-5 flex justify-between'>
            <div>
                <h2 className='text-2xl text-slate-400'>{articleComment.userId}</h2>
                <p className=" text-sm italic text-slate-400 py-2">{formatDate(articleComment.createdAt)} </p>
                <p>{articleComment.text}</p>
            </div>

            <div className='sm:top-5 sm:right-5 self-center'>
                <button onClick={handleDelete} className="text-white flex gap-2 p-2 rounded-md bg-red-500 hover:bg-red-600 text-xs"><Trash2 /></button>
            </div>

        </div>
    )
}

export default ArticleComment