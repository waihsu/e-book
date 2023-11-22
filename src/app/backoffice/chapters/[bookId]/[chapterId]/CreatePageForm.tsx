"use client";
import { createPage } from "@/app/action";
import FileDropZone from "@/components/FileDropZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/db";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreatePageForm({ chapterId, bookId }: { chapterId: string,bookId: string }) {
  const router = useRouter();
  const [pageImg,setPageImg] = useState<File[]>([]);
  const [page, setPage] = useState({
    chapter_id: chapterId,
    page_number: "",
    asset_url: "",
  });

  const uploadPage = async (selectedFile: File[]) => {
    if (!selectedFile.length) return alert("Please select first Page photo  File");
    const postsRef = ref(storage, `pages/${selectedFile[0].name}`);
    const bookRef = ref(storage, `pages/${selectedFile[0].name}`);
    const bookUrl = await uploadBytes(postsRef, selectedFile[0]);
    const data = await getDownloadURL(bookRef);
    return data;
  };


  async function onSubmit() {
    const asset_url = await uploadPage(pageImg)
    if (!asset_url) return alert("All fields must be fill")
    page.asset_url = asset_url
    await createPage(page);
    router.refresh();
    setPageImg([])
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
        <div className=" mb-4">
        <Label>Select Page jpg file</Label>
        {/* {bookImg.length ? <Image src={bookImg[0].slice}/>} : ""} */}
        <FileDropZone onFileSelected={setPageImg} />
      </div>
        <Button type="submit">Create Page</Button>
      </form>
    </div>
  );
}
