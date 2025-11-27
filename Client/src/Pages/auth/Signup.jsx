import { Label } from "@radix-ui/react-label";
import { Input } from "@/Components/ui/input.jsx";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {


  const navigate = useNavigate();
   const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
   });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) =>({
        ...prev,
        [name]: value,
    }))
   }

   const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic here
    console.log(user);
   
   try{
    const response = await axios.post('https://lms-8-phxm.onrender.com/users/register', user , {
     
      headers:{
        'Content-Type': 'application/json',
      }, 
      withCredentials: true,
    })
    if(response.data.success){
      navigate('/login');
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
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join Us today! It's quick and easy
        </p>

        {/* Name */}
        <div className="mb-4">
          <Label>Full Name</Label>
          <Input placeholder="Enter Your Name"
          name="name" 
          value={user.name}
          onChange={handleChange}
          type="text"
          id="name"
          />
        </div>

        <div className="mb-4">
          <Label>Email Address</Label>
          <Input placeholder="Enter Your Email" 
          type="email"
          name="email" 
          value={user.email}
          onChange={handleChange}
          id="email"
          />
        </div>

        <div className="mb-4">
          <Label>Password</Label>
          <Input placeholder="Enter Your Password" 
          type="password"
          name="password" 
          value={user.password}
          onChange={handleChange}
          id="password"
          />
        </div>

        <div className="mb-4">
          <Label>Role</Label>
          <RadioGroup  className='flex gap-4 mt-1'>
            <div className="flex items-center space-x-2">
             <Input type="radio"
              name="role" 
              value="student"
              id="role1"
              onChange={handleChange}
              checked={user.role === "student"}
             />
              <Label htmlFor="role1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input type="radio"
              name="role" 
              value="instructor"
              id="role2"
              onChange={handleChange}
              checked={user.role === "instructor"}
             />
              <Label htmlFor="role2">Instructor</Label>
            </div>
          </RadioGroup>
        </div>
        <Button onClick={handleSubmit} className='bg-indigo-700 hover:bg-indigo-800 w-full text-white'>Signup</Button>
        <p className="text-center mt-4">Already have an account?<Link to="/login" className="text-blue-500 hover:underline"> Log in</Link></p>
    
      </div>
    </div>
  );
};

export default Signup;
