angular.module('app', [])

  .controller('QuestionViewController', function ($http, $scope) {
    $scope.questions = [];
    $http.get('http://localhost:3000/questions')
      .then(function (res) {
        console.log(res.data);
        $scope.questions = res.data;
      });
  })
  .controller('FormController', function ($scope) {
    $scope.myAlert = function (str) {
      alert(str);
    };
  });
