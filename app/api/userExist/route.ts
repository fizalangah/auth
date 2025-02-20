
// import { ConnectMongodb } from "../../../lib/mongoodb";
// import User from "../../../models/users";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//     try {  
//       await ConnectMongodb() ;

//       const {email} = await req.json()

//       const user = User.findOne({email}).select("_id")
//       console.log(user,"user");
//       return NextResponse.json({user})
      
//     } catch (error) {
//         console.log(error);
        
//     }
    
// }
import { ConnectMongodb } from "../../../lib/mongoodb";
import User from "../../../models/users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await ConnectMongodb();

    // Extract email from request body
    const { email } = await req.json();

    // Query user from database
    const user = await User.findOne({ email }).select("_id"); // Use 'await' here

    // Log and return the user
    console.log(user, "user");
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in POST /userExist:", error);

    // Return error response
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}

