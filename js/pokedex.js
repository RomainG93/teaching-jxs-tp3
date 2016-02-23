var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/";

pokeApp.controller('pokemonSearchController', ['$scope', '$log', function($scope, $log) {
  $scope.$log = $log;
  var _id = 0;
  var _list = ['Pikachu', 'Miaousse', 'Carapuce', 'Salameche'];
  var _name = '';
  $scope.pokemon = {
    id: function(newId) {
     return arguments.length ? (_id = newId) : _id;
   },
   list: function(){
     return _list;
   },
   name: function(newName){
     return arguments.length ? (_name = newName) : _name;
   }
  };
  $scope.searchFilter = function (item) {
    item2 = $scope.pokemon.name().charAt(0).toUpperCase() + $scope.pokemon.name().slice(1);
    return item.indexOf(item2) > -1;
};
}]);
