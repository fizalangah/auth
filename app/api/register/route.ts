import { NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { connect } from "node:http2"
import { connectMongoDB,  } from "../../../lib/mongoodb"

import bcrypt from "bcryptjs"
import User from "../../../models/users"
export async function POST(req) {
    
    try {
    const {name,email,password} = await req.json() 
    const hashpasword = await bcrypt.hash(password,10)
    // console.log(name,"name");
    // console.log(email,"email");
    // console.log(password,"password");
    await connectMongoDB()
    await User.create({name,email,password:hashpasword})
     
    
    
    return NextResponse.json({message: "user registerd"},{status:201})
        
    } catch (error) {
         return NextResponse.json({message: "an error accured while registering the user"} ,{status: 500})
    }
}