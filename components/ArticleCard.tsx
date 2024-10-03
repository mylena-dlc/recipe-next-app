import React from 'react'
import { formatDate } from '@/lib/utils'
import Tag from './Tag'
import { useRouter } from 'next/navigation'
import { MessageSquareIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'


interface ArticleCardProps {
  article: ArticleWithTagsAndComments
}

const ArticleCard = ({ article }: ArticleCardProps) => {

  const router = useRouter();


  return (
    <div className="group border p-10 rounded-md border-slate-800 hover:bg-slate-700 cursor-pointer hover:translate-y-2 duration-300" key={article.id}>
      
      <Link href={`/article/${article.id}`} >
      {/* Titre de l'article */}
      <h2 className="text-2xl md:text-xl font-bold">{article.title}</h2>

      {/* date / heure */}
      <p className='text-sm text-slate-400 my-2'>{formatDate(article.createdAt)}</p>

      {/* Liste des tags */}
      <div className='flex flex-wrap gap-2 my-4'>
        {article.tags.map((tagArticle) => (
          <Tag key={tagArticle.tag.id} text={tagArticle.tag.name} className="bg-red-400 text-base" />
        ))}
      </div>

      {/* Texte de l'article */}
      <p className='line-clamp-4 text-slate-200 mb-4'> {article.text}</p>

       <p className='text-red-400 my-10'>Lire plus...</p>
       </Link>


    </div>
  )
}

export default ArticleCard