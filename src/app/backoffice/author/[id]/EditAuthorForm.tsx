"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Author } from "@prisma/client";
import { deleteAuthor, updateAuthor } from "@/app/action";

const formSchema = z.object({
    id: z.number().min(1, {
        message: "Not Valid"
    }),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date_of_birth: z.string().min(1, {
    message: "Please fill",
  }),
  bio_graphy: z.string().min(1, {
    message: "Bigraphy must be at least 2 characters",
  }),
});

export function EditAuthrForm({author}: {author: Author}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        id: author.id, 
      name: author.name,
      date_of_birth: author.date_of_birth,
      bio_graphy: author.bio_graphy,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateAuthor(values)
    console.log("values.name", values.name);
    router.replace("/backoffice/author")
    router.refresh();
  }

  return (
    <div>
        <div className="flex justify-end">
        <Button onClick={() => {
            deleteAuthor(author.id)
            router.replace("/backoffice/author")
            router.refresh()
        }} style={{backgroundColor: 'red'}}>Delete</Button>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Date Of Birth</FormLabel>
              <FormControl>
                <Input placeholder="DateOfbirth" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio_graphy"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Bio Graphy</FormLabel>
              <FormControl>
                <Input placeholder="bio-graphy" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
    </div>
  );
}
