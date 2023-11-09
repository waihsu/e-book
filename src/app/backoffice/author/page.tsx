import React from 'react'
import { AuthorForm } from './Form'
import { Card, CardContent } from '@/components/ui/card'
import { prisma } from '@/libs/prisma'

export default async function page() {
  const authors = await prisma.author.findMany()
  return (
    <div>
      <div className='p-4'>
      <AuthorForm />
      </div>
      <div className="pb-6">
        <Card className="max-h-[400px] overflow-scroll overflow-x-hidden flex flex-wrap justify-center items-center gap-10 py-10">
          {authors.map((item) => (
            <Card
              key={item.id}
              className="flex justify-center items-center w-32 h-32">
              <CardContent>{item.name}</CardContent>
            </Card>
          ))}
        </Card>
      </div>
    </div>
  )
}
