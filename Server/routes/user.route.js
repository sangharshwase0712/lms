const express = require('express');
const { registerUser, loginUser, logoutUser, updateProfile } = require('../controllers/user.controller');
const router = express.Router();
const authenticate = require('../middleware/isAuthenticated');
const singleUpload = require('../middleware/multer');



router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
 router.put('/profile/update',authenticate,singleUpload, updateProfile);



module.exports = router;