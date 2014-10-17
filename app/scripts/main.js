var template = _.template($('#chat').html()); // grab the template
var apiUrl   = 'http://tiny-pizza-server.herokuapp.com/collections/AM-Chat';
//Our api url
var button = document.getElementById('button');

button.onclick = function() {
    var div = document.getElementById('wrapper');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
};


$('.message-input input[type=submit]').on('click', function (event) {
  //Whenever the user clicks the create button in the form

  event.preventDefault(); //Dont let the browser submit the form

  var fieldValues = $('input.field').serializeArray();

  //Turn everything into an array of js objects and not DOM objects

  var messageObject = {}; // Create me an empty object


  fieldValues.forEach(function (field) {
    messageObject[field.name] = field.value;
  });
  //Fill my form object with the name:value pair of each form field.

  $.ajax({
    method: 'POST',
    url: apiUrl,
    data: messageObject
    //Send a POST request to our API to save the data from the form.
  }).done(function (data) { $('input.field').val('') });
  //Clear all the data in the form after its done.
});


var previousCount = 0;

setInterval(function () {
  $.ajax({url: apiUrl}).done(function (allTheChats) {
  // Do a GET request on our API to return all previously saved TODOs
     if(allTheChats.length > previousCount) {
       console.log(allTheChats);

        previousCount = allTheChats.length;

        var finishedTemplates = _.map(allTheChats, function (chat) {
          return template(chat);
        });

        $('#chats').html(finishedTemplates);
     }

     //Map over every todo we have and turn it into a template

     //Replace the contents of our todos container with all of the template-ed todos
   })
}, 1000);
//Everyone 1s run this anonymous function
