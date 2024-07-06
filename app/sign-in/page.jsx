'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { auth } from "@/lib/firebase"
import { ToastAction } from "@/components/ui/toast"
import { Loader } from 'lucide-react'
import Link from "next/link"


const SignIn = () => {
  const router = useRouter();
  const {toast} = useToast();
  // Usestate 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setisLoading] = useState(false)

  const handleLogin = async () => {
    setisLoading(true)
    try{
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        toast({
          title: "Login Successfully",
          description: "Congratulations, login session is sucessful",
        })
        localStorage.setItem('fuo-id', res?.user?.uid);
        router.push('/');
        setisLoading(false)
      })
    } catch (err) {
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required
          onChange={(e) => setEmail(e.target.value)}
           />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required 
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        {isLoading ? 
         <Button disabled className="w-full bg-green-400 hover:bg-green-300">
         <Loader className="mr-2 h-4 w-4 animate-spin" />
       </Button>
        : 
        <Button className="w-full bg-green-400 hover:bg-green-300"
        onClick={handleLogin}
        >Sign in</Button>
        }
      </CardFooter>

      <Link href={'/'} className="p-2 text-blue-600 underline cursor-pointer hover:no-underline" >
        Continue as a student
      </Link>
    </Card>
  )
}

export default SignIn