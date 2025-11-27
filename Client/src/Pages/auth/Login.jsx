import React from 'react'
import { Label } from "@radix-ui/react-label";
import { Input } from "@/Components/ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { setUser } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
  const [input, setinput] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinput((prev) =>({
        ...prev,
        [name]: value,
    }))
   }
 
   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
       try{
    const response = await axios.post('http://localhost:8080/api/users/login', input , {
     
      headers:{
        'Content-Type': 'application/json',
      }, 
      withCredentials: true,
    })
    if(response.data.success){
      navigate('/');
      dispatch(setUser(response.data.user));
     toast.success(response.data.message);
    } else {
      toast.error('something went wrong');
   }
  
   } catch (error){
    console.error('Error during registration:', error);
    toast.error('Registration failed. Please try again.');
   }
   }

  return (
     <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
        please Log in to your account
        </p>
       

        <div className="mb-4">
          <Label>Email Address</Label>
          <Input placeholder="Enter Your Email"
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <Label>Password</Label>
          <Input placeholder="Enter Your Password" 
          type="password"
           name="password"
          value={input.password}
          onChange={handleChange}
          />
        </div>

    
        <Button onClick = {handleSubmit} className='bg-indigo-700 hover:bg-indigo-800 w-full text-white'>Login</Button>

        <div className='flex items-center my-6'>
          <hr className='flex-grow border-gray-300'/>
          <span className='mx-3 text-gray-500'>OR</span>
          <hr className='flex-grow border-gray-300'/>
        </div>
        <p className="text-center mt-4">Don't have an account?<Link to="/signup" className="text-blue-500 hover:underline"> Sign up</Link></p>
    
      </div>
    </div>
  )
}

export default Login