import { User } from "@/app/lib/model/user";
import { Connect_url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await mongoose.connect(Connect_url);
        const user_data = await User.find();
        console.log("Users Data = ", user_data);

        return NextResponse.json({ users: user_data, sucess: true }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ users: "Error Conneting To Mongoose", success: false }, { status: 400 })
    }

}

export async function POST(request)
{
    try{
        const post_data = await request.json();
        const {name, mail, phone, password } = post_data;
        await mongoose.connect(Connect_url);
        const saveUSer = await User.create({name,mail,phone,password});
        console.log("User Data = ",saveUSer)

        return NextResponse.json({ message: "User Created", success: true , saveUSer }, { status: 200 });
    }
    catch(error){
        return NextResponse.json({ message: "User Not Created", success: false }, { status: 500 })
    }
}

