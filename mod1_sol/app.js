(function () {
    'use strict';
    
    angular.module('Mod1', [])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
      $scope.items = "";
      $scope.result = "";
      $scope.pos='err'
      $scope.check = function () {
          var lenght = $scope.items.length

        if( lenght>0)
      {
        
        var items =  $scope.items.split(',')
        var ilength = items.length
        items.forEach(item => {
            if(!item){
                ilength = ilength-1
            }
        });
        if(ilength === 0){
            $scope.pos='err'
            $scope.result = "Please Enter data first"
            return 
        }
        if(ilength>3)
        {   
            $scope.result = "Too much !"

        }
        else{
            $scope.result = "Enjoy !"
        
        }
        $scope.pos='res'
      }
      else{
        $scope.pos='err'
        $scope.result = "Please Enter data first"
      }
     
      }
        
    }
    
    })();
    