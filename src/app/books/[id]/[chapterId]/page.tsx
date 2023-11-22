import { Card } from "@/components/ui/card";
import { prisma } from "@/libs/prisma";
import Image from "next/image";
import React from "react";

export default async function page({
  params,
}: {
  params: { chapterId: string };
}) {
  const { chapterId } = params;
  const chapter = await prisma.chapters.findFirst({ where: { id: chapterId } });
  const pages = await prisma.pages.findMany({
    where: { chapter_id: chapterId },
  });
  return (
    <div>
      <h1 className="text-3xl text-orange-300 text-center mb-10">
        {chapter?.title}
      </h1>
      <div className=" w-full flex flex-col justify-center items-center">
        {pages.map((page) => (
          <Card key={page.id} className="w-full md:w-[646px] md:h-[970px] relative">
            {/* <h4 className=' text-right mb-4'>Page {page.page_number}</h4>
              <p>{page.body}</p> */}
            <Image
              src={page.asset_url}
              alt="pageimage"
              layout="responsive"
              width={0}
              height={0}
              className=" w-full h-full"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
