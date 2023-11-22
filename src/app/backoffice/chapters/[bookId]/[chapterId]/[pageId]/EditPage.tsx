"use client";
import { deletePage, updatePage } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pages } from "@prisma/client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileDropZone from "@/components/FileDropZone";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/db";

export default function EditPage({
  page,
  bookId,
  chapterId,
}: {
  page: Pages;
  bookId: string;
  chapterId: string;
}) {
  const router = useRouter();
  const [pageImg, setPageImg] = useState<File[]>([]);
  const [editPage, setEditPage] = useState(page);
  const [isLoading, setIsLoading] = useState(false);


  const uploadPage = async (selectedFile: File[]) => {
    if (!selectedFile.length) return alert("Please select first Page photo  File");
    const postsRef = ref(storage, `pages/${selectedFile[0].name}`);
    const bookRef = ref(storage, `pages/${selectedFile[0].name}`);
    const bookUrl = await uploadBytes(postsRef, selectedFile[0]);
    const data = await getDownloadURL(bookRef);
    return data;
  };


  const onSubmit = async () => {
    
    const asset_url = await uploadPage(pageImg)
    if (asset_url) {
      editPage.asset_url = String(asset_url)
    await updatePage(editPage);
    
    router.push(`/backoffice/chapters/${bookId}/${chapterId}`);
    router.refresh()
    }else {
      await updatePage(editPage)
      router.push(`/backoffice/chapters/${bookId}/${chapterId}`);
      router.refresh()
    }
    
  };
  const onDelete = async () => {
    await deletePage(page.id);
    router.push(`/backoffice/chapters/${bookId}/${chapterId}`);
    router.refresh()
  };
  console.log(pageImg)
  return (
    <div>
      <div>
        <Dialog>
          <DialogTrigger asChild className=" justify-end">
            <Button variant="outline" className=" bg-red-600">Delete</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Are You Sure Want To Delete?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose>
                <Button>Cancle</Button>
              </DialogClose>
              <Button onClick={onDelete} variant={"destructive"}>
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <form action={onSubmit} className=" flex flex-col gap-6">
        <div>
          <Label>Page Number</Label>
          <Input
            defaultValue={page.page_number}
            onChange={(e) =>
              setEditPage({ ...editPage, page_number: e.target.value })
            }
          />
        </div>
       <div>
       <FileDropZone onFileSelected={setPageImg} />
       </div>

      <div>
      <Button type="submit">Submit</Button>

      </div>
      </form>
    </div>
  );
}
