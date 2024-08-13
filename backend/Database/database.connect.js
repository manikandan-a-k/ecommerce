import mongoose from "mongoose"
 const connectDb=async()=>{
  try{
        const db=await mongoose.connect(process.env.DB_CONNECTION)
        console.log("Db Connected")
  }
  catch(error){
    console.log(`Db connection Fail ${error}`)
  }
}
export default connectDb;