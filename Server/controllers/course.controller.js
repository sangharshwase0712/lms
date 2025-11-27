const Course = require('../models/course.model');
const getDataUri = require('../utils/dataUri');
const cloudinary = require('../utils/cloudinary')
const Lecture = require('../models/lecture.model')


const createCourse = async (req, res) => {
    try{
        const {courseTitle, category} = req.body || {};

        if(!courseTitle || !category){
            return res.status(400).json({
                success:false,
                message: "Course title and category are required"
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        });
        return res.status(201).json({
            success:true,
            message: "Course created successfully",
            course
        });
    }catch(err){
        console.log("Error creating course:", err);
        return res.status(500).json({
            success:false,
            message: "Internal server error"
        });
    }
}




const getPublishedCourse = async(req, res)=>{
    try{
        const courses = await Course.find({isPublished:true}).populate({ path:"creator", select:"name photoUrl description" });
        if(!courses){
            return res.status(404).json({
                success:false,
                message: "No published courses found"
            });
        }
        return res.status(200).json({
            success:true,
            courses
        });
    }catch(err){
        console.log("Error fetching published courses:", err);
        return res.status(500).json({
            success:false,
            message: "Internal server error"
        });
    }
}

const getCreatorCourses = async(req, res)=>{
    try{
        const userId = req.id;
        const courses = await Course.find({creator: userId}).populate('lectures');
        if(!courses){
            return res.status(404).json({
                success:false,
                message: "No courses found for this creator",
                courses:[],
            });
        }
        return res.status(200).json({
            success:true,
            courses,
        });
    }catch(err){
        console.log("Error fetching creator courses:", err);
        return res.status(500).json({
            success:false,
            message: "Internal server error"
        });
    }
}

const editCourse = async(req, res)=>{
    try{
    const courseId = req.params.courseId;
    const {courseTitle, subTitle, description, category, courseLevel, coursePrice} = req.body
    const file = req.file;

    let course = await Course.findById(courseId).populate('lectures');
    if(!course){
        return res.status(404).json({
            message:"Course not found"
        })
    }
    let courseThumbnail;
    if(file){
        const fileUri = getDataUri(file);
        courseThumbnail = await cloudinary.uploader.upload(fileUri.content)
    }
    const updateData = {courseTitle, subTitle, description, category, courseLevel, coursePrice, 
        courseThumbnail:courseThumbnail?.secure_url
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {new:true})
    return res.status(200).json({
        success:true,
        course,
        message:"Course Updated successfully"
    })
    }catch(error){
        console.error(error)
       return res.status(500).json({
        message:"failed to update course",
        success:false
       })
    }
}

const getCourseById = async(req, res)=>{
    try{

     const {courseId} = req.params;
     const course = await Course.findById(courseId)
     if(!course){
        return res.status(404).json({
            message:"Course not found",
            success:false,
            
        })
     }
        return res.status(200).json({
            success:true,
            course
        })


    }catch(err){
         console.error(error)
       return res.status(500).json({
        message:"failed to update course",
        success:false
       })
    }
}


//Lecture Controller

const createLecture = async(req, res)=>{
    try{
        const {lectureTitle} = req.body;
        const {courseId} = req.params;

        if(!lectureTitle || !courseId){
            return res.status(400).json({
                message:"Lecture Title is required"
            })
        }

        const lecture = await Lecture.create({lectureTitle});
        const course = await Course.findById(courseId)
        if(course){
            course.lectures.push(lecture._id)
            await course.save()
        }
        return res.status(201).json({
            success:true,
            lecture,
            message:"Lecture created successfully"

        })

    }catch(error){
        console.log(error)
       return res.status(500).json({
 message:"failed to create lecture"
        })
    }
}

const getCourseLecture = async(req, res)=>{
    try{
       const {courseId} = req.params;
       const course = await Course.findById(courseId).populate('lectures');
       if(!course){
        return res.status(404).json({
            message:"course not found"
        })
       }
       return res.status(200).json({
        success:true,
        lectures:course.lectures
       })
    }catch(error){
        console.log(error)
        res.status(500).json({
 message:"failed to get lecture"

        })
    }
}

const editLecture = async(req, res)=>{
    try {
        const {lectureTitle, videoInfo, isPreviewFree} = req.body
        const {courseId, lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId)
        if (!lecture) {
            return res.status(404).json({
                message:"Lecture Not Found!"
            })
        }


        if(lectureTitle) lecture.lectureTitle = lectureTitle
        if(videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl
        if(videoInfo?.publicId) lecture.publicId = videoInfo.publicId
        lecture.isPreviewFree = isPreviewFree

  await lecture.save()

  const course = await Course.findById(courseId);
  if(course && !course.lectures.includes(lecture._id)){
    course.lectures.push(lecture._id);
    await course.save()
  }


  return res.status(200).json({
    success:true,
      lecture,
    message:"Lecture updated successfully"
  })

    } catch (error) {
        console.log(error)
          res.status(500).json({
 message:"failed to get lecture"

        })
    }
}

const removeLecture = async(req, res)=>{
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found!"
            })
        }

        await Course.updateOne(
            {lectures: lectureId},
            {$pull:{lectures: lectureId}}
        );
        return res.status(200).json({
            success:true,
            message:"Lecture removed successfully"
        })
    } catch (error) {
         console.log(error)
          res.status(500).json({
 message:"failed to remove lecture"

        })
    }
}


const togglePublishedCourse = async (req, res) =>{
    try {
        const {courseId} = req.params;
        const {publish} = req.query;
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message:"Course not found!"
            })
        }
        course.isPublished = !course.isPublished
        await course.save()


        const statusMessage = course.isPublished ? "Published" : "UnPublished"
        return res.status(200).json({
            success:true,
            message:`Course is ${statusMessage}`
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Course not found"
        })
    }
}

module.exports = {
    createCourse,
    getPublishedCourse,
    getCreatorCourses,
    editCourse,
    getCourseById,
    createLecture,
    getCourseLecture,
    editLecture,
    removeLecture,
    togglePublishedCourse
}