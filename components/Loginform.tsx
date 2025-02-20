"use client"
import Link from "next/link";
import React, { useState } from "react";
import {signIn }from "next-auth/react"
import { useRouter } from "next/navigation";
const LoginForm: React.FC = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPasword] = useState("")
const [errorMessage, setErrorMessage] = useState("");
const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Example validation logic
     try {
      
      const res = await signIn("credentials",{
        email ,
        password,
        redirect :false
      })

      if (res?.error) {
        setErrorMessage("Invalid credentials")
        return
      }

      router.replace("dashbord")

     } catch (error) {
      console.log(error);
      
      
     }

    // setErrorMessage("Please fill out all fields correctly.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-2"
            >
              Email
            </label>
            <input onChange={e => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-2"
            >
              Password
            </label>
            <input onChange={e => setPasword(e.target.value)}
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-black mt-4">
          Don&apos;t have an account? <Link href="/register" className="text-blue-500 underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
