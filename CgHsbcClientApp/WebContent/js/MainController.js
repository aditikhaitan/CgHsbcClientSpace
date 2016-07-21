  angular.module('ChatApp').controller('postController', ['$rootScope','$http','$scope','myService', function($rootScope, $http,$scope,service) {
	 
	  
	 
	  
	$scope.initi=function(){
		
	 $scope.messages=[];
	 $scope.messageRecieved={};
	 $scope.theObject ={};
	 $scope.client_id="";
	 $scope.conversationID="";
	 $scope.load=false;
	 $scope.image1=false;
	 $scope.image2=false;
	 $scope.image3=false;
	 $scope.welcome1=false;
	 $scope.welcomeMsg=false;
	 $scope.messageBody1=service.get();
	 console.log($scope.messageBody1);
	}
	 $scope.initi();
	 
	 var theObject = { input:"" ,client_id:$scope.client_id,conversation_id: $scope.conversationID};
	 
	 
	 $scope.welcome=function(){
	 $http({
				url : 'http://localhost:8089/bluemixCode/chat/clientVerify?clientMSG='+JSON.stringify(theObject),
				method : "GET"
			}).then(function(response) {
				console.log("response is"+response.data.response);
				
				$scope.client_id=response.data.client_id;
				$scope.conversationID=response.data.conversationID;
				$scope.image1=true;
				$scope.messageDefault =response.data.response[0];
				$scope.welcomeMsg=true;
				//alert($scope.messageDefault);
			}, function(response) {
				//fail case
				$scope.message = response;
			});
	 
	 };
	 
		  $scope.checkIfEnterKeyWasPressed = function($event){
		    var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13) {
		    	if(!$scope.messageBody==""||!$scope.messageBody==undefined){
		        // Do that thing you finally wanted to do
		    	$scope.sendPost();
		    }
		    }

		  };
	 		
	 
	 
	 $scope.beforeClick=function() {
		 
		 if(!$scope.messageBody==""){
			 console.log("messageBody="+$scope.messageBody);
			 $scope.messageRecieved.key=$scope.messageBody;
			 $scope.messages.push($scope.messageRecieved);
			 $scope.load=true;
			 $scope.image2=true;
				$scope.messageBody="";
				
		 }
			//alert("welcome");
			/*$scope.messageRecieved.value="";
			$scope.messageRecieved.key=$scope.messageBody;
			$scope.messages.push($scope.messageRecieved);
			$scope.messageRecieved.key="";
			$scope.load=true;*/
		};
		  
	  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
		
	  $scope.sendPost = function() {
		  console.log("inside sendPost");
			$scope.beforeClick();
			console.log($scope.messageRecieved.key);
			/*
			 $scope.load=true;*/
			var theObject = { input:$scope.messageRecieved.key ,client_id:$scope.client_id,conversation_id: $scope.conversationID};
			$http({
				url : 'http://localhost:8089/bluemixCode/chat/clientResponse?clientMSG='+JSON.stringify(theObject),
				method : "POST"
			}).then(function(response) {
				console.log("inside server");
				$scope.client_id=response.data.client_id;
				$scope.conversationID=response.data.conversationID;				
				$scope.messageRecieved.value = response.data.response[0];
				console.log($scope.messageRecieved.value);
				console.log($scope.messageRecieved.key);
				$scope.load=false;
				$scope.image3=true;
			   // $scope.messages.push($scope.messageRecieved);
				$scope.messageRecieved={};
				
			}, function(response) {
				//fail case
				$scope.message = response;
			});

		  };
		  $scope.previous=function(){
				 console.log($scope.messageBody1);
				 if($scope.messageBody1==""||$scope.messageBody1==undefined){
					 console.log("undefined");
					 $scope.welcome();	 
					 }
				 else if(!$scope.messageBody1==""){
					 console.log("messageBody="+$scope.messageBody1);
					 console.log($scope.messageBody1);
					 $scope.messageBody=$scope.messageBody1;
					 $scope.welcomeMsg=false;
					 console.log($scope.messageBody);
					 $scope.sendPost();
						
				 }
			 };
			 
			 $scope.previous();
    }]);