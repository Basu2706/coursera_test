( function() {
  'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope){
    $scope.items="";
    $scope.checkItems="";
    $scope.pickColor="";
    $scope.lunchCheck = function() {
      var count=0;
      //count=$scope.items.split(',').length;
      count=$scope.items.split(',').filter((i)=>i.trim().length).length
      //console.log(count);
      //console.log($scope.items.split(',').filter((i)=>i.trim().length).length);

      if (count ==0 ) {
        $scope.checkItems= "Please enter data first";
        $scope.pickColor="red";
      }else if (count<=3) {
        $scope.checkItems= "Enjoy!";
        $scope.pickColor="green";
      }else if (count>3) {
        $scope.checkItems= "Too much!";
        $scope.pickColor="green";
      }
    };
  }

})();
