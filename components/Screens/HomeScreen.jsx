import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import Link from "next/link"


const HomeScreen = () => {
    const data = null
  return (
    <div className="flex flex-col gap-5 px-7 py-7">

      {/* Books  */}
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-3xl font-bold">Available <span className='text-green-400'>Books.</span></h2>
        <Button className='bg-green-400 hover:bg-green-300 hidden xl:flex sm:flex' asChild>
          <Link href={'/addbook'}>
          Add book to shelf
          </Link>
</Button>
      </div>


{/* Table  */}
      <Table  >
  <TableCaption>A list available books in the libary</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Name</TableHead>
      <TableHead>Genre</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    
    <TableRow>
      <TableCell className="font-medium">Harry Potter</TableCell>
      <TableCell>Action</TableCell>
      <TableCell>Availabe</TableCell>
    </TableRow>
  </TableBody>
</Table>

    </div>
  )
}

export default HomeScreen