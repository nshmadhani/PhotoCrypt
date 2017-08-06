const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const dir = path.dirname(__dirname);
const encode = require(path.join(dir,'/Steganography/','encode.js'));
const multer_storage = require(path.join(dir,'/util/','multer-storage.js'));
const storage = multer_storage.storage;
const upload = multer_storage.upload;
const router = express.Router();

router.get('/',function(req,res,next) {
   res.sendFile(path.join(dir,'/views/','home.html'));
});

router.post('/',upload.any(),function(req,res,next){
   var plain_text = req.body.plain_text;
   var image = req.files[0];
   var password = req.body.password;
   var new_img = Date.now()+'.png';
   encode.encode(path.join(dir,'/uploads/',image.originalname),plain_text,path.join(dir,'/downloads/',new_img),password,function(data){
     var download = fs.readFileSync(path.join(dir,'/views/','download.html')).toString('utf8');
     download = download.replace('%%img_to_download%%','/downloads/'+new_img);
     res.send(download);
   });
});

module.exports = router;
