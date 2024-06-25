"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { Loader } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
const AddUser = () => {
  const {toast} = useToast();
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [isLoading, setisLoading] = useState(false)

  // Create user function

  const createUser = async () => {
    setisLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((res) => {
        addDoc(collection(db, 'users'), {
          userId: res?.user?.uid,
          email: email,
          name: firstName + '  ' + lastName,
          head: false,
        }).then(() => {
          setEmail('')
          setfirstName('')
          setlastName('')
          setpassword('')
          toast({
            title: "User Added",
            description: "Congratulations, sign up session is sucessful",
          })
          setisLoading(false)
        }
        )
      })
    } catch(err) {
      console.log(err)
      setisLoading(false)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.message || err.toString(),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Add new Libarian</CardTitle>
        <CardDescription>
          Enter your information to create a new labarian account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required 
              onChange={(e) => setfirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required 
              onChange={(e) => setlastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password"
            onChange={(e) => setpassword(e.target.value)}
             />
          </div>
          {isLoading ? 
           <Button disabled className="w-full bg-green-400 hover:bg-green-300">
           <Loader className="mr-2 h-4 w-4 animate-spin" />
         </Button>
          : (
          <Button type="submit" className="w-full bg-green-400 hover:bg-green-300"
          onClick={createUser}
          >
            Create an account
          </Button>
          )
          }
         
        </div>
      </CardContent>
    </Card>
  )
}

export default AddUser