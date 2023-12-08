import BackofficeLayout from "@/components/BackofficeLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { prisma } from "@/libs/prisma";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import ChapterForm from "./create-chapter/ChapterForm";

export default async function page({ params }: { params: { bookId: string } }) {
  const { bookId } = params;
  const book = await prisma.books.findFirst({ where: { id: bookId } });
  const chapters = await prisma.chapters.findMany({
    where: { book_id: bookId },
  });
  return (
    <BackofficeLayout
      title="Chapters"
      link={`/backoffice/chapters`}
      button="Back">
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>Create Chapter</Button>
            </DialogTrigger>
            <DialogContent>
              <ChapterForm bookId={bookId} />
            </DialogContent>
          </Dialog>
        </div>
      <div className=" mb-10">
        <Card className=" relative h-96">
          <Image
            src={book?.asset_url as string}
            alt="bookImage"
            quality={100}
            sizes="100vw"
            fill
            style={{ objectFit: "cover" }}
          />
        </Card>
        <h1>{book?.title}</h1>
      </div>
      <div className="max-h-96 scrollbar-thin scrollbar-thumb-zinc-700 overflow-y-scroll">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/backoffice/chapters/${bookId}/${chapter.id}`}>
            <Card style={{ padding: 20 }}>
              <h3>{chapter.title}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </BackofficeLayout>
  );
}
