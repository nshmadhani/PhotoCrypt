 var jimp = require('jimp');
 var fs = require('fs');
 var path = require('path');
 var dir = path.dirname(__dirname);
 var async = require('async');
 var crypt = require(path.join(dir,'/util/','crypt.js'));
 function encode (orig_img,msg,stegan_path,password,callback) {
  console.log(msg);
  msg = crypt.encrypt(msg,password);
  console.log('The new message is '+msg);
 	msg = new Buffer(msg,'hex');
  async.series([
    function(cb) {
      jimp.read(orig_img,function(err,stegan_img) {
         //console.log(stegan_img);
    	   var length_buffer = toBytesInt32(msg.length);
     	   //Encode the length
     	   var msg_bits = 32+msg.length*8;
     	   var total_pixels = stegan_img.bitmap.width*stegan_img.bitmap.height;
     	   if( msg_bits > total_pixels) {
     	      cb('There is not enough Space in the Image to Encrypt the Text');
     	      return;
         }
     	   stegan_img = encode_text(stegan_img, length_buffer, 0);
     	   //Encode the msg
     	   stegan_img = encode_text(stegan_img, msg, 32);
     	   stegan_img.write(stegan_path);
         console.log('Finished Encoding');
         cb('sucess');
    	});
    }
  ],function(err,results){
       console.log('The Call Back');
       callback(results);
  });
}
 function encode_text(image,msg,offset) {
    var pixel = offset;
    for(var i=0;i<msg.length;i++) {
    	var current_byte = msg.readInt8(i);
    	for(var bit=7;bit>=0;bit--,pixel++) {
    		var lsb  = (current_byte >>> bit) & 1;
    		image = add_bit(image,pixel,lsb);
    	}
    }
    return image;
}
function add_bit(image,pixel,lsb) {
	var x = pixel%image.bitmap.width;
	var y = pixel/image.bitmap.width;
	var idx = image.getPixelIndex(x,y);
	var r = image.bitmap.data[ idx + 0 ];
    var new_r = (r & 0xFE) | lsb;
    var str = pixel+".Old Byte = "+r.toString(2) + "  New Byte = "+new_r.toString(2)+"\r\n";
    //console.log(str);
    image.bitmap.data[ idx + 0 ] = new_r;
    return image;
}
function toBytesInt32 (num) {
    var buf = new Buffer(4);
	buf.writeUInt8((num & 0xff000000) >> 24, 0);
	buf.writeUInt8((num & 0x00ff0000) >> 16, 1);
	buf.writeUInt8((num & 0x0000ff00) >> 8, 2);
	buf.writeUInt8((num & 0x000000ff), 3);
	return buf;
}

module.exports.encode = encode;
// encode('C:/Do.png','Yash Mehta sjbdaklsdnl','Steg.png','password',function() {
//      console.log('After Encoding')
// });
