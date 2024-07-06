'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
import { usePathname, useRouter } from "next/navigation";
const Search = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const userId = typeof window !== 'undefined' ? localStorage.getItem('fuo-id') : null;

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

  useEffect(() => {
    if (!userId) {
      if (typeof window !== 'undefined') {
        // router.push('/sign-in');
      }
      return;
    }

    const fetchUser = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('No matching documents.');
          // router.push('/sign-in'); // Redirect if no user found
          return;
        }

        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
          console.log(doc.data());
        });
      } catch (err) {
        console.error('Error getting documents: ', err);
      }
    };

    fetchUser();
  }, [userId, router]);

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
      {userData != null && (
 <TableHead>Action</TableHead>
      )}
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
              {userData != null && (
  <TableCell>
  <Button variant='outline'>
    <Link href={'/book/'+ book?.id}>
    View
    </Link> </Button>
</TableCell>
              )}
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