var myNinjaApp = angular.module('myNinjaApp', ['ngRoute','ngAnimate']);

myNinjaApp.config(['$routeProvider','$locationProvider', function($routeProvider){
    
    $locationProvider.html5mode(true);
    
    $routeProvider

        .when('/home', {
            templateUrl: 'views/home.html',
            controller:'NinjaController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'NinjaController'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);
myNinjaApp.directive('randomNinja', [function(){
    return {
        //you can only use A attribute or E = element 
        restrict: 'E',
        scope: {
            ninjas:'=',
            title:'='
        },
        templateUrl:'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope){
            $scope.randomNinja = Math.floor(Math.random()*4);
        }
    };
}]);
myNinjaApp.controller('NinjaController', ['$scope', function($scope, $http){
    $scope.removeNinja = function(ninja){
        var removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja,1);
        
    };
    $scope.addNinja = function(){
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            available: true
        });
        $scope.newninja.name="";
        $scope.newninja.belt="";
        $scope.newninja.rate="";

    };

    $scope.removeAll = function(){
        $scope.ninjas = [];
    };

    $http.get('data/ninjas.json').success(function(data){
        $scope.ninjas = data;
    });

    $scope.ninjas = [
    {
        name: "Yoshi",
        belt: "green",
        rate: 50,
        available: true,
        thumb : "content/img/boy.png"
    },    
    {
        name: "Crystal",
        belt: "Yellow",
        rate: 30,
        available: true,
        thumb : "content/img/man.png"
    },
    {
        name: "Ryu",
        belt: "orange",
        rate: 10,
        available: false,
        thumb : "content/img/profile.png"
    },
    {
        name: "shaun",
        belt: "black",
        rate: 1000,
        available: true,
        thumb : "content/img/user.png"
    }
    ];
    console.log(angular.toJson($scope.ninjas));
}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location){
    $scope.sendMessage = function(){
        $location.path('/contact-success');
    };
}]);