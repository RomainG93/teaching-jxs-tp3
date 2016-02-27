var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co";

pokeApp.factory('pokeInfo', ['$resource', function($resource) {
  return {
    get: function(pokename) {
      var url = pokeApiUrl + '/api/v1/pokemon/' + pokename.pokename;
      return $resource(url, {}, {
        query: { method: 'GET', params: {}, isArray: false }
      });

    }
  }
}]);

pokeApp.factory('share', function($rootScope) {
  var pok = {
    name: '',
    setName: function(name) {
      pok.name = name;
      console.log(('set: ' + pok.name));
    },
    getName: function() {
      return pok.name;
    }

  };

  return pok;
});

pokeApp.controller('pokemonSearchController', ['$scope', '$log', '$http', 'share', function($scope, $log, $http, share) {
  $scope.$log = $log;
  var _id = 0;
  var _list = [];
  var _name = '';
  $scope.pokemon = {
    id: function(newId) {
      return arguments.length ? (_id = newId) : _id;
    },
    list: function(){
      return _list;
    },
    name: function(newName){
      if(arguments.length){
        _name = newName;
        if($.inArray(newName, _list) != -1){
          share.setName(newName);
        }
        return true;
      }else{
        return _name;
      }
      //return arguments.length ? (_name = newName) : _name;
    }
  };
  $scope.fetch = function() {
    $scope.code = null;
    $scope.response = null;
    $scope.method = 'GET';
    var log = [];
    $http({method: $scope.method, url: pokeApiUrl + '/api/v1/pokedex/1'}).
    then(function(response) {
      angular.forEach(response.data.pokemon, function(value, key) {
        this.push(value.name);
      }, log);
      $scope._list = log;
      _list = log;
      /*$scope.status = response.status;
      $scope.data = response.data;*/
    }, function(response) {
    });
  };
  $scope.searchFilter = function (item) {
    item2 = $scope.pokemon.name().charAt(0).toLowerCase() + $scope.pokemon.name().slice(1);
    return item.indexOf(item2) > -1;
  };
}]);

pokeApp.controller('pokemonShowDetail', ['$scope', '$log', 'pokeInfo', 'share', function($scope, $log, pokeInfo, share) {
  $scope.$log = $log;
  $scope.pokeDetails = '';
  var _id = 0;
  var _moves = [];
  var _name = '';
  var _sprite = '';
  $scope.detail = {
    id: function() {
      return _id;
    },
    moves: function(){
      return _moves;
    },
    name: function(){
      return _name;
    },
    sprite: function(){
      return _sprite;
    }
  };

  $scope.go = function(newVal) {
    _name = newVal;
    $scope.pokeDetails = pokeInfo.get({pokename: _name}).query(function(data){
      _id = data.pkdx_id;
      _moves = [];
      //_sprite = pokeApiUrl + data.sprites[0].resource_uri;
      //console.log(data);
      angular.forEach(data.moves, function(value, key) {
        this.push({"name": value.name, "learn_type": value.learn_type})
      }, _moves);
    });
  };
  $scope.$watch(function () {
       return share.name;
     },
      function(newVal) {
        $scope.go(newVal);
    }, true);

}]);
