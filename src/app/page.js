"use client"
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

 function Home() {
  const router = useRouter();

  return (
    <div className=' h-screen w-screen '>
       <Navbar />
       <div className="flex justify-center items-center h-[calc(100vh-50px)] w-full"> 
       <div className="grid gap-8 px-4">
          <div>
            <h2 className="text-3xl font-semibold text-center Poetsen-one">
              Welcome to QRcode Generator 
            </h2>
            <p className="text-center barlow">
              Create custom qrcodes for your businesses..
            </p>
          </div>     
          <Button size={"lg"} className={"cursor-pointer h-12 barlow font-semibold"}
          onClick={()=>router.push("/login")}>
            Get Started
          </Button>
          </div>
       </div>
    </div>
  )
}

export default Home