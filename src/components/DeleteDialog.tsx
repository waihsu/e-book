'use client'
import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';

export default function DeleteDialog({route,callback}: {route: string,callback: () => void}) {
    const router = useRouter();
    const {toast} = useToast()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button style={{ backgroundColor: "red" }}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure want to delete</DialogTitle>
          <DialogDescription>This can not be undo</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Cancle</Button>
          </DialogClose>
          <DialogClose>
            <Button
              style={{ backgroundColor: "red" }}
              onClick={() => {
                callback()
                router.replace(route);
                router.refresh();
                toast({title: "Deleted  Successful"})
              }}
            >
              {" "}
              Ok
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
