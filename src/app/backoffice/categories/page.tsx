import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { prisma } from "@/libs/prisma";
import React, { useState } from "react";
import { CategoriesForm } from "./create-category/Form";
import BackofficeLayout from "@/components/BackofficeLayout";
import Link from "next/link";

export default async function page() {
  const categories = await prisma.categories.findMany({where: {is_archived: false}});

  return (
    <BackofficeLayout title="Categories" link="/backoffice/categories/create-category" button="Create  Categories">
      
      <div className="py-6">
        <Card className="max-h-[400px] scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-scroll overflow-x-hidden flex flex-wrap justify-center items-center gap-10 py-10">
          {categories.map((item) => (
            <Link key={item.id} href={`/backoffice/categories/${item.id}`}>
            <Card
              className="flex justify-center items-center w-32 h-32">
              <CardContent>{item.name}</CardContent>
            </Card>
            </Link>
          ))}
        </Card>
      </div>
    
    </BackofficeLayout>
  );
}
