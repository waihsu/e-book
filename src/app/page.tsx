import { Swiper, SwiperSlide } from "swiper/react";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/libs/prisma";
import BookSlider from "@/components/BookSlider";

export default async function Home() {
  const authors = await prisma.author.findMany();

  const latestBooks = await prisma.books.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const freeBooks = await prisma.books.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    where: { is_premium: false },
  });

  const premiumBooks = await prisma.books.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    where: { is_premium: true },
  });

  return (
    <>
      <div className="h-[400px] flex justify-center items-center mb-48">
        <h3 className=" text-6xl font-bold text-center">
          Myanmar <span className="text-[#9F9FA5]">E-Book Free</span> <br />
          <span className="text-center text-[#BDE673]">&</span>
          <br />{" "}
          <span className="text-[#9F9FA5]">
            Premium <span className="text-white">Download</span>
          </span>{" "}
        </h3>
      </div>

      <div className="mx-auto mb-56 p-8 shadow-lg ">
        <h4 className=" text-center text-7xl  mb-20">LATEST BOOKS</h4>
        <BookSlider books={latestBooks} authors={authors} />
      </div>

      <div className="mx-auto mb-56 p-8 shadow-lg">
        <h4 className=" text-center text-7xl mb-20">FREE BOOKS</h4>
        <BookSlider books={freeBooks} authors={authors} />
      </div>

      <div className="mx-auto mb-56 p-8 shadow-lg">
        <h4 className=" text-center text-7xl mb-20">PREMIUM BOOKS</h4>
        <BookSlider books={premiumBooks} authors={authors} />
      </div>
    </>
  );
}
