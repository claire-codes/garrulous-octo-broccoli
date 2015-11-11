angular.module('GitHubApp.controllers', []).
  controller('GitHubController', function($scope, $http) {

    $scope.searchTerm = "";
    $scope.showResults = false;

    $scope.toggleDisplay = function(event) {
      var target = angular.element(event.target);
      target.parent().find('div').css('display', 'block');
    }

    $scope.searchRepos = function() {
      $http({
          method: 'GET',
          url: 'https://api.github.com/search/repositories?q=' + $scope.searchTerm
        })
        .then(function successCallback(response) {
          var jason = angular.fromJson(response);
          $scope.totalResults = jason.data.total_count;
          $scope.showResults = true;
          $scope.results = {repos: []};
          for (var i = 0; i <= $scope.totalResults - 1; i++) {
            $scope.results.repos.push({
              name : jason.data.items[i].name,
              url: jason.data.items[i].html_url,
              forks: jason.data.items[i].forks_count,
              issues: jason.data.items[i].open_issues_count,
              stars: jason.data.items[i].stargazers_count,
              language: jason.data.items[i].language
            })
          };
         }, function errorCallback(response) {
            console.log('error');
            $scope.errorMsg = 'Something went wrong';
          });
    };
  });