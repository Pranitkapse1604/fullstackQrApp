import mongoose from "mongoose";
async function ConnDB(){
    try{

      await mongoose.connect("mongodb+srv://pran:pran@cluster0.4tkg6.mongodb.net/QrDB?retryWrites=true&w=majority&appName=Cluster0");
    }catch(e){
      console.log("database is not connected error:"+e)
    }
}

export default ConnDB