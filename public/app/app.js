/**
 * Created by work on 11/2/17.
 */


angular.module('inventoryApp',['ngAnimate',
    'app.routes',
    'authService',
    'userService',
    'itemService',
    'mainCtrl',
    'userCtrl',
    'itemCtrl'
    ])
    .config(function($httpProvider)	{
        //attach our auth inteceptor to the http requests
        $httpProvider.interceptors.push('AuthInterceptor');
    });