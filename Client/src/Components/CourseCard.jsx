import React from 'react'
import { Card } from './ui/card.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CourseCard({course}) {
  const navigate = useNavigate()
  const {user} = useSelector(store=>store.auth)

  const thumbnail =
    typeof course.courseThumbnail === "string"
      ? course.courseThumbnail
      : "/default-thumbnail.png";
  return (
    <Card className='bg-white shadow-lg'>
        <img src={thumbnail} alt="" className='w-full h-48 object-cover' />
        <div className='p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>{course.courseTitle}</h2>
            <p className='text-gray-600 mb-4'>{course.subTitle}</p>
         <button onClick={()=>navigate(user ? `/courses/${course._id}`:"/login")} className="rounded-md bg-gray-700 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Learn More</button>

        </div>
      
    </Card>
  )
}

export default CourseCard
