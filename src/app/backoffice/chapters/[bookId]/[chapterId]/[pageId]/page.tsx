import { Textarea } from '@/components/ui/textarea'
import { prisma } from '@/libs/prisma'
import React from 'react'
import EditPage from './EditPage'
import { Pages } from '@prisma/client'
import BackofficeLayout from '@/components/BackofficeLayout'

export default async function page({params}:{params: {bookId: string,chapterId:string,pageId: string}}) {
    const {pageId,chapterId,bookId} = params
    const page = await prisma.pages.findFirst({where: {id: pageId}})
  return (
    <BackofficeLayout title='Edit Page' link={`/backoffice/chapters/${bookId}/${chapterId}`} button='Back'>
        <EditPage bookId={bookId} chapterId={chapterId} page={page as Pages} />
    </BackofficeLayout>
  )
}
