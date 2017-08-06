var path = require('path');
var multer  = require('multer');
var dir = path.dirname(__dirname);

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(dir,'/uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
   storage: storage
 });

module.exports.storage = storage;
module.exports.upload = upload;
