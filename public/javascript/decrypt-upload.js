var $form = $('#uploadForm');
var $fileSelect = $('#file-select');
$("#uploadForm").submit(function(event) {

  /* stop form from submitting normally */
  event.preventDefault();
  /* get the action attribute from the <form action=""> element */
  var $form = $( this ),
      url = $form.attr('action'),
      files = $fileSelect[0].files,
      formData = new FormData();
  console.log(files);
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    // Check the file type.
    if (!file.type.match('image.*')) {
      continue;
    }
    // Add the file to the request.
    formData.append('image', file, file.name);
  }
  console.log(formData);
  console.log($form);
  var opts = {
     url: '/decrypt',
     data: formData,
     cache: false,
     contentType: false,
     processData: false,
     type: 'POST',
     success: function(data){
                 $('#show-msg').html(data);
              }
   };
  $.ajax(opts).done(function(data) {
        // using the done promise callback
        // log data to the console so we can see
        console.log(data);
        // here we will handle errors and validation messages
    });
});
