import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Search = () => {
  return (
    <div className="w-full">
        {/* Search */}
        <div className=" w-full p-3 flex gap-2 items-center">
            <Input placeholder='Search here...'
            className='w-full'
             />
            <Button className='bg-green-400 hover:bg-green-300'>Search</Button>
            <Button 
            variant='outline'
            asChild
            >
              <Link href={'/scan'}>
              Scan
              </Link>
              </Button>
        </div>

        {/* Result */}
        <div className="">
            NO RESULT
        </div>
    </div>
  )
}

export default Search