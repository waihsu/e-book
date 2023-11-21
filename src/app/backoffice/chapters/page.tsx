import React from 'react'
import { prisma } from '@/libs/prisma'
import { Card, CardContent } from '@/components/ui/card'
import BackofficeLayout from '@/components/BackofficeLayout'
import Link from 'next/link'

export default async function page() {

  const books = await prisma.books.findMany()

  return (
    <BackofficeLayout title='Select Book To Create Chapters'link='' >
      <div className="py-6">
        <Card className="max-h-[400px] scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-scroll overflow-x-hidden flex flex-wrap justify-center items-center gap-10 py-10">
          {books.map((item) => (
            <Link key={item.id} href={`/backoffice/chapters/${item.id}`}>
            <Card
              className="flex justify-center items-center w-32 h-32">
              <CardContent>{item.title}</CardContent>
            </Card>
            </Link>
          ))}
        </Card>
      </div>
    </BackofficeLayout>
  )
}
