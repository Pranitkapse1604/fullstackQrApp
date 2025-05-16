"use server"

import ConnDB from "@/Database/db";
import QrUser from "@/Database/Models/qrCodeUsers";
import bcrypt from "bcryptjs"

export  async function CreateUser(UserData){
    try{
     await ConnDB()

     const hashedPassword = await bcrypt.hash(UserData.Password,10)

     await QrUser.create({
        username:UserData.UserName ,
        email:UserData.Email ,
        password:hashedPassword,
    })
    
    return {
        success:true,
        msg:"User Created Successfully!"
    }
    }catch(err){
      return {
        status:false,
        msg:"Server Error cant Create User error:"+err
      }
    }
}

export  async function IsUserNameUnique(username){
  try{
    await ConnDB()
    const userName = await QrUser.findOne({username})

    if(userName){
      return {
        success:false,
        msg:"This UserName is already taken"
      }
    }

    return {
      success:true,
      msg:""
    }
  }catch(err){
     return {
      success:false,
      msg:"Server problem error:"+err
     }
  }
}

export  async function IsEmailUnique(email){
  try{
    await ConnDB()
    const User = await QrUser.findOne({email})

    if(User){
      return {
        success:false,
        msg:"This Email is already Resistered"
      }
    }

    return {
      success:true,
      msg:""
    }
  }catch(err){
     return {
      success:false,
      msg:"Server problem error:"+err
     }
  }
}