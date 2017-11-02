angular.module('app.routes',['ngRoute'])
    // configure our routes
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '/app/views/pages/home.html',
                controller : 'homeCtrl',
                controllerAs : 'home'
            })
            .when('/login', {
                templateUrl : '/app/views/pages/login.html',
                controller   : 'mainController',
                controllerAs   : 'login'
            })
            .when('/registration',  {
                templateUrl: 'app/views/pages/registration.html',
                controller: 'userCreateController',
                controllerAs: 'user'
            })
            .when('/items', {
                templateUrl : 'app/views/pages/items.html',
                controller  : 'itemController',
                controllerAs: 'item'
            })
            .when('/item/create',{
                templateUrl : 'app/views/pages/newitem.html',
                controller  : 'newItemController',
                controllerAs: 'item'
            });
        $locationProvider.html5Mode(true);
    });