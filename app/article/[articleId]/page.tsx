"use client"

import React, { useEffect, useState } from 'react'
import Tag from '@/components/Tag'
import AddCommentArticle from '@/components/AddCommentArticle'
import { formatDate } from '@/lib/utils'
import CommentArticle from '@/components/CommentArticle'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'
import { MessageSquareQuote, ArrowLeft } from 'lucide-react';


const ArticleDetailPage = ({ params }: { params: { articleId: string } }) => {

    const [article, setArticle] = useState<ArticleWithTagsAndComments | null>(null)
    const [loading, setLoading] = useState(true);
    const commentsCount = article ? article.comments.length : 0;

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/article/${params.articleId}`);

                // Vérifie si la réponse est correcte
                if (!response.ok) {
                    throw new Error("Failed to fetch article data");
                }

                const data: ArticleWithTagsAndComments = await response.json();
                setArticle(data);
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false); // Terminer le chargement
            }
        };

        fetchArticle();
    }, [params.articleId]);

    if (loading) {
        return <div>Chargement de l'article...</div>;
    }

    return (
        <div className='group p-6'>
            {article && (
                <div className='mx-20'>
                    <Button 
                        href="/article"
                        label="Retour"
                        icon={<ArrowLeft />}
                        className="bg-red-400 w-40 flex-row-reverse justify-center pl-0 text-white"
                    />

                    {/* <div className="rounded-md flex flex-col justify-center items-center bg-[url('../public/img/overlay.png')] bg-cover bg-center h-[400px] max-h-[400px] filter grayscale"> */}
                    <div className="rounded-md flex flex-col justify-center items-center bg-cover bg-center h-[400px] max-h-[400px] filter grayscale">
                        <div className='my-5 flex flex-wrap gap-3'>
                            {article.tags.map((tagArticle: TagArticleType) => (
                                <Tag key={tagArticle.tag.id} text={tagArticle.tag.name} className="bg-red-400 text-base text-white" />
                            ))}
                        </div>

                        <h1 className='text-2xl'>{article?.title}</h1>
                        <p className='text-sm text-slate-400 my-2'>{formatDate(article.createdAt)}</p>
                    </div>
                    <p className='my-10'>{article?.text}</p>

                    <SectionHeader
                        icon={MessageSquareQuote}
                        text="Commentaires"
                        count={commentsCount}
                    />

                    {article.comments && article?.comments.length > 0 ? (
                        article.comments.map((articleComment: ArticleCommentType) => (
                            <CommentArticle key={articleComment.id} articleComment={articleComment} />
                        ))
                    ) : (
                        <p>Aucun commentaire.</p>
                    )}

                    {/* <AddCommentArticle articleId={article.id} /> */}

                </div>
            )}
        </div>
    )
}

export default ArticleDetailPage