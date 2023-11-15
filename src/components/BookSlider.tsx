'use client'
import BookCard from '@/components/BookCard'
import { Author, Books } from '@prisma/client'
import React from 'react'
import { SwiperSlide,Swiper } from 'swiper/react'
// import 'swiper/swiper-bundle.css'
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Pagination, Navigation,EffectCoverflow } from 'swiper/modules';

import 'swiper/css/effect-fade';


export default function BookSlider({books,authors}: {books: Books[],authors: Author[]}) {
  return (
    
    <Swiper  
    
    effect={'coverflow'}
    grabCursor={true}
    centeredSlides={true}
        
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
    loop={true}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Pagination, Navigation,EffectCoverflow]}
    className="mySwiper"
    breakpoints={{640: {width: 440,slidesPerView: 1},768: {width: 968, slidesPerView: 4}}}  >
      {books.map(item => (
        <SwiperSlide key={item.id} virtualIndex={item.id}>
            <BookCard book={item} authors={authors}  />
        </SwiperSlide>
        
      ))}
    </Swiper>
    
  )
}
