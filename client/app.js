angular.module('app', [])
  .controller('QuestionViewController', function ($http, $scope, $interval) {
    $scope.questions = [];
    $scope.showAnswered = false;
    $scope.toggleShowAnswered = function () {
      $scope.showAnswered = !$scope.showAnswered;
    };
    $scope.getQuestions = function () {
      $http.get('http://localhost:3000/questions')
        .then(function (res) {
          console.log(res.data);
          $scope.questions = res.data;
        });
    }; 
    $scope.upvote = function (q) {
      q.votes++;
      $http.put('http://localhost:3000/questions', q)
        .then(function (res) {
          console.log(res.status);
        });
    };
    $scope.markAsAnswered = function (q) {
      q.answered = true;
      $http.put('http://localhost:3000/questions', q)
        .then(function (res) {
          console.log(res.status);
        });
    };
    $scope.getQuestions();
    $interval($scope.getQuestions, 5000);
    $scope.$on('refreshQueue', function () {
      $scope.getQuestions();
    })
  })
  .controller('FormController', function($scope, $http, $rootScope) {
    $scope.submitQuestion = function () {
      console.log($scope.question.name);
      console.log($scope.question.body);
      console.log($scope.question.link);
      $http.post('http://localhost:3000/questions', {
        name: $scope.question.name,
        question: $scope.question.body,
        link: $scope.question.link
      })
        .then(function (res) {
          console.log(res.status);
          $rootScope.$broadcast('refreshQueue');
        });
      $scope.question = {};
    };
  });
