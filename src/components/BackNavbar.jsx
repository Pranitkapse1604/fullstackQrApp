"use client"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function BackNavbar() {
    const router = useRouter()
  return (
    <nav className='h-[50px] shadow-2xl px-4 md:px-10 lg:px-32 w-full items-center flex '>
      <div onClick={()=>router.push("/")} className='cursor-pointer'>
         <ArrowLeft strokeWidth={3} />
      </div>
    </nav>
  )
}

export default BackNavbar