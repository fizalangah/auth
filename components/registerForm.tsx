import React, { useState } from "react";
import { useRouter } from "next/navigation"
const RegisterForm: React.FC = () => {

//   const session = await getServerSession(authOptions)
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPasword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
const router =  useRouter()

// if (session)  redirect("/dasbord")
  

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Example validation logic
    if(!name || !email || !password){
    setErrorMessage("Please fill out all fields correctly.");
    return
    }
    try 
    {
       const resuserExist = await fetch('/api/userExist',
        {
         method : "POST",       
            headers:{ "content-type": "application/json",},
            body : JSON.stringify({
         email
            })
    })
  const {user} = await resuserExist.json() 
  console.log(user ,"user");
  
  if (user) {
    setErrorMessage("user already exist");
    
    return
  }

       const res =  await fetch('/api/register',
            {
    method : "POST",       
      headers:{ "content-type": "application/json",},
      body : JSON.stringify({
   name,email,password
      })
        
    })    
    
    if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/")
    } else{
        console.log("user registration is failed");
        
    }
    } catch (error) {
        console.log("error during registration",error);
        
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black mb-2"
            >
              Name
            </label>
            <input onChange={e => setName(e.target.value)}
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-2"
            >
              Email
            </label>
            <input onChange={e=> setEmail(e.target.value)}
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
            Register
          </button>
        </form>
        <p className="text-sm text-center text-black mt-4">
          Already have an account? <a href="/" className="text-blue-500 underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;