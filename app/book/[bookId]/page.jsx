'use client'

import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, query, updateDoc, where, orderBy } from "firebase/firestore"
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
import StudentDetails from "@/components/StudentDetails"
import Image from "next/image"
import { useRouter } from 'next/navigation'

const BookDetails = () => {
  const router = useRouter()
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [book, setBook] = useState({})
  const pathname = usePathname().split('/')[2]

  const convertTimestampToDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return date.toLocaleDateString("en-US");
  };

  useEffect(() => {
    const getBook = async () => {
      const data = await getDoc(
        doc(db, 'books', pathname))
        setBook(data.data())
    }
    getBook();
  }, [])

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const q = query(collection(db, "borrowed"), where("bookId", "==", pathname)
        
      );
        const querySnapshot = await getDocs(q);
        const books = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(books)
        setBorrowedBooks(books);
      } catch (error) {
        console.error("Error fetching borrowed books: ", error);
      }
    };

    fetchBorrowedBooks();
  }, [pathname]);

  const returnBook = async () => {
    await updateDoc(doc(db, 'books', pathname), {
      status: 'Available'
    }).then(() => {
      router.back();
    })
  }
  
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

        {borrowedBooks?.length > 0 ? (
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
    {borrowedBooks.map((books) => (
   <TableRow>
   <TableCell className="font-medium">{books.fullName}</TableCell>
   <TableCell>{books.matricNo}</TableCell>
   <TableCell>{books.phoneNo}</TableCell>
   <TableCell className="text-right">{convertTimestampToDate(books.dateborrowed)}</TableCell>
   <TableCell className="text-right">{convertTimestampToDate(books.datereturned)}</TableCell>
 </TableRow>
    )) }
  </TableBody>

</Table>

) : (
  <div className="flex flex-col items-center justify-center">
    <Image
     src={'/empty.jpg'}
     width={400}
     height={400}
     alt='empty'
     />
     <h3 className="text-2xl font-bold">Record is Empty</h3>
  </div>
)}

     </div>


     <div className="flex gap-2 w-full ">
      {book?.status === 'Available' ? (
  <Dialog >
  <DialogTrigger>
  <Button className='bg-green-400 hover:bg-green-300'>Assign a student</Button>
  </DialogTrigger>
  <DialogContent className=''>
    <DialogHeader>
      <DialogTitle>Student Information</DialogTitle>
    </DialogHeader>

    <div className="">
     <StudentDetails id={pathname}/>
    </div>
  </DialogContent>
</Dialog>
      ) : (
        <Button variant='outline'
        onClick={returnBook}
        >Book Returned</Button>
      )}


      <Button variant='destructive'>Delete Book</Button>
     </div>
    </div>
  )
}

export default BookDetails