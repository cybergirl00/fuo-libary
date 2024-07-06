"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getDocs, collection } from 'firebase/firestore'
import { db } from "@/lib/firebase"
import { Button } from "./ui/button"
const BookList = ({user}) => {
    const [books, setBooks] = useState([])

    useEffect(() => {
      const getBooks = async () => {
        const data = await getDocs(collection(db, 'books'))
        setBooks(data.docs.map((doc) => ({
          ...doc.data(), id:doc.id
        })))
        console.log(data)
      }
      getBooks();
    }, [])
    
  return (
    <div>
            <Table  >
  {/* <TableCaption>A list available books in the libary</TableCaption> */}
  <TableHeader>
    <TableRow>
    <TableHead className="w-[100px]">Barcode</TableHead>
      <TableHead className="w-[100px]">Name</TableHead>
      <TableHead>Author</TableHead>
      <TableHead>Status</TableHead>
      {user != null && (
        <TableHead>Action</TableHead>
      )}
      
    </TableRow>
  </TableHeader>
  <TableBody>
  {books.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row?.barcode}</TableCell>
              <TableCell
              className="line-clamp-1"
              >{row?.name}</TableCell>
              <TableCell>{row?.author}</TableCell>
              <TableCell
              className={
                row?.status === 'Unavailable' ? 'text-red-400' : 'text-green-400' 
                           }
              >{row?.status}</TableCell>
              {user != null && (
 <TableCell>
 <Button variant='outline'>
   <Link href={'/book/'+ row?.id}>
   View
   </Link>
    </Button>
</TableCell>
              )}
            </TableRow>
          ))}
  </TableBody>
</Table>
    </div>
  )
}

export default BookList