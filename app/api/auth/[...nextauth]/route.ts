// import { Session } from "inspector/promises";
// import { User } from "lucide-react";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";


// const authOptions = {
//     providers: [
//    CredentialsProvider({
//     name : "credentials",
//     credentials : {},
//     async authorize(credentials){ 
//     const user = { id: "1" }
//     return user;
//     }
//    })
//     ],

//     session: {
//         strategy : "jwt"
//     },
//     secrete : process.env.NEXTAUTH_SECRET,
//     pages: {
//    sigIn : "/"
//     }

// }

// const handler = NextAuth(authOptions:any);
// export {handler as GET, handler as POST}


import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../lib/mongoodb";

import User from "../../../../models/users";
import bcrypt from "bcryptjs";
 export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const {email, password} = credentials// Replace with your custom user authentication logic

        try {
             await connectMongoDB();
             const userp = await User.findOne({email})
             if (!userp) {
                return null
             }

             const passwordMatch = await bcrypt.compare(password ,userp.password)
             if (!passwordMatch) {
                return null
                
             }
                return userp;

        } catch (error) {
            console.log(error ,"error");
            
        }
      
      },
    }),
  ],

  session: {
    strategy: "jwt", // Valid value
  },
  secret: process.env.NEXTAUTH_SECRETE, // Fixed 'secrete' typo
  pages: {
    signIn: "/", // Fixed 'sigIn' typo
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
