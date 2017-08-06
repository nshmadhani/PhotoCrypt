var express = require('express');
var router = express.Router();
const path = require('path');
const dir = path.dirname(__dirname);
const views = path.join(dir,'/views/');
/* GET home page. */
router.get('/', function(req, res, next) {
   res.sendFile(path.join(views,'index.html'));//index.html
});
module.exports = router;
