import { Button } from "./ui/button";
import { Book, Home, LogOut, Menu, Search } from 'lucide-react';
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

const Navbar = () => {
  return (
    <div className="flex xl:hidden sm:hidden items-center justify-between p-5 sticky z-10 top-0">
      <div className="">
        <Image
         src='/logo.jpg'
         width={50}
         height={50}
         alt='logo'
         />
      </div>

      <div className="flex gap-2">
        <Button className='bg-green-400 hover:bg-green-300'>
          <Link href={'/addbook'}>Add Books</Link>
        </Button>

        <Sheet>
          <SheetTrigger>
            <Button variant='outline'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-full">
            <ul className="flex flex-col gap-7 p-7 flex-grow">
              <li>
                <Link href='/' className="bg-green-400 text-white w-full cursor-pointer p-1 rounded-sm flex gap-2 items-center text-2xl">
                  <Home color='black' size={20} />
                  Home
                </Link>
              </li>
              <li>
                <Link href={'/search'}
                  className="text-gray-900 font-semibold w-full cursor-pointer p-2 rounded-sm hover:bg-gray-100 hover:text-black flex items-center gap-2 text-2xl">
                  <Search color='green' size={20} />
                  Search
                </Link>
              </li>
              <li className="text-gray-900 font-semibold w-full cursor-pointer p-2 rounded-sm hover:bg-gray-100 hover:text-black flex items-center gap-2 text-2xl">
                <Book color='green' size={20} />
                History
              </li>
            </ul>

            <div className="mt-auto cursor-pointer flex gap-2 items-center p-7">
              <LogOut color='red' size={25} />
              <div className="">
                <h2 className="font-bold">Dikko Rabiat</h2>
                <p className="text-gray-500 text-sm font-light">dikkorabiat25@gmail.com</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navbar;
