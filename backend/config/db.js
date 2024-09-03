import mongoose from "mongoose"

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://aggisanjay1234:Sanjay123@cluster0.u4bxmi0.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}