var authModule = angular.module('authModule', []);
authModule.controller('registerController', ['$scope', '$http', function($scope, $http) {
   console.log("Hello World from register controller");
 var refresh = function(){
        $http.get("/userlist").then(function (success){
                $scope.userList = success.data;
                $scope.user = {};
            },function (error){

          });
  };
  refresh();

  $scope.addUser = function(){
        $http.post("/userlist", $scope.user).then(function (success){
                refresh();
        },function (error){
    });
  };

  $scope.removeUser = function(id){
        $http.delete('/userlist/'+id).then(function (success){
                refresh();
            },function (error){

          });
  };

  $scope.editUser = function(id){
    $http.get('/userlist/'+id).then(function (success){
      $scope.user = success.data;
      },function (error){

    });
  };

  $scope.updateUser = function(){
        console.log($scope.user._id);
    $http.put('/userlist/'+ $scope.user._id, $scope.user).then(function (success){
      console.log(success.data);
      refresh();
      },function (error){
    });
  }

  $scope.clear = function(){
    $scope.user = {};
};

}]);
