const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated')
const singleUpload = require('../middleware/multer');
const getDataUri = require('../utils/dataUri');
const cloudinary = require('../utils/cloudinary')
const router = express.Router();


// router.route("/upload-video").post(singleUpload, async(req, res)=>{
//     try {
//         const file = req.file
//         const fileUrl = getDataUri(req.file)

//         const result = await cloudinary.uploader.upload(fileUrl.content, {
//             resource_type:"video"
//         })

//         res.status(200).json({
//             success:true,
//             message:"File uploaded successfully",
//             data:result
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success:false,
//             message:"Error uploading file"
//         })
//     }
// })

router.route("/upload-video").post(singleUpload, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const fileUrl = getDataUri(req.file);

        const result = await cloudinary.uploader.upload(fileUrl.content, {
            resource_type: "video",
            secure: true
        });

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            videoUrl: result.secure_url,   // Always HTTPS
            publicId: result.public_id
        });

    } catch (error) {
        console.log("Cloudinary Upload Error:", error);
        res.status(500).json({
            success: false,
            message: "Error uploading file",
            error: error.message
        });
    }
});


module.exports = router;


