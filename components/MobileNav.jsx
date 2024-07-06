"use client"
import Image from "next/image"
import Link from "next/link"
import { Home, Search, Book, LogOut, PlusIcon, LockIcon } from 'lucide-react'
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
const MobileNav = ({userData}) => {
  const router = useRouter();
    const pathname = usePathname();
    const handleLogout = async () => {
      await signOut(auth).then((res) => {
        localStorage.clear('fuo-id');
        router.push('/sign-in')
      })
    }
  return (
    <div className="">
    <div className="border h-screen">
          <Link href={'/'}>
                    <Image
                    src={'/logo.jpg'}
                    width={100}
                    height={80}
                     />
                </Link>


                <ul className="flex flex-col gap-3 pt-4  w-full items-center p-5">
          <li>
            <Link href="/" className={`w-full cursor-pointer p-1 rounded-sm flex gap-2 items-center ${pathname === '/' ? 'bg-green-400 text-white' : 'text-gray-900'}`}>
              <Home color={pathname === '/' ? 'white' : 'black'} size={30} />
            </Link>
          </li>
          <li>
            <Link href="/search"
             className={`hover:bg-gray-100 rounded-sm  flex flex-col items-center  cursor-pointer p-2 ${pathname === '/search' ? 'bg-green-400 text-white' : 'text-gray-900 hover:bg-gray-100 hover:text-black'}`}
            >
              <Search color={pathname === '/search' ? 'white' : 'green'} size={30} />
            </Link>
          </li>
          {/* <li>
            <Link href="/history" className={`hover:bg-gray-100 rounded-sm  flex flex-col items-center  cursor-pointer p-2 ${pathname === '/history' ? 'bg-green-400 text-white' : 'text-gray-900 hover:bg-gray-100 hover:text-black'}`}>
              <Book color={pathname === '/history' ? 'white' : 'green'} size={30} />
            </Link>
          </li> */}

          {userData?.head === true && (
            <li className="hover:bg-gray-100 rounded-sm  flex flex-col items-center  cursor-pointer p-2">
              <Link href="/adduser" className={`w-full cursor-pointer p-2 rounded-sm flex items-center gap-2 ${pathname === '/adduser' ? 'bg-green-400 text-white' : 'text-gray-900 hover:bg-gray-100 hover:text-black'}`}>
                <PlusIcon color={pathname === '/adduser' ? 'white' : 'green'} size={20} />
              </Link>
            </li>
          )}
        
{userData === null ? 
  <li className="hover:bg-gray-100 rounded-sm  flex flex-col items-center  cursor-pointer p-2">
    <Link href='/sign-in'>
    <LockIcon color='green' size={25} />
    </Link>
                
            </li>
: 
<li className="hover:bg-gray-100 rounded-sm  flex flex-col items-center  cursor-pointer p-2"
onClick={handleLogout}
>
                <LogOut color='red' size={25} />
            </li>
}

        </ul>
     
        </div>
    </div>
  )
}

export default MobileNav