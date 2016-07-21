/**
 * 
 */
 angular.module('ChatApp').service('myService',function() {
	 
    var messageText /*= 'Hello'*/;

 return {
  set:  function (data) {
		 messageText = data;
		 console.log(messageText);
  },
  get:  function () {
	  console.log(messageText);
	  return messageText;
  }
 }

});