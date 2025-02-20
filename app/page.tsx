import React from 'react'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from './api/auth/[...nextauth]/route';
import LoginForm from '../components/Loginform'

export default function Mainpage() {
  const session = getServerSession(authOptions);
  if (session) redirect("/register")
    
  
  return (
    <div>
          < LoginForm/>
    </div>
  )
}
