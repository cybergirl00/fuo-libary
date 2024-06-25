'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const Search = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(collection(db, 'books'));
      setBooks(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })));
    };
    getBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter(book =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.barcode.includes(searchQuery)
      )
    );
  }, [searchQuery, books]);

  return (
    <div className="w-full">
      {/* Search */}
      <div className="w-full p-3 flex gap-2 items-center">
        <Input 
          placeholder="Search here..." 
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="bg-green-400 hover:bg-green-300">Search</Button>
        <Button variant="outline" asChild>
          <Link href={'/scan'}>Scan</Link>
        </Button>
      </div>

      {/* Result */}
      <div className="mt-4">
      <Table>
      <TableCaption>A list available books in the libary</TableCaption>
  <TableHeader>
    <TableRow>
    <TableHead className="w-[100px]">Barcode</TableHead>
      <TableHead className="w-[100px]">Name</TableHead>
      <TableHead>Author</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
          
  <TableBody>
            <TableRow >
              <TableCell className="font-medium">{book.barcode}</TableCell>
              <TableCell
              className="line-clamp-1"
              >{book.name}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell
              className={
                book?.status === 'Unavailable' ? 'text-red-400' : 'text-green-400' 
                           }
              >{book?.status}</TableCell>
              <TableCell>
                <Button variant='outline'>
                  <Link href={'/book/'+ book?.id}>
                  View
                  </Link> </Button>
              </TableCell>
            </TableRow>
  </TableBody>
          ))
        ) : (
          <p>No results found</p>
        )}
        </Table>
      </div>
    </div>
  );
};

export default Search;