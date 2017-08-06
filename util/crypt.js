const crypto = require('crypto');
const path = require("path");
const fs = require("fs");

function encrypt(text,password) {
  console.log(password);
  var cipher = crypto.createCipher('aes192',password);
  var encrypted = cipher.update(text,'utf8','hex');
  encrypted+=cipher.final('hex');
  return encrypted;
}
function decrypt(text,password) {
  console.log(password);
  var decipher = crypto.createDecipher('aes192',password);
  var decrypted = decipher.update(text,'hex','utf8');
  decrypted+=decipher.final('utf8');
  console.log(decrypted);
  return decrypted;
}
//
// var encrypt = function(toEncrypt, pathToPublicKey) {
//     var absolutePath = path.resolve(pathToPublicKey);
//     var publicKey = fs.readFileSync(absolutePath, "utf8");
//     var buffer = new Buffer(toEncrypt);
//     var encrypted = crypto.publicEncrypt(publicKey, buffer);
//     return encrypted.toString("base64");
// };
//
// var decrypt = function(toDecrypt, pathtoPrivateKey) {
//     var absolutePath = path.resolve(pathtoPrivateKey);
//     var privateKey = fs.readFileSync(absolutePath, "utf8");
//     var buffer = new Buffer(toDecrypt, "base64");
//     var decrypted = crypto.privateDecrypt(privateKey, buffer);
//     return decrypted.toString("utf8");
// };


module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}
