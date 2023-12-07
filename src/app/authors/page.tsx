import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/libs/prisma'
import { CardContent } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default async function Author() {
    const authors = await prisma.author.findMany({orderBy: {name: "asc"}})
  return (
    <div className='flex flex-col gap-3'>
        {authors.map(item => (
            <Link key={item.id} href={`/authors/${item.id}`}>
            <Card className=' dark:bg-slate-700'>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
            </Card>
            </Link>
        ))}
    </div>
  )
}
