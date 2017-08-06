const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const dir = path.dirname(__dirname);
const decode = require(path.join(dir,'/Steganography/','decode.js'));
const multer_storage = require(path.join(dir,'/util/','multer-storage.js'));
const storage = multer_storage.storage;
const upload = multer_storage.upload;
const router = express.Router();

router.get('/decrypt', function(req, res) {
  res.sendFile(__dirname + '/views/decrypt.html');
});
router.post('/', upload.any() ,function(req, res) {
  var file = req.files[0].filename;
  var password = req.body.password;
  decode.decode(path.join(dir,'/uploads/' + file),password, function(msg) {
     res.end(msg);
  });
});


module.exports = router;
