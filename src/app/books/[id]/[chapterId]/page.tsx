import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
          <Card
            key={page.id}
            className="w-full  md:w-[646px] md:h-[990px] px-4 "
          >
            <CardHeader>
              <CardTitle>{page.page_number}</CardTitle>
            </CardHeader>
            
              <Image
                src={page.asset_url}
                alt="pageImage"
                layout="responsive"
                width={0}
                height={0}
                style={{ objectFit: "contain" }}
              />
           
          </Card>
        ))}
      </div>
    </div>
  );
}
