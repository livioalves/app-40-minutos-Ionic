// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).controller('appTestCtrl', function($scope, sessionService){
    $scope.novo = true;
    
    $scope.categorias = sessionService.get("categorias") || ["Diversos"];
    $scope.despesas = sessionService.get("despesas") || [];
    
    $scope.Incluir = function(nomeCategoria, valor, categoria) {
    
        if (categoria && categoria != ""  ) {
            nomeCategoria = categoria;
            if ($scope.categorias.indexOf(categoria) == -1) {
                $scope.categorias.push(categoria);
                sessionService.set("categorias", $scope.categorias);
            }
        }

        $scope.despesas.push({data: new Date(), categoria: nomeCategoria, valor: valor });
        sessionService.set("despesas", $scope.despesas);
    };
    $scope.abrir = function(valor) {
        $scope.novo = valor;
    }
    $scope.apagar = function(index) {
        $scope.despesas.splice(index,1);
        sessionService.set("despesas", $scope.despesas);
    }
})
.factory('sessionService',function(){
return {
   set:function(key,value){
      return localStorage.setItem(key,JSON.stringify(value));
   },
   get:function(key){
     return JSON.parse(localStorage.getItem(key));
   },
   destroy:function(key){
     return localStorage.removeItem(key);
   },
 };
})

.filter('sumOfValue', function () {
    return function (data, key, filter, fValue) {        
        if (angular.isUndefined(data) && angular.isUndefined(key))
            return 0;        
        var sum = 0;        
        angular.forEach(data,function(value){
            if ( filter && fValue  ) {
                if ( value[filter] == fValue) {
                    sum = sum + parseFloat(value[key]);
                }
            }
            else
            {
                sum = sum + parseFloat(value[key]);
            }
            
        });        
        return sum;
}})
