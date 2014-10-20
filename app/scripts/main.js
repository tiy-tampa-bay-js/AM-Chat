var template = _.template($('#chat').html()); // grab the template
var sideTemplate = _.template($('#person').html());
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

  $.ajax({
    method: 'POST',
    url: apiUrl,
    data: messageObject
    //Send a POST request to our API to save the data from the form.
  }).done(function (data) { $('input.field').val('') });
  //Clear all the data in the form after its done.
  });


  var previousCount = 0;

  var messageList = function () {
    $.ajax({url: apiUrl}).done(function (allTheChats) {

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
        }); // closes map function

        $('#chats').html(finishedTemplates);

      }// closes if all the chats.length statement
   }) // ajax call end for allthechats
  };// end of messageList

  var peopleList = function () {
/*  $.ajax({url: apiUrl}).done(function (allThePersons) {
        var finishedSideTemplates = _.map(allThePersons, function (person) {
          if (_.isUndefined(person.user)){
            person.user = " "
          }
          return sideTemplate(person);
        });

        $('#persons').html(finishedSideTemplates);

     });//closes ajax for allthepersons
   };// end function peopleList
*/
   //--------------- TRIAL ----------------
   $.ajax( {url: apiUrl} ).done(function (allThePersons) {

      var userCount = _.countBy(allThePersons, function (person) {
        return person.user;
      });
      var userMessages = _.map(userCount, function (val, key) {

        return { user: key, length: val };
      });
      var sortedNames = _.sortBy(userMessages, function (mes) {
        return mes.length;
      });

      var compiledUserTemplateFinished = _.map(sortedNames.reverse(), sideTemplate);

      $('#persons').html(compiledUserTemplateFinished);
    });
  };// people List
   /*--------------- END TRIAL  ----------------*/

  setInterval(function () {
    peopleList();
    messageList();
  }, 1000); // end of set interval line 60

 }); //superend from line 21
