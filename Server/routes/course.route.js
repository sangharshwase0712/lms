const express = require('express');
const { createCourse, getPublishedCourse, getCreatorCourses,editCourse,getCourseById, createLecture, getCourseLecture,
    editLecture,togglePublishedCourse,
    removeLecture } = require('../controllers/course.controller');
const isAuthenticated = require('../middleware/isAuthenticated')
const singleUpload = require('../middleware/multer')
const router = express.Router();

// Route to create a new course
router.post('/', isAuthenticated, createCourse);
router.get('/published-courses', getPublishedCourse);
router.get('/', isAuthenticated, getCreatorCourses);
router.put('/:courseId', isAuthenticated,singleUpload, editCourse);
router.get('/:courseId', isAuthenticated, getCourseById);
router.post('/:courseId/lecture', isAuthenticated, createLecture);
router.get('/:courseId/lecture', isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture)
router.delete('/lecture/:lectureId', isAuthenticated, removeLecture);
router.patch('/:courseId', togglePublishedCourse);








module.exports = router;