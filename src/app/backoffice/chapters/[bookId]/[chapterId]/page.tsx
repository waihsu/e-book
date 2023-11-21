import BackofficeLayout from '@/components/BackofficeLayout'
import { prisma } from '@/libs/prisma'
import React from 'react'
import CreatePageForm from './CreatePageForm'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default async function page({params}: {params: {bookId: string,chapterId: string}}) {
    const {bookId,chapterId} = params
    const pages = await prisma.pages.findMany({where: {chapter_id: chapterId}})
    const sorted = pages.sort((a,b) => Number(a.page_number.split(" ")[0]) - Number(b.page_number.split(" ")[0]))
  return (
    <BackofficeLayout title='Create Pages' link={`/backoffice/chapters/${bookId}`} button='Back'>
        <div className='mb-10'>
            <CreatePageForm chapterId={chapterId} />
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-3'>
          {sorted.map(page => (
            <Link key={page.id} href={`/backoffice/chapters/${bookId}/${chapterId}/${page.id}`}>
            <Card className='dark:bg-[#36363F] max-w-4xl p-20 snap-center hover:bg-neutral-900'>
                <h4 className=' text-center'>Page {page.page_number}</h4>
              
            </Card>
            </Link>
          ))}
        </div>
    </BackofficeLayout>
  )
}
