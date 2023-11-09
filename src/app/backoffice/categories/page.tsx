import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { prisma } from "@/libs/prisma";
import React, { useState } from "react";
import { CategoriesForm } from "./Form";

export default async function page() {
  const categories = await prisma.categories.findMany();

  return (
    <div className=" px-8">
      <div className="p-4">
        <CategoriesForm />
      </div>
      <div className="pb-6">
        <Card className="max-h-[400px] overflow-scroll overflow-x-hidden flex flex-wrap justify-center items-center gap-10 py-10">
          {categories.map((item) => (
            <Card
              key={item.id}
              className="flex justify-center items-center w-32 h-32">
              <CardContent>{item.name}</CardContent>
            </Card>
          ))}
        </Card>
      </div>
    </div>
  );
}
