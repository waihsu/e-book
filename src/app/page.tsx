
import { Swiper, SwiperSlide } from 'swiper/react';
import BookCard from '@/components/BookCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/libs/prisma'
import BookSlider from '@/components/BookSlider';





export default async function Home() {

  const authors = await prisma.author.findMany()

  const latestBooks = await prisma.books.findMany({
    take: 10,
    orderBy: {createdAt: "desc"}})

  const freeBooks = await prisma.books.findMany({
    take: 10,
    orderBy: {createdAt: "desc"},
    where: {is_premium: false}
  })

  const premiumBooks = await prisma.books.findMany({
    take: 10,
    orderBy: {createdAt: "desc"},
    where: {is_premium: true}
  })

  


  return (
    <>
    <div className=' h-96 flex items-center justify-center'>
      <h3 className=' text-6xl font-bold'>Myanmar E-Book Free & Premium Download </h3>
    </div>
    <h4 className=' text-center text-5xl font-semibold mb-20'>Latest Books</h4>
    <div className='md:w-[700px] lg:w-[1100px] h-[500px]  mx-auto mb-4'>
      <BookSlider books={latestBooks} authors={authors} />
    </div>
    <h4 className=' text-center text-5xl font-semibold mb-20'>Free Books</h4>
    <div className='md:w-[700px] lg:w-[1100px] h-[500px] mx-auto mb-4'>
      <BookSlider books={freeBooks} authors={authors} />
    </div>
    <h4 className=' text-center text-5xl font-semibold mb-20'>Premium Books</h4>
    <div className='md:w-[700px] lg:w-[1100px] h-[500px] mx-auto'>
      <BookSlider books={premiumBooks} authors={authors}/>
    </div>
    </>
  )
}
