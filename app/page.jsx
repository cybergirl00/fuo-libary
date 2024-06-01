"use client"

import Navbar from "@/components/Navbar";
import HomeScreen from "@/components/Screens/HomeScreen";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation"
import  { PlusIcon} from 'lucide-react'
const page = () => {
  const pathName = usePathname();
  console.log(pathName)
  return (
      <div className="w-full">
      <Navbar />
      <HomeScreen />
    </div>
  )
}

export default page