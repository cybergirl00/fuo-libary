'use client'

import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const BookDetails = () => {
  const [book, setBook] = useState({})
  const pathname = usePathname().split('/')[2]

  useEffect(() => {
    const getBook = async () => {
      const data = await getDoc(
        doc(db, 'books', pathname))
        setBook(data.data())
    }
    getBook();
  }, [])
  
  return (
    <div className="p-4 flex flex-col gap-7  justify-between">
      <div className="flex flex-col lg:flex-row gap-7">
        <h3 className='text-1xl font-bold'>
          Barcode: {book?.barcode}
        </h3>
       <h3 className='text-1xl font-bold'>
        Name: {book?.name}
       </h3>
       <h3 className='text-1xl font-bold'>
        Author: {book?.author}
       </h3>
      </div>

     <div className=" flex flex-col items-center justify-center gap-7">
      <h3 className='text-2xl font-bold text-gray-900'>Book 
        <span className="text-green-400">  History</span>
        </h3>
        <Table>
  {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Student</TableHead>
      <TableHead>Matric No</TableHead>
      <TableHead>Phone No</TableHead>
      <TableHead className="text-right">Borrowed Date</TableHead>
      <TableHead className="text-right">Returned Date</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>

     </div>


     <div className="flex gap-2 w-full ">
     <Dialog>
  <DialogTrigger>
  <Button className='bg-green-400 hover:bg-green-300'>Assign a student</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Student Information</DialogTitle>
    </DialogHeader>

    <div className="">
      STUDENT DETAILS FORM
    </div>
  </DialogContent>
</Dialog>

      <Button variant='destructive'>Delete Book</Button>
     </div>
    </div>
  )
}

export default BookDetails