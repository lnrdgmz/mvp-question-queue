angular.module('app', [])
  .controller('QuestionViewController', function ($http, $scope, $interval) {
    $scope.questions = [];
    $scope.showAnswered = false;
    $scope.toggleShowAnswered = function () {
      $scope.showAnswered = !$scope.showAnswered;
    };
    $scope.getQuestions = function () {
      $http.get('/questions')
        .then(function (res) {
          console.log(res.data);
          $scope.questions = res.data;
        });
    }; 
    $scope.upvote = function (q) {
      q.votes++;
      $http.put('/questions', q)
        .then(function (res) {
          console.log(res.status);
        });
    };
    $scope.markAsAnswered = function (q) {
      q.answered = true;
      $http.put('/questions', q)
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
      $http.post('/questions', {
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
