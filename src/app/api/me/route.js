import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";


export async function GET(){
    const token = (await cookies()).get("token")?.value
    
    if(!token){
        return NextResponse.json({
           user:null,
           msg:"Not logged In!"
        },{
            status:401
        })
    }
    try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
      return NextResponse.json({user:decoded})
    }catch(err){
        return NextResponse.json({
          user:null,
          msg:"invalid token"
        },{
          status:403
        })
    }

}