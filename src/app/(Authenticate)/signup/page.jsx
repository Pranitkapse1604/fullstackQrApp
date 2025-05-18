"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {CreateUser,IsUserNameUnique,IsEmailUnique} from "@/Actions/SignUpActions"
import BackNavbar from "@/components/BackNavbar"
import Link from "next/link"
import { EyeOff,EyeIcon ,Loader} from "lucide-react"

function Signup() {
  const [UserName,setUserName]=useState("")
  const [Email,setEmail]=useState("")
  const [Password,setPassword]=useState("")

  const [showPassword,setShowPassword]=useState(false)

  const [userNameErr,setUserNameErr]=useState("")
  const [emailErr,setEmailErr]=useState("")
  const [passwordErr,setPasswordErr]=useState("")

  const [loading , setLoading]=useState(false)

  const HandleSignup= async (e)=>{
    e.preventDefault();
    setLoading(true)
    const UserData={UserName,Email,Password}
    const result = await CreateUser(UserData)
    console.log(result.msg)
    if(result){
      setLoading(false)
    }else{
      setLoading(false)
    }
  }

  function ValidEmail(Email){
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(Email);
  }

  async function checkEmail(Emailvalue){
    if(ValidEmail(Emailvalue)){
      const result = await IsEmailUnique(Emailvalue)
      setEmailErr(result.msg)
    }else{
      setEmailErr("email syntax is not correct")
    }
  }
  
  return (
    <div className="flex flex-col items-center font-serif">
         <BackNavbar />
        <div className="max-w-[600px] w-9/10 px-4 py-6">
          <h2 className="text-3xl text-center mb-4 anton">Sign up</h2>
          <form className="grid gap-2 barlow" onSubmit={HandleSignup}>
            {/* row 1  */}
            <div className="grid gap-1.5">
              <Label >Username *</Label>
              <div className="grid gap-1">
                <Input className={`border-black/30 border-2 h-10`} value={UserName}
                onChange={async(e)=>{
                  const value = e.target.value
                  setUserName(value)
                   
                  if(value.length>=4){
                    const result = await IsUserNameUnique(value)
                    setUserNameErr(result.msg)
                  }else{
                    setUserNameErr("UserName must have atleast 4 letters")
                  }
                }}/>
                <p className={`${userNameErr?"visible":"invisible"} text-[10px] font-semibold text-red-400`}>
                  {
                    userNameErr?userNameErr:"msg"
                  }
                </p>
              </div>        
            </div>


            <div className="grid gap-1.5">
              <Label >Email *</Label>
              <div className="grid gap-1.5">
                <Input className={`border-black/30 border-2 h-10`} value={Email}
                onChange={(e)=>{
                  const EmailVal = e.target.value
                  setEmail(EmailVal)
                  checkEmail(EmailVal)
                }}/>
                 <p className={`${emailErr?"visible":"invisible"} text-[10px] font-semibold text-red-400`}>
                  {
                    emailErr?emailErr:"msg"
                  }
                </p>
              </div>        
            </div>

            <div className="grid gap-1.5">
              <Label >Password *</Label>
              <div className="grid gap-1.5 relative">
                <Input className={`border-black/30 border-2 h-10`} value={Password}
                onChange={(e)=>{
                  const passwrdValue=e.target.value
                  setPassword(passwrdValue)
                  if(passwrdValue.length<8){
                    setPasswordErr("password must have at least 8 letters")
                  }else{
                    setPasswordErr("")
                  }
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
                <p className={`${passwordErr?"visible":"invisible"} text-[10px] font-semibold text-red-400`}>
                  {
                    passwordErr?passwordErr:"msg"
                  }
                </p>
              </div>        
            </div>


            <Button size={"lg"} className={`w-full cursor-pointer h-12`} type="submit">
              { loading?<Loader strokeWidth={3} size={100} className="animate-spin"/> :"Sign Up"
              }
            </Button>

            
          </form>

          <div className="my-4 barlow">
              <p className="text-center">Already Have An Account?
                <Link href={"/login"} className="text-blue-600 font-semibold"> Login</Link>
              </p>
            </div>
        </div>
    </div>
  )
}

export default Signup