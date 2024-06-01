import Image from "next/image"
import Link from "next/link"
import { Home, Search, Book, LogOut } from 'lucide-react'
const MobileNav = () => {
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
        <ul className="flex flex-col gap-3 pt-4  w-full">
            <li className="bg-green-400 rounded-sm text-white flex flex-col items-center  cursor-pointer p-2">
                <Home  size={30}/>
            </li>
            <li className="hover:bg-gray-100 rounded-sm text-green-400 flex flex-col items-center  cursor-pointer p-2">
                <Search  size={30}/>
            </li>
            <li className="hover:bg-gray-100 rounded-sm text-green-400 flex flex-col items-center  cursor-pointer p-2">
                <Book  size={30}/>
            </li>
            <li className="hover:bg-gray-100 rounded-sm  flex flex-col items-center  cursor-pointer p-2">
                {/* Avatar */}
                <LogOut color='red' size={25} />
            </li>
        </ul>
     
        </div>
    </div>
  )
}

export default MobileNav