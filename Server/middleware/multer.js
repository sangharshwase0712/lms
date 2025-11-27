 // const multer = require("multer");


// const storage = multer.memoryStorage();

// const singleUpload = multer({ storage }).single('file');

// module.exports = singleUpload;  

const multer = require('multer');

const storage = multer.memoryStorage();

// use field name "file" (change if your frontend uses another name)
const singleUpload = multer({ storage }).single('file');

module.exports = singleUpload;
