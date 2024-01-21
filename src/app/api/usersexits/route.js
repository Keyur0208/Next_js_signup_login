import { User } from "@/app/lib/model/user";
import { Connect_url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET()
{
    try{
        await mongoose.connect(Connect_url);
        const user_data = await User.find();
        console.log("User Data = ",user_data);

        return NextResponse.json({user:user_data,success:true},{status:200})
    }

    catch(error){
        return NextResponse.json({ users: "Error Conneting To Mongoose", success: false }, { status: 400 })
    }
}


// export async function POST(request) {

//     await mongoose.connect(Connect_url);

//     try {
//         const post_data = await request.json();
//         const { mail } = post_data;
//         console.log("Post Data = ", post_data);

//         const user_mail = await User.findOne({ mail });
//         // const user_phone = await User.findOne({phone});

//         if (user_mail) {
//             return NextResponse.json({ error: "This User Alraedy Email " }, { status: 400 });
//         }

//         // if(user_phone){
//         //     return NextResponse.json({ error: "This User Alraedy Phone No" }, { status: 400 });
//         // }

//         // Security Password //
// 		// const salt = await bcryptjs.genSalt(10);
// 		// const hashedPassword = await bcryptjs.hash(password, salt);
        
//         // New User //

//         const newUser = new User({mail});
       
//         const saveUser = await newUser.save();
//         return NextResponse.json({ message: "User Created", success:true, saveUser, }, { status: 200 });

//     } catch (error) {
//         return NextResponse.json({ message: "User Not Created", success: false }, { status: 500 })
//     }
// }


export async function POST(req){

    try{
        await mongoose.connect(Connect_url);
        const { mail,phone } = await req.json();
        const user_mail = await User.findOne({mail}).select("_id");
        const user_phone = await User.findOne({phone}).select("_id");
        console.log(user_mail);
        console.log(user_phone);
        return NextResponse.json({user_mail,user_phone},{status:200});
    }
    catch(error){
        return NextResponse.json(error)
    }
}