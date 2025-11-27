// const DataUriParser = require("datauri/parser");
// const path = require("path");



// const parser = new DataUriParser();

// const getDataUri = (file) => {
//     const extName = path.extname(file.originalname).toString();
//     return parser.format(extName, file.buffer);
// }

// module.exports = getDataUri;


const DataUriParser = require ('datauri/parser');
const path = require('path');

const parser = new DataUriParser();

const getDataUri = (file) => {

  const extName = path.extname(file.originalname).toString();
  // parser.format returns an object with .content property (data URI string)
  return parser.format(extName, file.buffer);
};

module.exports = getDataUri;
