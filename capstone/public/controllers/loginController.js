var authModule = angular.module('authModule', []);
authModule.controller('loginController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from login controller");
        var refresh = function(){
        $http.get("/userlist").then(function (success){
                $scope.userList = success.data;
                $scope.user = {};
            },function (error){

          });
  };
  refresh();

  $scope.login = function(username, password) {
        $http({
                method: 'GET',
                url:('/login/'+ username + '/' + password  )
        }).then(function successCallback(response) {
         if(JSON.stringify(response.data) === '[]')
         {
                $scope.isfailureMessage = true;
                if($scope.issuccessMessage)
                        $scope.issuccessMessage = false;
                console.log("No match");
         }
         else{
                console.log("Match exists");
                $scope.issuccessMessage = true;
                if($scope.isfailureMessage)
                        $scope.isfailureMessage = false;

                return response;
        }
     }, function errorCallback(response) {
   });
 };

 $scope.successMessage = function() {
        console.log("Welcome " + $scope.user.username);
        $scope.issuccessMessage = true;
};

}]);
