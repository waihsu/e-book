import BookCard from '@/components/BookCard'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/libs/prisma'
import { Autocomplete, CardContent, TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsFillCalendar2XFill } from 'react-icons/bs'
import SearchBooks from './SearchBooks'

export default async function page({params}: {params: {id: number}}) {
    const {id} = params
    const author = await prisma.author.findFirst({where: {id: Number(id)}})
    const books = await prisma.books.findMany({where: {author_id: Number(id)}})
    console.log(books)
  return (
    <div>
        <Card className=' bg-transparent'>
            <CardHeader>Name: {author?.name}</CardHeader>
            <CardContent>
                Date Of Birth: {author?.date_of_birth}
            </CardContent>
            <CardContent>
                Bio Graphy: {author?.bio_graphy}
            </CardContent>
        </Card>
        <div className='flex justify-center py-10'><SearchBooks books={books} /></div>
        <div className='grid grid-cols-1 sm:grid-cols-2 py-5'>
            
            {books.map(item => (
                <Card key={item.id} className='flex flex-wrap justify-center items-center w-full sm:w-[300px] md:w-[500px]  mx-auto'>
                <div className='w-1/2 flex justify-center items-center p-2 h-full'>
                  <Image src={item.asset_url} alt='bookImage'  width={200} height={0} />
                </div>
                <div className=' w-1/2 text-left'>
                <CardHeader>
                  <CardTitle className='text-sm sm:text-lg md:text-3xl mb-4'>{item.title}</CardTitle>
                  <CardDescription className='text-xs sm:text-sm md:text-lg'>Author: {author?.name}</CardDescription>
                </CardHeader>
                <CardContent className='text-xs sm:text-sm md:text-2xl'>
                  <p>Price: {item.price === "0" ? "Free" : item.price}</p>
                  <p className='items-center gap-2 hidden sm:flex'><BsFillCalendar2XFill />:<span className='text-sm'>{item.createdAt.toUTCString()}</span></p>
                </CardContent>
                
                <CardFooter>
                  <Link href={item.book_url}><Button>Download</Button></Link>
                </CardFooter>
                </div>
              </Card>
            ))}
        </div>
    </div>
  )
}
