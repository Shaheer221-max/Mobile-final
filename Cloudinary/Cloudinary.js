const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dwsshphcb', 
    api_key: '133955367317112', 
    api_secret: 'zZQ0oNg92wPTWpBy58zMyhD8nr4' 
  });

  module.exports = cloudinary;