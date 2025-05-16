import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { UserCircle2 } from 'lucide-react'
import React from 'react'
import { signOut } from '@/Actions/SignInActions'
import { useRouter } from 'next/navigation'

function UserProfile({UserData}) {
   
    const router = useRouter()

  const handleSignOut =async ()=>{
     const result = await signOut()
     if(result.success){
       router.push("/")
     }else{
        console.log(result.msg)
     }
  }
  return (
    <div className='bg-white h-screen overflow-clip w-screen absolute top-[50px] right-0 text-black/80  px-4 md:px-10 lg:px-32 barlow'>
       <div className='px-2 py-6 flex flex-col items-center gap-10'>
         <UserCircle2 size={"100px"}/>

        <div className='w-full flex flex-col gap-4'>
            <div className='w-full'>
                <Label >UserName</Label>
                <p className='text-xl text-black'>
                    {
                        UserData.username
                    }
                </p>
            </div>
            <div className='w-full'>
            <Label >Email</Label>
                <p className='text-xl text-black'>
                    {
                        UserData.email
                    }
                </p>
            </div>
        </div>

        <div className='w-full'>
            <Button size={"lg"}  className={"w-full h-12 cursor-pointer"} onClick={handleSignOut} type="button">Log Out</Button>
        </div>
       </div>
    </div>
  )
}

export default UserProfile