import React from 'react'
import { formatDate } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'


interface CommentProps {
    comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {

    const router = useRouter();

    const handleDelete = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/comment/${comment.id}/delete`, {
                method: 'DELETE'
            })
            // router.push('/comment')
            location.reload();
        } catch (error) {
            console.error('Error deleting comment')
        }
    }

    return (
        <div className='mt-5 rounded-md border border-slate-700 p-5 flex justify-between'>
            <div>
                <h2 className='text-2xl text-slate-400'>{comment.userId}</h2>
                <p className=" text-sm italic text-slate-400 py-2">{formatDate(comment.createdAt)} </p>
                <p>{comment.text}</p>
            </div>

            <div className='sm:top-5 sm:right-5 self-center'>
                <button onClick={handleDelete} className="flex gap-2 p-2 rounded-md bg-red-500 hover:bg-red-600 text-xs"><Trash2 size={15} />Delete</button>
            </div>

        </div>
    )
}

export default Comment