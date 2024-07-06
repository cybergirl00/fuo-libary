"use client"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addDoc, collection } from 'firebase/firestore'
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
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { Loader } from 'lucide-react'
import { useState } from "react"

const formSchema = z.object({
 barcode: z.string(),
 name: z.string(),
 author: z.string(),
})
 

const AddForm = ({isbn}) => {

  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barcode: "",
      name: "",
      author: "",
    },
  })
 
  // 2. Define a submit handler.
 const  onSubmit = async (values) => {
 try {
  setIsLoading(true);
     await addDoc(collection(db, 'books'), {
      name: values.name,
      barcode: isbn,
      author: values.author,
      status: 'Available'
     }).then((res) => {
      router.push('/')
      toast({
        title: "Successful",
        description: `Book ${isbn} has been added successfully`,
      })
      setIsLoading(false);
     })
  
 } catch (error) {
  console.log(error)
 }
    console.log(values)
  }

  return (
    <div className="p-5">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <div className="flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="barcode"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Barcode</FormLabel>
              <FormControl>
              <Input placeholder="barcode" {...field} disabled value={isbn && isbn}
               className='bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important'
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Book Name</FormLabel>
              <FormControl>
              <Input placeholder="Book name.." {...field}  
               className='bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important'
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         </div>

         <div className="flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Author</FormLabel>
              <FormControl>
              <Input placeholder="Author name..." {...field} 
               className='bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important'
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
         </div>
         {!isLoading ? (
          <Button type="submit" 
      className='bg-green-400 hover:bg-green-300'
      >Submit</Button>
         )  : (
          <Button type="submit" 
      className='bg-green-400 hover:bg-green-300'
      disabled
      >
        <Loader className="mr-2 h-4 w-4 animate-spin" />
        Submiting...</Button>
         )
        }
    </form>
  </Form>
  </div>
  )
}

export default AddForm