var $encryptForm = $('#encrypt_uploadForm');
var $decryptForm = $('#decrypt_uploadForm');
var $EncryptFileSelect = $('#encrypt-file-select');
var $DecryptFileSelect = $('#decrypt-file-select');
var $uploadButton = $('#upload-button');
var $key_input = $('#key_input');
var $auto_generate_checkbox = $('#auto_generate_key');
var $copy_button = $('#copy_button');
var $keyModal = $('#myModal');
var $decrypt_key_input = $('#decrypt_key_input');
console.log($copy_button);
console.log($key_input);
console.log($auto_generate_checkbox);
var password = "";
var user_password = "";

console.log($uploadButton);
/* attach a submit handler to the form */
new Clipboard('#copy_button');
function submitForm(key,cryptMethod) {
    debugger;
    var files, url;
    if (cryptMethod === 'encrypt') {
        files = $EncryptFileSelect.files;
        url = '/encrypt';
    } else {
        files = $DecryptFileSelect.files;
        url = '/decrypt';
    }
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // Check the file type.
        if (!file.type.match('image.*')) {
            continue;
        }
        // Add the file to the request.
        formData.append('image', file, file.name);
    }
    if (cryptMethod === 'encrypt') {
        formData.append('plain_text', $('#msg-area').val());
    }
    formData.append('password',key);
    var opts = {
        url: url,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data) {
            if (cryptMethod === 'encrypt'){
                $('#downloadModal').modal('show');
                $('#download-area').html(data);
            }
            else
                $('#decrypted-message').html(data);
        }
    };
    $.ajax(opts).done(function(data) {
        // using the done promise callback
        // log data to the console so we can see
        console.log(data);
        // here we will handle errors and validation messages
    });
}
function validateKey() {
  var password = $key_input.val();
  //perform some validation
  toggleModal();
  submitForm(password,'encrypt');
}
function decrypt() {
  var password  = $decrypt_key_input.val();
  console.log($decrypt_key_input);
  console.log(password);
  submitForm(password,'decrypt');
}
//$form.submit(submitForm);
function readURL(input, img_preview, input_button) {
    var id = input.getAttribute('id');
    if (id.search('encrypt') !== -1) {
        $EncryptFileSelect = input;
    } else {
        $DecryptFileSelect = input;
    }
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#' + img_preview).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function toggleModal(event) {
  $keyModal.modal('toggle');
}
$auto_generate_checkbox.change(function(evt) {
    var toggle = $key_input.prop('readonly');
    console.log('Changed');
    if (toggle) {
        $key_input.val(user_password);
        $key_input.prop('readonly', false);
    } else {
        user_password = $key_input.val();
        if (password === "") {
            password = generatePassword();
        }
        $key_input.val(password);
        $key_input.prop('readonly', true);
    }
    console.log(toggle);
});
var generatePassword = function() {
    var password = "";
    var alphaNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++)
        password += alphaNum.charAt(Math.floor(Math.random() * alphaNum.length));
    return password;
}
