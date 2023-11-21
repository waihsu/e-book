"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useRouter } from 'next/navigation'
import { Categories } from "@prisma/client"
import { deleteCategory, updateCategory } from "@/app/action"

const formSchema = z.object({
    id: z.string().min(1, {
        message: "Not Valid"
    }),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function EditCategoryForm({category}: {category: Categories}) {
    
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: category.id,
          name: category.name,
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        updateCategory(values)
        console.log(values)
        router.replace("/backoffice/categories")
        router.refresh()
      }

  return (
    <div>
        <div className="flex justify-end">
        <Button onClick={() => {
            deleteCategory(category.id)
            router.replace("/backoffice/categories")
            router.refresh()
        }} style={{backgroundColor: 'red'}}>Delete</Button>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }: {field: any}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
    </div>
  )
}
