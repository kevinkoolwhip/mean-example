angular.module('authService', [])
    .factory('Auth', function($http,$q,$window, AuthToken){
        var authFactory = {};
        authFactory.login = function(username, password)	{
            return $http.post('/authenticate',{
                    username: username,
                    password: password
                })
                .success( function(data)	{
                    AuthToken.setToken(data); //and User name
                    return data;
                });
        };
        authFactory.logout = function()	{
            //clear the token
            AuthToken.setToken();
        };
        authFactory.isLoggedIn = function()	{
            if (AuthToken.getToken() != null)
                return true;
            else
                return false;
        };
        //	get the logged in user
        authFactory.getUser = function() {
            return $http.get('/api/me').then(function(data){
                    return data.data;
                }, function err(response){
                    return response;
                }

                /*if(success){

                 }
                 .then(function success(response) {
                 return (response.data);
                 }, function err(response) {
                 return ""
                 })
                 });*/
            )};
        return authFactory;

    })
    .factory('AuthToken', function($window)	{

        var authTokenFactory = {};
        authTokenFactory.getToken = function()	{
            var token =$window.localStorage.getItem('token');
            if( token != 'undefined') return token;
            else return null;
        };
        authTokenFactory.setToken = function (data)	{
            if(data){
                $window.localStorage.setItem('token',data.token);
            }
            else {
                $window.localStorage.removeItem('token');
            }};
        return authTokenFactory;
    })
    .factory('AuthInterceptor', function($q,$location,AuthToken)	{
        var interceptorFactory = {};
        interceptorFactory.request = function(config)	{
            var token = AuthToken.getToken();
            if(token)
                config.headers['x-access-token'] = token;
            return config;
        };
        interceptorFactory.responseError = function(response)	{
            if(response.status == 403)
                $location.path('/login');
            return $q.reject(response);
        };
        return interceptorFactory;
    });





