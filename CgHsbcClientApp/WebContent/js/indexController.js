/**
 * 
 */
angular.module('ChatApp').controller('indexController', ["$rootScope","$http","$scope","myService",function($rootScope, $http,$scope,service) {
	console.log("enter a message");

	  $scope.checkIfEnterKeyWasPressed = function($event){
	    var keyCode = $event.which || $event.keyCode;
	    if (keyCode === 13) {
	    	if(!$scope.messageRequest==""||!$scope.messageRequest==undefined){
	        // Do that thing you finally wanted to do
	    	$scope.pass();
	    	}
	    }

	  };
		
	 $scope.pass=function(){
		 console.log("inside pass");
		 window.open("NewFile.html", 'mywindow', 'width=780,height=400');
		 console.log($scope.messageRequest);
		 service.set($scope.messageRequest);
		 $scope.messageRequest="";
	}
}]);