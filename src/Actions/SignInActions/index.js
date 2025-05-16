"use server"

import ConnDB from "@/Database/db"
import QrUser from "@/Database/Models/qrCodeUsers"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export  async function LoginAction(UserData){
 try{
    await ConnDB()
    const User = await QrUser.findOne({email:UserData.Email})
    if(!User){
        return {
            success:false,
            msg:"User not found ! resister first"
        }
    }

     const IsPasswordCorrect= await bcrypt.compare(UserData.Password,User.password)
     
     if(!IsPasswordCorrect){
        return{
            success:false,
            msg:"Wrong password!"
        }
     }
     
     
     const token = jwt.sign({
       id:User.id,
       email:User.email,
       username:User.username
     },
     process.env.JWT_SECRET,
    );

    (await cookies()).set("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:60*60*24,
        path:"/"
    })
                        
     return {
        success:true,
        Username:User.username,
        msg:"User loged in successfully :"
     }     
    

 }catch(err){
    return {
        success:false,
        msg:"Server problem Error:"+err
    }
 }
}

export async function signOut() {
    try{
       await cookies().set("token","")
       
       return {
        success:true,
        msg:"User logged out successfully!"
       }
    }catch(err){
       return {
        success:false,
        msg:"something Error In server , error:"+err
       }

    }
}