angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('stopWatchCtrl', function($scope, $timeout){
  $scope.btnPlay = true;
  $scope.btnPause = false;
  $scope.btnResume = false;
  $scope.value = 0;
  $scope.second = 0;
  $scope.minute = 0;
  $scope.hour = 0;
  $scope.ms = 10;

  function countdown() {
    $scope.value++;
    $scope.timeout = $timeout(countdown, $scope.ms);
    if ($scope.value === 100) {
      $scope.value = 0;
      $scope.second++;
    }if ($scope.second === 60) {
      $scope.second = 0;
      $scope.minute++;
    }if ($scope.minute === 60) {
      $scope.minute = 0;
      $scope.hour++;
    };
  };

  $scope.pause = function(){
    $scope.btnPlay = false;
    $scope.btnPause = false;
    $scope.btnResume = true;
    $scope.value = $scope.value;
    $timeout.cancel($scope.timeout);
  };

  $scope.resume = function() {
    $scope.btnPlay = false;
    $scope.btnPause = true;
    $scope.btnResume = false;
    $timeout.cancel($scope.timeout);
    countdown();
    $scope.value = $scope.value;
  };

  $scope.start = function() {
    $scope.btnPlay = false;
    $scope.btnPause = true;
    $scope.btnResume = false;
    $timeout.cancel($scope.timeout);
    countdown();
    $scope.value = 0;
    $scope.second = 0;
    $scope.minute = 0;
    $scope.hour = 0;
  };

  $scope.stop = function() {
    $scope.btnPlay = true;
    $scope.btnPause = false;
    $scope.btnResume = false;
    $timeout.cancel($scope.timeout);
  };

  $scope.reset = function(){
    $scope.btnPlay = true;
    $scope.btnPause = false;
    $scope.btnResume = false;
    $timeout.cancel($scope.timeout);
    $scope.value = 0;
    $scope.second = 0;
    $scope.minute = 0;
    $scope.hour = 0;
  };
  
  $scope.data = [];
  $scope.number = 0;
  $scope.add = function (){
    $scope.number++;
    $scope.data.push({num : $scope.number, value : $scope.value, second : $scope.second, minute : $scope.minute, hour : $scope.hour}); 
  };

  $scope.remove = function(array, index){
    array.splice(index, 1);
  };

  $scope.clear = function(array){
    array.splice(array);
    $scope.number = 0;
  }
});