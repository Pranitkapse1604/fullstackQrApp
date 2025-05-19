"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {LoginAction }from "@/Actions/SignInActions"
import BackNavbar from "@/components/BackNavbar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EyeIcon,EyeOff, Loader ,AlertCircle } from "lucide-react"
import MyAlertNotification from "@/components/MyAlertNotification"

function Login() {
  
  const [Email,setEmail]=useState("")
  const [Password,setPassword]=useState("")
  const router=useRouter()
  const [loading , setLoading]=useState(false)

  const [showPassword,setShowPassword]=useState(false)

  const [serverErr,setServerErr]=useState(false)
  const [serverErrMsg,setServerErrMsg] = useState("")
  const [isServerMsgGreen,setIsServerMsgGreen]=useState(false)


  const HandleSignIn= async (e)=>{
    e.preventDefault();
    setLoading(true)
    const UserData={Email,Password}
    const result = await LoginAction(UserData)
    if(result.success){   
      router.push(`/dashboard/${result.Username}`)
      setLoading(false)
      setServerErr(false) 
    }else{

      setServerErr(true)
      setServerErrMsg(result.msg)
      setLoading(false)
    }
  }
  const checkValuesEntered=()=>{
     const checker = Email && Password
     return !checker
  }
  useEffect(()=>{
    checkValuesEntered()
  },[Email,Password])

  return (
    <div className="flex flex-col items-center ">
         <BackNavbar />
         
        <div className="max-w-[600px] w-9/10 px-4 py-2 ">
         {/* server error alert  */}
         
           <div className=" w-full h-12 my-1 barlow grid items-center  ">
              {
               serverErr && <MyAlertNotification serverErrMsg={serverErrMsg} isServerMsgGreen={isServerMsgGreen}/>
              }
          </div>
          

          <h2 className="text-3xl text-center mb-4 anton">Login</h2>
          <form className="grid gap-2 barlow" onSubmit={HandleSignIn}>
            {/* row 1  */}
            <div className="grid gap-1.5">
              <Label >Email *</Label>
              <div className="grid gap-1">
                <Input className={`border-black/30 border-2 h-10`} value={Email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                  setServerErr(false)
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
                  setServerErr(false)
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


            <Button size={"lg"} className={`w-full cursor-pointer h-12`} type="submit" disabled={checkValuesEntered()}>
              { loading?<Loader strokeWidth={3} size={100} className="animate-spin"/> :"SignIn"
              }</Button>     
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