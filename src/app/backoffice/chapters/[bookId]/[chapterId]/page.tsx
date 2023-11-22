import BackofficeLayout from '@/components/BackofficeLayout'
import { prisma } from '@/libs/prisma'
import React from 'react'
import CreatePageForm from './CreatePageForm'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

export default async function page({params}: {params: {bookId: string,chapterId: string}}) {
    const {bookId,chapterId} = params
    const chapter = await prisma.chapters.findFirst({where:{id: chapterId}})
    const pages = await prisma.pages.findMany({where: {chapter_id: chapterId}})
    const sorted = pages.sort((a,b) => Number(a.page_number.split(" ")[0]) - Number(b.page_number.split(" ")[0]))
  return (
    <BackofficeLayout title='Create Pages' link={`/backoffice/chapters/${bookId}`} button='Back'>
      <h1 className=' text-center text-4xl'>{chapter?.title}</h1>
        <div className='mb-10'>
            <CreatePageForm chapterId={chapterId} bookId={bookId} />
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-3'>
          {sorted.map(page => (
            <Link key={page.id} href={`/backoffice/chapters/${bookId}/${chapterId}/${page.id}`}>
            <Card className='dark:bg-[#36363F] max-w-4xl p-20 snap-center hover:bg-neutral-900 relative'>
                <Image alt='pageimage' src={page.asset_url} fill sizes='100vw' style={{objectFit: "cover"}}/>
                <p className=' absolute top-0 right-0 text-4xl text-black'>{page.page_number}</p>
            </Card>
            </Link>
          ))}
        </div>
    </BackofficeLayout>
  )
}
