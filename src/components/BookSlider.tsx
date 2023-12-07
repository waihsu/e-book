'use client'
import BookCard from '@/components/BookCard'
import { Author, Books } from '@prisma/client'
import React from 'react'
import { SwiperSlide,Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Autoplay, Pagination, Navigation,EffectCoverflow } from 'swiper/modules';

import 'swiper/css/effect-fade';


export default function BookSlider({books,authors}: {books: Books[],authors: Author[]}) {
  return (
    
    <Swiper  
    
    effect={'coverflow'}
    grabCursor={true}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
    loop={true}
    pagination={{
      clickable: true,
    }}
    // navigation={true}
    modules={[Autoplay,Pagination, Navigation,EffectCoverflow]}
    className="mySwiper flex justify-center items-center"
    breakpoints={{640: {width: 440,slidesPerView: 1},768: {width: 968, slidesPerView: 3}}}  >
      {books.map(item => (
        <SwiperSlide key={item.id} virtualIndex={Number(item.id)}>
            <BookCard book={item}  />
        </SwiperSlide>
        
      ))}
    </Swiper>
    
  )
}
