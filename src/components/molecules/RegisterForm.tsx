import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { FormField, FormItem, FormLabel, FormControl,FormMessage,Form } from "../ui/form"
import { Input } from "../ui/input"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../lib/firebase"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate} from "react-router-dom"
 
const formSchema = z.object({
  email: z.string().email({
    message:"please enter valid email"
  }),
  password: z.string(),
  confirmPassword: z.string(),
})

const RegisterForm = () => {
  const navigate = useNavigate()  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
    await createUserWithEmailAndPassword(auth,values.email,values.password)
    console.log("user created")
    navigate('/login')
  }

  const [visibility,setVisibility] = useState("password")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
              <div className="flex items-center justify-center">
            <Input placeholder="" {...field} type={visibility} className="mr-2 w-96"/>
            <Button onClick={() => setVisibility(visibility === "password" ? "text" : "password")}
              className="-ml-16 cursor-pointer">
              {visibility === "password" ? <Eye /> : <EyeOff />}
            </Button>
          </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirnm Password:</FormLabel>
              <FormControl>
              <div className="flex items-center justify-center">
            <Input placeholder="" {...field} type={visibility} className="mr-2 w-96"/>
            <Button onClick={() => setVisibility(visibility === "password" ? "text" : "password")}
              className="-ml-16 cursor-pointer">
              {visibility === "password" ? <Eye /> : <EyeOff />}
            </Button>
          </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-purple-600 text-white font-bold hover:bg-purple-500">Submit</Button>
      </form>
    </Form>
  )
}

export default RegisterForm