'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'permission', 'permission.ui',
  'angular-progress-button-styles',
  'BlurAdmin.signin',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'BlurAdmin.theme.components'

])
.factory('AuthenticationService',
    [ '$http', '$rootScope', '$timeout',
        function ( $http, $rootScope, $timeout) {
            var service = {};
            if (localStorage.getItem("loggedIn") === null) {
                console.log("inside the null");
                var loggedIn = false;
                localStorage.setItem("loggedIn", JSON.stringify(loggedIn));

            }
            else if (localStorage.getItem("isAdmin") === null) {
                var isAdmin = false;
                localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
            }
            else if (localStorage.getItem("username") === null) {
                var user = "NadunI";
                localStorage.setItem("username", JSON.stringify(user));
            }
            else if (localStorage.getItem("token") === null) {
                var token = "NadunI";
                localStorage.setItem("token", JSON.stringify(token));
            }

            service.isLoggedIn = function(){
                console.log("1 st in isloggedin = " + localStorage.loggedIn);
                console.log("inside the isloggedin = " + JSON.parse(localStorage.loggedIn));
                var login = JSON.parse(localStorage.loggedIn);
                if (login){
                    return true;
                }
                return false;
            };

            service.isAdmin = function(){
              console.log("1 st in isAdmin = " + localStorage.isAdmin);
              var admin = JSON.parse(localStorage.isAdmin);
              var login = JSON.parse(localStorage.loggedIn);

              if (admin && login){
                  return true;
              }
              return false;

            };

            service.getUser = function(){
              console.log("username is = " + localStorage.username);
              var user = JSON.parse(localStorage.username);

              return user;

            };

            service.setLoggedIn = function(state){
                console.log("setting login =  "+localStorage.loggedIn);
                console.log("inside the isloggedin = " + JSON.parse(localStorage.loggedIn));
                var loggedIn = state;
                localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
                console.log("then isloggedin = " + JSON.parse(localStorage.loggedIn));
            };

            service.setAdmin = function(state){
              var admin = state;
              localStorage.setItem("isAdmin", JSON.stringify(admin));
              console.log("then isAdmin = " + JSON.parse(localStorage.isAdmin));

            };

            service.setUser = function(user){

              localStorage.setItem("username", JSON.stringify(user));
              console.log("user is  = " + JSON.parse(localStorage.username));

            };

            service.setToken = function(token){
              console.log("token is  = " + JSON.parse(localStorage.token));
              localStorage.setItem("token", JSON.stringify(token));
              console.log("token is  = " + JSON.parse(localStorage.token));

            };

            service.getToken = function(){
              var token = JSON.parse(localStorage.token);

              return token;
            };

            return service;
  }])
.run(function($rootScope, $state,PermRoleStore, AuthenticationService) {
    PermRoleStore.defineRole('AUTHORIZED', function() {
      return AuthenticationService.isLoggedIn();
    });

    PermRoleStore.defineRole('ADMIN', function() {
      return AuthenticationService.isAdmin();
    });

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });
  })


  .factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
    //  config.headers["Authorization"] = 'application/json';
    config.headers["authorization"] ='application/json';
    return config;
    }
  };
})
.config(function ($httpProvider) {
$httpProvider.interceptors.push('httpRequestInterceptor');
})



;
