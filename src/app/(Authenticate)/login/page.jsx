"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {LoginAction }from "@/Actions/SignInActions"
import BackNavbar from "@/components/BackNavbar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EyeIcon,EyeOff } from "lucide-react"

function Login() {
  
  const [Email,setEmail]=useState("")
  const [Password,setPassword]=useState("")
  const router=useRouter()

  const [showPassword,setShowPassword]=useState(false)

  const [emailErr,setEmailErr]=useState("")
  const [passwordErr,setPasswordErr]=useState("")

  const HandleSignIn= async (e)=>{
    e.preventDefault();
    const UserData={Email,Password}
    const result = await LoginAction(UserData)
    if(result.success){
      
      router.push(`/dashboard/${result.Username}`)
      
    }
  }

  return (
    <div className="flex flex-col items-center ">
         <BackNavbar />
         "hii"
        <div className="max-w-[600px] w-9/10 px-4 py-6 ">
          <h2 className="text-3xl text-center mb-4 anton">Login</h2>
          <form className="grid gap-2 barlow" onSubmit={HandleSignIn}>
            {/* row 1  */}
            <div className="grid gap-1.5">
              <Label >Email *</Label>
              <div className="grid gap-1">
                <Input className={`border-black/30 border-2 h-10`} value={Email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}/>
                <p className="invisible text-[12px]">{"msg"}</p>
              </div>        
            </div>

            {/* row 2 */}
            <div className="grid gap-1.5">
              <Label >Password *</Label>
              <div className="grid gap-1.5 relative">
                <Input className={`border-black/30 border-2 h-10`} value={Password}
                onChange={(e)=>{
                  const passwrdValue=e.target.value
                  setPassword(passwrdValue)
                }}
                
                type={`${showPassword?"text":"password"}`}/>

                <div className="absolute top-0 right-0 h-10 px-3 flex items-center cursor-pointer hover:bg-gray-400/50 rounded-[0_10px_10px_0]" 
                onClick={()=>{
                  setShowPassword(!showPassword)
                }}>
                  {
                    showPassword? <EyeOff /> : <EyeIcon />
                  }  
                  
                </div>
                <p className={`invisible text-[10px] font-semibold text-red-400`}>
                  {"msg"}
                </p>
              </div>        
            </div>


            <Button size={"lg"} className={`w-full cursor-pointer h-12`} type="submit">SignIn</Button>     
          </form>

          <div className="my-4 barlow">
              <p className="text-center">Dont Have An Account?
                <Link href={"/signup"} className="text-blue-600 font-semibold"> Resister</Link>
              </p>
          </div>
        </div>
    </div>
  )
}

export default Login