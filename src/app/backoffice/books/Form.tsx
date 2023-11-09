"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/db";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { createBook } from "@/app/action";
import { Author } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TextField } from "@mui/material";

interface newBook {
  title: string;
  asset_url: string;
  book_url: string;
  price: string;
  is_premium: boolean;
  author_id: number;
  categories_id: number;
}

export function BookForm({authors}: {authors: Author[]}) {
  const router = useRouter();

  const [book, setBook] = useState({
    title: "",
    asset_url: "",
    book_url: "",
    price: "",
    is_premium: false,
    author_id: "",
    categories_id: "",
  });
  const [open, setOpen] = useState(false)
  const [bookImg, setBookImg] = useState<File[]>([]);
  const [bookFile, setBookFile] = useState<File[]>([]);
  const [is_premium, setIsPremium] = useState(false);

  const uploadBookImage = async (selectedFile: File[]) => {
    if (!selectedFile.length) return alert("Please select first book image");
    const postsRef = ref(storage, `images/${selectedFile[0].name}`);
    const bookRef = ref(storage, `images/${selectedFile[0].name}`);
    const bookUrl = await uploadBytes(postsRef, selectedFile[0]);
    const data = await getDownloadURL(bookRef);
    return data;
  };

  const uploadBookFile = async (selectedFile: File[]) => {
    if (!selectedFile.length) return alert("Please select first book PDF File");
    const postsRef = ref(storage, `books/${selectedFile[0].name}`);
    const bookRef = ref(storage, `books/${selectedFile[0].name}`);
    const bookUrl = await uploadBytes(postsRef, selectedFile[0]);
    const data = await getDownloadURL(bookRef);
    return data;
  };

  async function onSubmit() {
    const bookImgUrl = await uploadBookImage(bookImg);
    const bookFileUrl = await uploadBookFile(bookFile);
    if (!bookImgUrl || !bookFileUrl) return alert("all fields must be fill")
   if (bookImgUrl && bookFileUrl) {
    book.asset_url = bookImgUrl as string;
    book.book_url = bookFileUrl as string;
    book.is_premium = is_premium;
    // createBook(book)
   console.log(book)
    router.refresh();
   }
  }

  return (
    <form action={onSubmit} className="space-y-6">
     
     <Autocomplete
      
      id="combo-box-demo"
      options={authors}
      sx={{ width: 300 }}
      onChange={(option,value) => setBook({...book,author_id: String(value?.id )})}
      getOptionLabel={(option) => option.name}
      // renderOption={(props, option) => (
      //   <div key={option.id}>
      //       <p>{option.name}</p>
      //   </div>
      // )}
      renderInput={(params) => (

        <TextField
          {...params}
          id="author"
        />
      )}
      
    />

     
      <div>
        <Label>Title</Label>
        <Input placeholder="Title" type="text" />
      </div>
      <div>
        <Label>Price</Label>
        <Input placeholder="Price" type="text" />
      </div>
      <div>
        <Label>Is Premium</Label>
        <Switch
          checked={is_premium}
          onCheckedChange={() => setIsPremium(!is_premium)}
        />
      </div>
      <div>
        <Label>Select Book Photo</Label>
        {/* {bookImg.length ? <Image src={bookImg[0].slice}/>} : ""} */}
        <Input
          type="file"
          onChange={(e) => e.target.files && setBookImg([e.target.files[0]])}
        />
      </div>
      <div>
        <Label>Select Book File</Label>
        <Input
          type="file"
          onChange={(e) => e.target.files && setBookFile([e.target.files[0]])}
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}
