import { prisma } from "@/libs/prisma";
import BookSlider from "@/components/BookSlider";
import Link from "next/link";

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
      <div className=" flex flex-col justify-center items-center mb-48">
        <h3 className=" text-6xl font-bold text-center mb-6">
          Myanmar <span className="text-[#9F9FA5]">E-Book Free</span> <br />
          <span className="text-center text-[#BDE673]">&</span>
          <br />{" "}
          <span className="text-[#9F9FA5]">
            Premium <span className="">Download</span>
          </span>{" "}
        </h3>
        <p className=" max-w-xl text-[#9F9FA5]">Welcome to our comprehensive e-book library, where the digital realm meets the boundless landscape of knowledge. We have curated an extensive collection of e-books spanning diverse genres, subjects, and cultures, providing you with an enriching and immersive reading experience.</p>
      </div>

      <div className=" h-[700px] mx-auto mb-56 p-8">
        <h4 className=" text-center text-lg sm:text-7xl  mb-20">
          LATEST{" "}
          <span
            style={{
              clipPath:
                "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
            }}
            className="bg-[#BDE673] text-[#9F9FA5] px-8 py-2">
            BOOKS
          </span>
        </h4>
        <BookSlider books={latestBooks} authors={authors} />
      </div>

      <div className="mx-auto mb-56 p-8 shadow-lg">
        <h4 className=" text-center text-lg sm:text-7xl mb-20">
          FREE{" "}
          <span
            style={{
              clipPath:
                "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
            }}
            className="bg-[#BDE673] text-[#9F9FA5] px-8 py-2">
            BOOKS
          </span>
        </h4>
        <Link href={"/books/free-books"}>
          <p className="mb-2 underline">See All</p>
        </Link>
        <BookSlider books={freeBooks} authors={authors} />
      </div>

      <div className="mx-auto mb-56 p-8 shadow-lg">
        <h4 className=" text-center text-lg sm:text-7xl mb-20">
          PREMIUM{" "}
          <span
            style={{
              clipPath:
                "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
            }}
            className="bg-[#BDE673] text-[#9F9FA5] px-8 py-2">
            BOOKS
          </span>
        </h4>
        <Link href={"/books/premium-books"}>
          <p className="mb-2 underline">See All</p>
        </Link>
        <BookSlider books={premiumBooks} authors={authors} />
      </div>
    </>
  );
}
