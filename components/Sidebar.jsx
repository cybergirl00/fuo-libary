import { Home, Search, Book, LogOut } from 'lucide-react'
import MobileNav from './MobileNav'
import Link from 'next/link'
const Sidebar = () => {
    return (
        <div>
        <div className="border h-screen flex-col gap-5 p-3 justify-center hidden xl:flex sticky">
            <div className="p-3">
                {/* Logo */}
           <h3 className="text-2xl font-bold ">
            <span className="text-green-400">FUO </span>
             Libary</h3>
            </div>

            {/* Navigation Menu */}
            <ul className="flex flex-col gap-3 ">
                <li
                 
                >
                    <Link href='/' className="bg-green-400 text-white w-full cursor-pointer p-1 rounded-sm flex gap-2 items-center ">
                    <Home color='black' size={20} />
                    Home
                    </Link>
                    </li>
                <li  
                >
                    <Link href={'/search'}
                    className=" text-gray-900 font-semibold w-full cursor-pointer p-2 rounded-sm hover:bg-gray-100 hover:text-black flex items-center gap-2"
                    >
                    <Search color='green' size={20} />
                    Search
                    </Link>
                    </li>
                <li  className=" text-gray-900 font-semibold w-full cursor-pointer p-2 rounded-sm hover:bg-gray-100 hover:text-black flex items-center gap-2">
                <Book color='green' size={20} />
                    History</li>
                <li></li>
            </ul>


{/* Botton Nav */}
            <div className="mt-auto  cursor-pointer flex  gap-2 items-center">
                {/* Avatar */}
                <LogOut color='red' size={25} />
                <div className="">
                <h2 className="font-bold">Dikko Rabiat</h2>
                <p className="text-gray-500 text-sm font-light">dikkorabiat25@gmail.com</p>
                </div>
            </div>

            
        </div>

<div className="hidden sm:flex xl:hidden ">
        {/* Mobile Nav */}
        <MobileNav />
        </div>


        </div>
    )
}

export default Sidebar