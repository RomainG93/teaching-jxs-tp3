var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/";

pokeApp.controller('pokemonSearchController', ['$scope', function($scope) {
  var _id = 0;
  var _list = ['pikachu', 'Miaousse', 'Carapuce', 'Salameche'];
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
}]);
