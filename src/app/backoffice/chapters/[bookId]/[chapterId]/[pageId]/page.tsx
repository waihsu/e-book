import { Textarea } from '@/components/ui/textarea'
import { prisma } from '@/libs/prisma'
import React from 'react'
import EditPage from './EditPage'
import { Pages } from '@prisma/client'

export default async function page({params}:{params: {bookId: string,chapterId:string,pageId: string}}) {
    const {pageId,chapterId,bookId} = params
    const page = await prisma.pages.findFirst({where: {id: pageId}})
  return (
    <div>
        <EditPage bookId={bookId} chapterId={chapterId} page={page as Pages} />
    </div>
  )
}
