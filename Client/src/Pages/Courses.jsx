import CourseCard from '@/Components/CourseCard'
import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '@/redux/courseSlice';


export const coursesJson = [
  {
    "id": 1,
    "title": "Full Stack Web Development",
    "description": "Learn to build modern web applications using React, Node.js, Express, and MongoDB. Master both frontend and backend development.",
    "image": "https://images.unsplash.com/photo-1581276879432-15a19d654956"
  },
  {
    "id": 2,
    "title": "UI/UX Design Fundamentals",
    "description": "Understand the principles of user experience and interface design. Learn wireframing, prototyping, and visual design tools like Figma.",
    "image": "https://images.unsplash.com/photo-1603899124183-3b4d55b44f3b"
  },
  {
    "id": 3,
    "title": "Data Science with Python",
    "description": "Analyze data and build predictive models using Python libraries like Pandas, NumPy, and Scikit-learn. Learn data visualization and machine learning basics.",
    "image": "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
  },
  {
    "id": 4,
    "title": "Digital Marketing Masterclass",
    "description": "Master SEO, social media marketing, content strategy, and Google Ads to grow any online business.",
    "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    "id": 5,
    "title": "Mobile App Development with Flutter",
    "description": "Create beautiful, fast, and cross-platform mobile apps using Flutter and Dart from scratch.",
    "image": "https://images.unsplash.com/photo-1581091870627-3ca5df8f9f7f"
  },
  {
    "id": 6,
    "title": "Artificial Intelligence & Machine Learning",
    "description": "Learn AI fundamentals, neural networks, and model deployment using TensorFlow and PyTorch.",
    "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  },
  {
    "id": 7,
    "title": "Cybersecurity Essentials",
    "description": "Explore the world of ethical hacking, network security, encryption, and defense against cyber threats.",
    "image": "https://images.unsplash.com/photo-1605902711622-cfb43c44367d"
  },
  {
    "id": 8,
    "title": "Cloud Computing with AWS",
    "description": "Understand cloud architecture, services, and deployment using Amazon Web Services (AWS).",
    "image": "https://images.unsplash.com/photo-1504386106331-3e4e71712b38"
  },
  {
    "id": 9,
    "title": "Blockchain & Web3 Development",
    "description": "Learn how blockchain works, create smart contracts, and build decentralized apps (dApps) on Ethereum.",
    "image": "https://images.unsplash.com/photo-1642104704075-d6a4e7b0fdf5"
  },
  {
    "id": 10,
    "title": "DevOps & CI/CD Pipeline",
    "description": "Automate deployments using Docker, Kubernetes, and GitHub Actions. Learn how to manage scalable applications efficiently.",
    "image": "https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
  }
]


const Courses = () => {
const dispatch = useDispatch()
const {course} = useSelector(store => store.course)

  useEffect(()=>{
    const getAllPublishedCourse = async ()=>{
      try {
        const res = await axios.get(`http://localhost:8080/api/course/published-courses`, {withCredentials:true})
        if(res.data.success){
           dispatch(setCourse(res.data.courses))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllPublishedCourse()
  })

  return (
    <div className='bg-gray-100 pt-14'>
      <div className='min-h-screen max-w-7xl mx-auto py-10'>
        <div className='px-4'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>Our Courses</h1>
          <p className='text-center text-gray-600 max-w-2xl mx-auto mb-10'>
            Learnova's courses blend industry-expert instruction, hands-on projects, and practical assessments to help you build job-ready skills fast. Each path is designed with clear milestones, real-world examples, and personalized feedback so learners at any level can progress confidently—from foundational concepts to advanced applications.
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              course?.map((course)=>{
               return <CourseCard course={course} />
              })
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses