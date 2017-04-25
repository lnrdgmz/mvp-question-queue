angular.module('app', [])

  .controller('QuestionViewController', function ($http, $scope, $interval) {
    $scope.questions = [];
    $scope.getQuestions = function () {
      $http.get('http://localhost:3000/questions')
        .then(function (res) {
          console.log(res.data);
          $scope.questions = res.data;
        });
    };
    $scope.getQuestions();
    $interval($scope.getQuestions, 5000);
  })
  .controller('FormController', function ($scope) {
    $scope.myAlert = function (str) {
      alert(str);
    };
  });
