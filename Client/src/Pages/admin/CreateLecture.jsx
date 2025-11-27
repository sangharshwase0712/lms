import { Button } from "@/Components/ui/button.jsx";
import { Input } from "@/Components/ui/input.jsx";
import { Label } from "@/Components/ui/label.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios"
import { toast } from "sonner";
import { Edit, Loader2 } from "lucide-react";
import { setLecture } from "@/redux/lectureSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function CreateLecture() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [lectureTitle, setLectureTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const {lecture} = useSelector(store => store.lecture)

    const createLectureHandler = async ()=>{
        try {
            setLoading(true)
            const res = await axios.post(`https://lms-8-phxm.onrender.com/course/${params?.courseId}/lecture`,{lectureTitle},{
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials:true,
            })
            if(res.data.success){
                toast.success(res.data.message)
            }else{
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const getLectures = async()=>{
      try {
        const res = await axios.get(`https://lms-8-phxm.onrender.com/course/${params.courseId}/lecture`,
            {withCredentials:true})
            if(res.data.success){
                dispatch(setLecture(res.data.lectures))
            }
      } catch (error) {
        console.log(error)
      }
        }
        getLectures()
    },[lecture])


  return (
    <div className="p-4 md:p-10 md:pr-20 h-screen">
      <h1 className="text-2xl font-bold mb-2">
        Lets Add <span className="text-blue-600">Lectures</span>
      </h1>
      <p className="text-gray-600 mt-2 max-w-prose">
        Create and manage your course lectures here. Add titles, descriptions,
        and videos to build an engaging learning experience for your students.
      </p>
      <div className="mt-10 space-y-5">
        <div>
          <Label className="mb-2">Title</Label>
          <Input
            type="text"
            placeholder="Your Lecture Name"
            className="bg-white"
            value={lectureTitle}
            onChange={(e)=>setLectureTitle(e.target.value)}
          ></Input>
        </div>
        <div className="flex gap-2">
          <Button onClick={()=>navigate(`/admin/course/${params.courseId}`)} className="bg-white text-black" variant="outline">
            Back to Course
          </Button>
          <Button
          disabled={loading}
          onClick={createLectureHandler}
            className="bg-gray-800 hover:bg-gray-800 text-white"
            variant="outline"
          >
            {
                loading ? <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin"/>Please wait
                </>
                : "Create Lecture"
            }
          </Button>
        </div>
      </div>
      <div className="mt-10">
  {
    lecture?.map((lecture, index)=>{
        return <div key={index} className="flex items-center justify-between bg-[#F7F9FA] px-4 py-2 rounded-md my-2">
            <h1 className="font-bold text-gray-800">Lecture - {index+1}: {lecture.lectureTitle}</h1>
            <Edit onClick={()=>navigate(`${lecture._id}`)} size={20} className="cursor-pointer text-gray-600 hover:text-blue-600"></Edit>
        </div>
    })
  }
      </div>
    </div>
  );
}

export default CreateLecture;
