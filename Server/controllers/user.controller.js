const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getDataUri = require('../utils/dataUri');
const cloudinary = require('../utils/cloudinary');



const registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ 
                success: false,
                message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password:hashedPassword, role });
       return res.status(201).json({ 
            success: true,
            message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Server Error' });
             
    }
}

const loginUser = async (req, res) => {
    // Login logic here
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ 
                success: false,
                message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ 
                success: false,
                message: 'Invalid credentials' });
        }
      
            const token = jwt.sign(
                { userId: user._id},
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
           return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge:1*24*60*60*1000 }).status(200).json({ 
                success: true,
                message: `Login successful ${user.name}`,
               user, token });

    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Server Error' });
    }
}

const logoutUser = (req, res) => {
    try{
         return res.status(200).cookie('token', '', {maxAge:0 }).json({ 
            success: true,
            message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out user:', error.message);
        res.status(500).json({  
            success: false,
            message: 'Server Error' });
    }

   
}

const updateProfile = async(req, res) =>{
    try{
        const { name, description } = req.body;
        const userId = req.id; 
        const file = req.file;

        const fileUrl = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
     const user = await User.findById(userId).select('-password');
     if(!user){
        return res.status(404).json({  
            success: false,
            message: 'User not found' });
     }

     if(name) user.name = name;
     if(description) user.description = description;
    if(file)user.photoUrl = cloudResponse.secure_url;

     await user.save();
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user
        });


    }catch(error){
        console.error('Error updating profile:', error.message);
        res.status(500).json({  
            success: false,
            message: 'Server Error' });
}
}

// const updateProfile = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const userId = req.id; // ensure your auth middleware sets req.id (or change accordingly)
//     const file = req.file;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });

//     let cloudResponse;
//     if (file) {
//       // getDataUri returns an object from datauri/parser; use .content string
//       const fileUri = getDataUri(file);
//       // fileUri.content is like 'data:image/png;base64,AAA...'
//       cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//       user.photoUrl = cloudResponse.secure_url;
//     }

//     if (name) user.name = name;
//     if (description) user.description = description;

//     await user.save();
//     return res.status(200).json({ success: true, message: 'Profile updated successfully', user });
//   } catch (error) {
//     console.error('Error updating profile:', error.message);
//     res.status(500).json({ success: false, message: 'Server Error' });
//   }
// };



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateProfile
};