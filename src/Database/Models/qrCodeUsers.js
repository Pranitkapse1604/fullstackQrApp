import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
  } ,
  email:{
    type:String,
    required:true,
  } ,
  password:{
    type:String,
    required:true,
  }
})

const QrUser = mongoose.models.QrUser || mongoose.model("QrUser",UserSchema)

export default QrUser 