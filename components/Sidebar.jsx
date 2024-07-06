"use client";
import { Home, Search, Book, LogOut, PlusIcon, LockIcon } from 'lucide-react';
import MobileNav from './MobileNav';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter, usePathname, redirect } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Button } from './ui/button';

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const type = pathname.split('/')[1];

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
        console.log('No admin')
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

  if (type === 'sign-in') {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 h-full w-64 hidden lg:block'>
      <div className="border h-full flex-col gap-5 p-3 justify-center hidden xl:flex">
        <div className="p-3">
          {/* Logo */}
          <h3 className="text-2xl font-bold">
            <span className="text-green-400">FUO </span>
            Libary
          </h3>
        </div>

        {/* Navigation Menu */}
        <ul className="flex flex-col gap-3">
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
          {/* <li>
            <Link href="/history" className={`w-full cursor-pointer p-2 rounded-sm flex items-center gap-2 ${pathname === '/history' ? 'bg-green-400 text-white' : 'text-gray-900 hover:bg-gray-100 hover:text-black'}`}>
              <Book color={pathname === '/history' ? 'white' : 'green'} size={20} />
              History
            </Link>
          </li> */}

          {userData?.head === true && (
            <li>
              <Link href="/adduser" className={`w-full cursor-pointer p-2 rounded-sm flex items-center gap-2 ${pathname === '/adduser' ? 'bg-green-400 text-white' : 'text-gray-900 hover:bg-gray-100 hover:text-black'}`}>
                <PlusIcon color={pathname === '/adduser' ? 'white' : 'green'} size={20} />
                Add User
              </Link>
            </li>
          )}
        </ul>

        {/* Bottom Nav */}

{/* Login button */}

        {/* Logout button */}
        <div className="mt-auto cursor-pointer flex gap-2 items-center" >

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

        
      </div>

      <div className="hidden lg:flex sm:hidden xl:hidden">
        {/* Mobile Nav */}
        <MobileNav userData={userData}/>
      </div>
    </div>
  );
};

export default Sidebar;
