import { Button } from '@/Components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card.jsx'
import { Input } from '@/Components/ui/input.jsx'
import { Label } from '@/Components/ui/label.jsx'
import { Progress } from '@/Components/ui/progress.jsx'
import { Switch } from '@/Components/ui/switch.jsx'
import { setLecture } from '@/redux/lectureSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function LectureTab() {
    const params = useParams()
    const {courseId, lectureId} = params;
    const {lecture} = useSelector(store => store.lecture)
    const selectedLecture = lecture.find(lecture => lecture._id === lectureId)
    // const selectedLecture = lecture?.find(l => l._id === lectureId);
    const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle)
    //   const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle );
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
    const [isFree, setIsFree] = useState(selectedLecture.isPreviewFree)
    // const [isFree, setIsFree] = useState(selectedLecture?.isPreviewFree || false);
    const [mediaProgress, setMediaProgress] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)
     const dispatch = useDispatch()
    const navigate = useNavigate()



    const fileChangeHandler = async (e)=>{
        const file = e.target.files[0];
        if(file){
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true)

            try {
                const res = await axios.post(`http://localhost:8080/api/media/upload-video`, formData,{
                    onUploadProgress:({loaded, total}) => {
                        setUploadProgress(Math.round((loaded * 100) / total))
                    }
                })

                if(res.data.success){
                    setUploadVideoInfo({
                        videoUrl: res.data.videoUrl,
                        publicId: res.data.publicId,
                    })
                    toast.success(res.data.message)
                }

            } catch (error) {
                console.log(error)
                toast.error("Video upload failed")
            }finally{
                setMediaProgress(false)
            }

        }
    }

    const editLectureHandler = async (e) =>{
     e.preventDefault();

        const data = {
            lectureTitle,
            videoInfo:uploadVideoInfo,
            isPreviewFree:isFree,
        }
        try {
            setLoading(true)
            const res = await axios.post(`http://localhost:8080/api/course/${courseId}/lecture/${lectureId}`,data,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true 
            })
            if(res.data.success){
                // dispatch([...lecture, setLecture(res.data.lecture)])
                // toast.success(res.data.message)

                 dispatch(setLecture([...lecture, res.data.lecture]));
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error("Failed to edit lecture")
        }finally{
            setLoading(false)
        }
    }

    const removeLectureHandler = async (e) =>{
        e.preventDefault();

        try {
            setRemoveLoading(true)
            const res = await axios.delete(`http://localhost:8080/api/course/lecture/${lectureId}`,
                {withCredentials:true}
            )
            if (res.data.success) {
                navigate(`/admin/course/${courseId}/lecture`)
                toast.success(res.data.message)
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete lecture")
        }finally{
            setRemoveLoading(false)
        }
    }


  return (
    <Card>
      <CardHeader className='flex justify-between'>
      <div>
        <CardTitle>Edit Lecture</CardTitle>
        <CardDescription>Make Changes and click save when done.</CardDescription>
      </div>
      <div className='flex items-center gap-2'>
          <Button className='bg-red-500 text-white' disabled={removeLoading} onClick={removeLectureHandler}>
            {
                removeLoading ? <><Loader2 className='mr-1 w-4 h-4 animate-spin'>Please wait</Loader2></> : "Remove Lecture"
            }
            </Button>
      </div>
      </CardHeader>
      <CardContent>
        <div>
            <Label className='mb-2'>Title</Label>
            <Input type='text' placeholder = 'Ex. Introduction to javascript' value={lectureTitle}  onChange={(e)=>setLectureTitle(e.target.value)}></Input>
        </div>
        <div className='my-5'>
             <Label className='mb-2'>Video<span className='text-red-500'>*</span></Label>
            <Input type='file' accept='video/*' placeholder = 'Ex. Introduction to javascript' className='w-fit' onChange={fileChangeHandler}></Input>
        </div>
        <div className='flex items-center space-x-2 my-5'>
            <Switch checked={isFree} onCheckedChange={setIsFree} className=''/>
           <Label>Is this video FREE </Label>

        </div>

        {
            mediaProgress && (
                <div className='my-4'>
                    <Progress value={uploadProgress}></Progress>
                    <p>{uploadProgress}% uploaded</p>
                </div>
            )
        }

        <div className='mt-4'>
            <Button disabled={loading} onClick={editLectureHandler} className='bg-gray-800 text-white'>
                {
                    loading ? <><Loader2 className='mr-1 w-4 h-4 animate-spin'>Please wait</Loader2></> : "Update Lecture"
                }
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LectureTab
