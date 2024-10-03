"use client"

import ArticleCard from '@/components/ArticleCard'
import NavBar from '@/components/NavBar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ArticlePage = () => {
  const [articles, setArticles] = useState<ArticleWithTagsAndComments[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/article')
      const data: ArticleWithTagsAndComments[] = await response.json()
      setArticles(data)
    }

    fetchArticles()
  }, [])

  return (
    <div className='mt-10'>
      <NavBar />
      <h1 className='text-2xl pb-10'>Blog</h1>

      <div className='mx-[200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Liste des articles */}
        {articles.map((article: any) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ArticlePage
