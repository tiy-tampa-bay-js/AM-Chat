var template = _.template($('#chat').html()); // grab the template
var sideTemplate = _.template($('#person').html()); // grab the template

var apiUrl   = 'http://tiny-pizza-server.herokuapp.com/collections/AM-Chat';
var messageObject = {}; // Create me an empty object
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

$('#formPop input[type=submit]').on('click', function (event) {
  event.preventDefault(); //Dont let the browser submit the form

  var loginValues =  $('input.userName').serializeArray();

  //Turn everything into an array of js objects and not DOM objects

  loginValues.forEach(function (userName) {
    messageObject[userName.name] = userName.value;
  });


  $('.message-input input[type=submit]').on('click', function (event) {
    //Whenever the user clicks the create button in the form

    event.preventDefault(); //Dont let the browser submit the form
    var sentAt = new Date();
    messageObject['sentAt'] = sentAt;

    var fieldValues = $('input.field').serializeArray();
    fieldValues.forEach(function (field) {
      messageObject[field.name] = field.value;
    });


      console.log(messageObject);
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
          if (_.isUndefined(chat.message)) {
            chat.message = " "
          }
          if (_.isUndefined(chat.user)){
            chat.user = " "
          }
          if (_.isUndefined(chat.sentAt)){
            chat.sentAt = " "
          }
          return template(chat);

        });

        $('#chats').html(finishedTemplates);
      }
   }) // ajax call end
}, 1000); // end of set interval

// setInterval(function () {
//   $.ajax({url: apiUrl}).done(function (allThePersons) {
//      if(allThePersons.length > previousCountAgain)  {
//        console.log(allThePersons);
//
//        previousCountAgain = allThePersons.length;
//
//       var sideTemplateFinished = _.map(allThePersons, function (person) {
//         return sideTemplate(person);
//       });
//
//       $('#persons').html(sideTemplateFinished);
//     //}
//   })
// }, 1000); // end of set interval
}); //superend from line 21
