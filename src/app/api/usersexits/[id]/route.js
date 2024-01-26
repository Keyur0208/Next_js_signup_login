import { User } from "@/app/lib/model/user";
import { Connect_url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, container) {

    try{
        let user_id = container.params.id;
        const record = { _id: user_id };
        console.log(record);
        await mongoose.connect(Connect_url);
        let result = await User.findById(record);
        console.log(result);
        return (
            NextResponse.json({ users: result, sucess: true }, { status: 200 })
        )
    }
    catch (error){
        return (
            NextResponse.json({ users: "Not Data Avaiable", sucess: false }, { status: 400 })
        )
    }
}

