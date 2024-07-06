import BookList from "../BookList"
import { Button } from "../ui/button"
import Link from "next/link"


const HomeScreen = ({user}) => {
   console.log(user)
  return (
    <div className="flex flex-col gap-5 px-7 py-7">

      {/* Books  */}
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-3xl font-bold">Available <span className='text-green-400'>Books.</span></h2>
        {user != null && (
          <Button className='bg-green-400 hover:bg-green-300 hidden xl:flex sm:flex' asChild>
          <Link href={'/addbook'}>
          Add book to shelf
          </Link>
</Button>
      )}
      
      </div>


{/* Book  */}
  <BookList user={user}/>

    </div>
  )
}

export default HomeScreen