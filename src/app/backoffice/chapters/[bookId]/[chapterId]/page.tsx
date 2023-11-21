import BackofficeLayout from '@/components/BackofficeLayout'
import { prisma } from '@/libs/prisma'
import React from 'react'
import CreatePageForm from './CreatePageForm'
import { Card } from '@/components/ui/card'

export default async function page({params}: {params: {bookId: string,chapterId: string}}) {
    const {bookId,chapterId} = params
    const pages = await prisma.pages.findMany({where: {chapter_id: chapterId}})
  return (
    <BackofficeLayout title='Pages' link={`/backoffice/chapters/${bookId}`} button='Back'>
        <div className='mb-10'>
            <CreatePageForm chapterId={chapterId} />
        </div>
        <div className=' w-full flex flex-col justify-center items-center'>
          {pages.map(page => (
            <Card key={page.id} className='dark:bg-[#36363F] max-w-4xl p-20 snap-center'>
                <h4 className=' text-right mb-4'>Page {page.page_number}</h4>
              <p>{page.body}</p>
            </Card>
          ))}
        </div>
    </BackofficeLayout>
  )
}
