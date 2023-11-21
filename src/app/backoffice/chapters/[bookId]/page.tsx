import BackofficeLayout from '@/components/BackofficeLayout'
import { Card } from '@/components/ui/card'
import { prisma } from '@/libs/prisma'
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'

export default async function page({params}: {params: {bookId: string}}) {
    const {bookId} = params
    const book = await prisma.books.findFirst({where: {id: bookId}})
    const chapters = await prisma.chapters.findMany({where: {book_id: bookId}})
  return (
    <BackofficeLayout title='Chapters' link={`/backoffice/chapters/${bookId}/create-chapter`} button='create chapter'>
        <div className=' bg-orange-400'>
           <div>
           <Image src={book?.asset_url as string} alt='book Image' width={1000} height={500} />
           
           </div>
            <h1>{book?.title}</h1>
        </div>
        <div className='max-h-96 scrollbar-thin scrollbar-thumb-zinc-700 overflow-y-scroll'>
            {chapters.map(chapter => (
                <Link key={chapter.id} href={`/backoffice/chapters/${bookId}/${chapter.id}`}>
                <Card style={{padding: 20}} >
                    <h3>{chapter.title}</h3>
                </Card>
                </Link>
            ))}
        </div>
        
    </BackofficeLayout>
  )
}
