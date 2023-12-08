import BackofficeLayout from '@/components/BackofficeLayout'
import { prisma } from '@/libs/prisma'
import React from 'react'
import CreatePageForm from './CreatePageForm'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DeleteDialog from '@/components/DeleteDialog'
import DeleteChapter from './DeleteChapter'
import { Input } from '@/components/ui/input'
import UpdateChpater from './UpdateChpater'
import { Chapters } from '@prisma/client'

export default async function page({params}: {params: {bookId: string,chapterId: string}}) {
    const {bookId,chapterId} = params
    const chapter = await prisma.chapters.findFirst({where:{id: chapterId}}) as Chapters
    const pages = await prisma.pages.findMany({where: {chapter_id: chapterId}})
    const sorted = pages.sort((a,b) => Number(a.page_number.split(" ")[0]) - Number(b.page_number.split(" ")[0]))
  return (
    <BackofficeLayout
      title="Create Pages"
      link={`/backoffice/chapters/${bookId}`}
      button="Back"
    >
      <h1 className=' text-2xl text-center font-bold'>{chapter.title}</h1>
      <div className=' mb-2'>
        <UpdateChpater chapter={chapter} />
      </div>
      <div className="mb-10 flex justify-between">
        <Dialog>
          <DialogTrigger>
            <Button>Create Page</Button>
          </DialogTrigger>
          <DialogContent>
            <CreatePageForm chapterId={chapterId} bookId={bookId} />
          </DialogContent>
        </Dialog>
        <DeleteChapter bookId={bookId} chapterId={chapterId} />
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-3">
        {sorted.map((page) => (
          <Link
            key={page.id}
            href={`/backoffice/chapters/${bookId}/${chapterId}/${page.id}`}
          >
            <Card className="dark:bg-[#36363F] max-w-4xl p-20 snap-center hover:bg-neutral-900 relative">
              <Image
                alt="pageimage"
                src={page.asset_url}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
              <p className=" absolute top-0 right-0 text-4xl text-black">
                {page.page_number}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </BackofficeLayout>
  );
}
