import { UserCircle2,X } from 'lucide-react'

function Navbar({showProfile,setShowProfile}) {
  return (
    <nav className='flex justify-between px-4 md:px-10 lg:px-32 items-center h-[50px] shadow-2xl Poetsen-one bg-gray-300'>
        <div>
            <h1 className='text-2xl font-bold tracking-wide'>QR-Maker</h1>
        </div>
        <div onClick={()=>{
          setShowProfile(!showProfile)
        }} className='cursor-pointer'>
            { showProfile?<X strokeWidth={2} size={"35px"} className='font-bold'/>:<UserCircle2 strokeWidth={2} size={"35px"} className='font-bold'/>}
        </div>
    </nav>
  )
}

export default Navbar