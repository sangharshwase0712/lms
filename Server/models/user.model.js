const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {  
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  description:{
    type: String,
   
  },
  role:{
    type: String,
    enum: ['student', 'instructor'],

  },
  photoUrl:{
    type: String,
    default: '',
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

