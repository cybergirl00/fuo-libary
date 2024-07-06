"use client"
import { Button } from "./ui/button";
import { Book, Home, LockIcon, LogOut, Menu, PlusIcon, Search } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const userId = typeof window !== 'undefined' ? localStorage.getItem('fuo-id') : null;

  const handleLogout = async () => {
    await signOut(auth).then((res) => {
      localStorage.clear('fuo-id');
      router.push('/sign-in')
    })
  }

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
    <div className="flex xl:hidden  sm:flex items-center justify-between p-5 sticky  lg:hidden z-10 top-0 bg-white ">
      <div className="">
        <Link href='/'>
        <Image
         src='/logo.jpg'
         width={50}
         height={50}
         alt='logo'
         />
        </Link>
      </div>

      <div className="flex gap-2">
        {userData != null && (
 <Button className='bg-green-400 hover:bg-green-300'>
 <Link href={'/addbook'}>Add Book</Link>
</Button>
        )}

        <Sheet>
          <SheetTrigger>
            <Button variant='outline'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-full">
            <ul className="flex flex-col gap-7 p-7 flex-grow">
            <li>
            <Link href="/" className={`w-full cursor-pointer p-1 rounded-sm flex gap-2 items-center ${pathname === '/' ? 'bg-green-400 text-white' : 'text-gray-900'}`}>
              <Home color={pathname === '/' ? 'white' : 'black'} size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link href="/search" className={`w-full cursor-pointer p-2 rounded-sm flex items-center gap-2 ${pathname === '/search' ? 'bg-green-400 text-white' : 'text-gray-900 hover:bg-gray-100 hover:text-black'}`}>
              <Search color={pathname === '/search' ? 'white' : 'green'} size={20} />
              Search
            </Link>
          </li>

          {userData?.head === true && (
            <li>
              <Link href="/adduser" className={`w-full cursor-pointer p-2 rounded-sm flex items-center gap-2 ${pathname === '/adduser' ? 'bg-green-400 text-white' : 'text-gray-900 hover:bg-gray-100 hover:text-black'}`}>
                <PlusIcon color={pathname === '/adduser' ? 'white' : 'green'} size={20} />
                Add User
              </Link>
            </li>
          )}
            </ul>

            <div className="mt-auto cursor-pointer flex gap-2 items-center p-7"  >
              {userData === null ? (
          <Button className='bg-green-400  flex gap-2 items-center justify-center hover:bg-green-300' asChild>
            <Link href={'/sign-in'}>
            <LockIcon color="black" size={17} />
            Login as Admin
            </Link>
            </Button>
        ) : (
          <div className=""
          onClick={handleLogout}>
{/* Avatar */}
<LogOut color="red" size={25} />
          <div>
            <h2 className="font-bold">{userData?.name}</h2>
            <p className="text-gray-500 text-sm font-light">{userData?.email}</p>
          </div>
          </div>
        )
      }
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navbar;
