'use client'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { Session } from 'next-auth';

export default function PopoverAvatar({session}: {session: Session}) {
  return (
    <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={session?.user?.image as string} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="bg-orange-400">

                {session ? <Button onClick={() => signOut()}>Log out</Button> : <Button onClick={() => signIn('google', {callbackUrl: "/"})}>Log in</Button>}
              </div>
            </PopoverContent>
          </Popover>
  )
}
