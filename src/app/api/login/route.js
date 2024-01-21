import { User } from "@/app/lib/model/user";
import { Connect_url } from "@/app/lib/userdb";
import mongoose, { Mongoose } from "mongoose";
import { NextResponse } from "next/server";

export async function GET()
{
    try{
        await mongoose.connect(Connect_url);
        const user = await User.find();
        console.log(user);
        return NextResponse.json({return:user,success:true},{status:200})
    }
    catch(error) {
        return NextResponse.json({return:"Not Connect MongoDB",success:false},{status:400})
    }

}

export async function POST(req){
    try{
        await mongoose.connect(Connect_url);
        const {mail,password} = await req.json();
        const user_mail = await User.findOne({mail}).select("_id");
        const user_password = await User.findOne({password}).select("_id");
        console.log(user_mail);
        return NextResponse.json({user_mail,user_password},{status:200})
    }
    catch(error) {
        return NextResponse.json(error);
    }
}
