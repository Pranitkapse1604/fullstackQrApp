"use client"
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import React, {  useEffect, useState } from 'react'
import UserProfile from '@/UserProfile/UserProfile'
import { Loader } from 'lucide-react'

function UserDashboardFile({user}) {
  const router = useRouter()
  const [UserData,setUserData] = useState({})
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
   try{
    const verifyUser=async()=>{
        const res =await fetch("/api/me")

        if(!(res.ok)){
            router.push("/login")
            return;
        }

        const data = await res.json()

        setUserData(data)

        if((data.user.username)!==user){
            router.push("/login")
        }
      }
  
      verifyUser()

   }catch(err){
      console.log("something went wroung!",err)
      router.push("/login")
   }
  },[])

  const [InputUrl,setInputUrl] = useState("")
  const [ImgUrl,setImgUrl]=useState("")
  const [QRHeading,setQrheading]=useState("")
  

  const GenerateQR = async()=>{
    try{
      const URL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${InputUrl}`;
    setLoading(true)
    const result = await fetch(URL)
    if(result){
      setLoading(false)
    }
    setImgUrl(result.url)
   
    result?setQrheading(InputUrl):null
    setInputUrl("")
   }catch(err){
    setLoading(false)
   }
  }
  const [showProfile,setShowProfile]=useState(false)
  return (
    <div className='h-screen w-screen barlow bg-white/50'>
        <Navbar showProfile={showProfile} setShowProfile={setShowProfile}/>
        { showProfile && <UserProfile UserData={UserData.user}/> }

        <div className=" w-full flex flex-col items-center  px-4 py-4"> 
               
          <div className='  w-full max-w-[950px] '>

             <div className='py-4'>
                
             <h2 className=' text-3xl anton'>Generate QR code</h2>
             <p>Enter url or name to generate Qr Code</p>
             </div>
            <div className='flex flex-col items-center gap-4 ' >
                <Input type={"text"}  className={`border-black/30 border-2 w-full h-10`} placeholder="www.google.com" onChange={(e)=>{
                    setInputUrl(e.target.value)
                }} value={InputUrl}
                  />
                <Button size={"lg"} className={"w-full font-semibold cursor-pointer h-12"} 
                onClick={GenerateQR}>
                  { loading?<Loader strokeWidth={3} size={100} className="animate-spin"/> :"Generate QR"
              }
                </Button>
             </div>
          </div>

          {ImgUrl ? <div className='w-full  my-5 border-2 py-2 max-w-[950px] rounded-md'>
            
                 <div className='w-full  rounded-sm flex flex-col gap-2 items-center  justify-center '> 
                 <p className='font-semibold text-slate-900/90'>{QRHeading}</p> 
                   <img src={ImgUrl} alt="" className='w-[300px] h-[300px]'/> 
                   <div className='w-full p-2' >
                    <a href={ImgUrl} download={`${InputUrl}.png`}>
                     <Button size={"lg"} variant={"secondary"} className={"w-full font-semibold cursor-pointer h-12"}>Download</Button>
                    </a>
                   </div>
                 </div>     
            </div>: null
           }
        </div>
    </div>
  )
}

export default UserDashboardFile