import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
// import { Select } from '@/Components/ui/select'
import React from 'react'
import { useState } from 'react'  
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/Components/ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

function CreateCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const getSelectedCategory = (value) => {
    setCategory(value);
  }

  const handleCreateCourse = async () => {
    try{
    setLoading(true);
const res = await axios.post('http://localhost:8080/api/course/', {courseTitle, category},{
  headers:{
    'Content-Type':'application/json'
  },
  withCredentials:true
})
if(res.data.success){
  navigate('/admin/course');
  toast.success(res.data.message)
}

    }catch(err){
      console.log("Error creating course:", err);
    } finally {
         setLoading(false);
    }
 
  }


  return (
    <div className='p-10 md:pr-20 h-screen'>
      <h1 className='text-2xl font-bold'>Let Add <span className='text-blue-500'>Courses</span></h1>
      <p className='text-gray-600 mt-2'>
        Create and manage your courses easily. Add course details, upload materials, 
        and organize your content to provide the best learning experience for your students.
      </p>
      <div className='mt-2'>
      <div>
        <Label>Title</Label>
        <Input type="text" value={courseTitle} onChange={(e)=>setCourseTitle(e.target.value)} placeholder="Your Course Name" className="bg-white mt-2"></Input>
      </div>
      <div className='mt-4 mb-5'>
        <Label className='mb-2'>Category</Label>
    <Select onValueChange={getSelectedCategory}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Category </SelectLabel>
          <SelectItem value="Next Js">Next Js</SelectItem>
          <SelectItem value="Data Science">Data Science</SelectItem>
          <SelectItem value="Frontend Development">Frontend Development</SelectItem>
          <SelectItem value="Backend Development">Backend Development</SelectItem>
          <SelectItem value="Mern Stack Development">Mern Stack Development</SelectItem>
          <SelectItem value="Javascript">Javascript</SelectItem>
          <SelectItem value="Python">Python</SelectItem>
          <SelectItem value="Docker">Docker</SelectItem>
          <SelectItem value="MongoDB">MongoDB</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
      <div className='flex gap-2'>
        <Button onClick={handleCreateCourse} className='bg-blue-500 hover:bg-blue-600 text-white'>
          {
            loading ? <Loader2 className='animate-spin mr-1 h-4 w-4'>Please wait</Loader2> : "Create"
          }
        </Button>
        <Button disabled={loading} onClick={()=>navigate('/admin/course')} className='bg-gray-300 hover:bg-gray-400 text-black'>Cancel</Button>
      </div>
    </div>
    </div>
  )
}

export default CreateCourse
