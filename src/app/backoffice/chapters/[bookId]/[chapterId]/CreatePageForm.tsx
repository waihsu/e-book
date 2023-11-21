"use client";
import { createPage } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreatePageForm({ chapterId }: { chapterId: string }) {
  const router = useRouter();
  const [page, setPage] = useState({
    chapter_id: chapterId,
    page_number: "",
    body: "",
  });
  async function onSubmit() {
    await createPage(page);
    router.refresh();
  }

  return (
    <div>
      <form action={onSubmit}>
        <div>
          <Label>Page Number</Label>
          <Input
            placeholder="Please Write Page Number"
            onChange={(e) => setPage({ ...page, page_number: e.target.value })}
          />
        </div>
        <div className=" h-52 mb-4">
          <Label>Write One Page</Label>
          <Textarea
            className=" w-full min-h-[200px] overflow-y-scroll scrollbar-thin"
            placeholder="Paragraph"
            onChange={(e) => setPage({ ...page, body: e.target.value })}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
