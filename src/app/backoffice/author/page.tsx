import React from "react";
import { AuthorForm } from "./create-author/Form";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/libs/prisma";
import BackofficeLayout from "@/components/BackofficeLayout";
import Link from "next/link";

export default async function page() {
  const authors = await prisma.author.findMany({where: {is_archived: false}});
  return (
    <BackofficeLayout
      title="Author"
      link="/backoffice/author/create-author"
      button="Create Author">
      <div className="pb-6">
        <Card className="max-h-[400px] dark:bg-[#36363F]  scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-scroll overflow-x-hidden flex flex-wrap justify-center items-center gap-10 py-10">
          {authors.map((item) => (
            <Link key={item.id} href={`/backoffice/author/${item.id}`}>
              <Card className="dark:bg-[#3e3e71] flex justify-center items-center w-32 h-32">
                <CardContent>{item.name}</CardContent>
              </Card>
            </Link>
          ))}
        </Card>
      </div>
    </BackofficeLayout>
  );
}
