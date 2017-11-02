/**
 * Created by work on 11/2/17.
 */


angular.module('mainCtrl', ['authService'])

    .controller('homeCtrl', function () {
        var vm = this;
        vm.message = 'HELLO';
    })

    .controller('mainController', ['$scope', 'Auth', '$location', '$rootScope',
        function ($rootScope, Auth, $location, $scope) {
            var vm = this;
            vm.loggedIn = Auth.isLoggedIn();
            $rootScope.$on('$routeChangeStart', function () {
                vm.loggedIn = Auth.isLoggedIn();
            });
            vm.doLogin = function () {
                vm.processing = true;
                vm.error = '';
                Auth.login(vm.loginData.username, vm.loginData.password)
                    .success(function (data) {
                        vm.processing = false;

                        if (data.success) {
                            $location.path('/items');
                            Auth.getUser()
                                .then(function (data) {
                                    $scope.name = data.name;
                                })
                        }
                        else vm.error = data.message;
                    });
            };

            vm.doLogout = function () {
                Auth.logout();
                //reset all user info
                vm.user = {};
                $location.path('/login');
            }
        }]);




