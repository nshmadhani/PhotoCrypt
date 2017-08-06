var express = require('express');
var router = express.Router();
var path = require('path');
var dir = path.dirname(__dirname);
/* GET users listing. */

router.get('/:file(*)', function(req, res, next) {
  console.log('here at donwload');
  var file = req.params.file,
  download_path = dir + '/downloads/' + file;
  res.download(download_path);
});


module.exports = router;
