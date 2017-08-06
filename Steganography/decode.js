 var jimp = require('jimp');
 var fs = require('fs');
 var path = require('path');
 var dir = path.dirname(__dirname);
 var async = require('async');
 var crypt = require(path.join(dir,'/util/','crypt.js'));
function decode(stegan_img,password,callback) {
  async.series([
     function (cb) {
       jimp.read(stegan_img,function(err,stegan_img){
         //console.log(stegan_img);
     	  var length = "";
     	  for(var i=0;i<32;i++) {
           var r = getColor(stegan_img,i,0);
     	  	var mask =  1 << 0;
           var masked_n = r & mask;
           var bit = masked_n >> 0;
     		  //str+=i+". The Byte is "+byte.toString(2)+" Bit Extracted = "+bit+'\r\n';
     		  length  += bit;
         }
         length = parseInt(length,2);
         //console.log("Length of the crypt is "+length);
         var msg = new Buffer(length);
         for(var  i=0;i<msg.length;i++) {
         	msg.writeUInt8(0,i);
         }
     	  offset = 32;
     	  for(var  i=0;i<msg.length;i++) {
     	        for(var j=0;j<8;j++,offset++) {
     	        	var old_byte = msg.readInt8(i);
                 var r = getColor(stegan_img,offset,0);
     	        	//console.log('Pixel is '+r.toString(2));
     	          msg.writeUInt8((old_byte << 1)|(r & 1),i);
     	        }
     	  }
     	  msg = crypt.decrypt(msg.toString('hex'),password);
        callback(msg);
     	});
     }
  ],function (err,result) {
    console.log(result);
  });
}
function getPixel(image,pixel) {
	var x = pixel%image.bitmap.width;
	var y = pixel/image.bitmap.width;
	var idx = image.getPixelIndex(x,y);
	return idx;
}
function getColor(stegan_img,pixel,i) {
  var idx = getPixel(stegan_img,pixel);
  var color = stegan_img.bitmap.data[idx + i];
  //console.log(color);
  return color;
}
// decode('Steg.png','password',function(data){
//   console.log(data);
// });
module.exports.decode = decode;
