import mongoose from "mongoose";

const userdetails = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mail:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
});

export const User =  mongoose.models.userregisterdata || mongoose.model("userregisterdata",userdetails);

