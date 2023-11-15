import { Card } from '@/components/ui/card'
import { prisma } from '@/libs/prisma'
import { CardContent } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default async function Author() {
    const authors = await prisma.author.findMany({orderBy: {name: "asc"}})
    console.log(authors)
  return (
    <div className='flex flex-col gap-3'>
        {authors.map(item => (
            <Link key={item.id} href={`/authors/${item.id}`}>
            <Card className=' dark:bg-slate-700'>
              <p>{item.name}</p>
            </Card>
            </Link>
        ))}
    </div>
  )
}
