"use client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

import RegisterForm from "../../components/registerForm";
const Registerpage  = async () => {

//  const session = await getServerSession(authOptions);

// if (session) redirect("/register");
  return  <RegisterForm/>

}

export default Registerpage;

