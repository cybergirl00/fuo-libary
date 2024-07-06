"use client"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
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
 import { CalendarRangeIcon, Loader2Icon } from 'lucide-react'
 import { format } from "date-fns"
 import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { toast } from "@/components/ui/use-toast"
import { ScrollArea } from "./ui/scroll-area"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useState } from "react"

const formSchema = z.object({
  fullName: z.string(),
  matricNo: z.string(),
  phone: z.string(),
  dateborrowed: z.date(),
  datereturned: z.date(),
  index: z.string(),
})
 

const StudentDetails = ({id, book}) => {
    const [isloading, setisLoading] = useState(false);
    const [isDone, setisDone] = useState(false);
    const [assign, setAssign] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          fullName: "",
          matricNo: "",
          phone: "",
          dateborrowed: "",
          datereturned: "",
          index: ""
        },
      })
     
      // 2. Define a submit handler.
      const onSubmit = async (values) =>  {
        setisLoading(true)
        setAssign(false)
        try {
          await addDoc(collection(db, "borrowed"), {
            fullName: values.fullName,
            index: values.index,
            matricNo: values.matricNo,
            phoneNo: values.phone,
            dateborrowed: values.dateborrowed,
            datereturned: values.datereturned,
            bookId: id
        }).then((res) => {
          setAssign(true);
            setisLoading(false)
            setisDone(true)
            updateDoc(doc(db, 'books', id), {
                status: 'Unavailable'
            }).then((res) => {
            })
        })
        console.log(values)
        } catch (err) {
          console.log(err)
        }
       
      }
  return (
    <ScrollArea className="p-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="index"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book index</FormLabel>
              <FormControl>
                <Input placeholder="Book Index" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Student Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="matricNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matric Number</FormLabel>
              <FormControl>
                <Input placeholder="Student Matric Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Student Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateborrowed"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Borrowed</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarRangeIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="datereturned"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expected Returned Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className='w-full'>Pick a date</span>
                      )}
                      <CalendarRangeIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0" align="start">
                <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      
      {isloading ? (
 <Button disabled className='bg-green-400 hover:bg-green-300'>
 <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
 Please wait...
</Button>
      ) : (
        <div className="">
          {assign === false ? (

             <Button type="submit" className='bg-green-400 hover:bg-green-300'>Submit</Button>
          ) : (
            <h1 className='text-bold text-red-400'>This book has been assigned to a student </h1>
          )
        }
        </div>
        
      )}
      </form>
    </Form>
    </ScrollArea>
  )
}

export default StudentDetails