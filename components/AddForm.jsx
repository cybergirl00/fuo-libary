"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
const AddForm = ({barcode}) => {

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
              <Input placeholder="barcode" {...field} disabled value={barcode && barcode}
               className='bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important'
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video"
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
          name="barcode"
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
      <Button type="submit"
      className='bg-green-400 hover:bg-green-300'
      >Submit</Button>
    </form>
  </Form>
  </div>
  )
}

export default AddForm