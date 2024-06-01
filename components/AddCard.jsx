import { Button } from "./ui/button"
import  { PlusIcon} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const AddCard = () => {
  return (
    <div
    className="flex items-center justify-center"
    >
      <Dialog>
  <DialogTrigger>
  <div className='flex items-center justify-center ml-56' >
        <Button variant='outline' className='flex gap-1 items-center justify-center'>
            <PlusIcon color='green'/>
            Add Book to  Shelf
        </Button>
        </div>
  </DialogTrigger>
  <DialogContent>
    ADD FORM
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddCard