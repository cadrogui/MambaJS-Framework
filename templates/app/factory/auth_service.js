'use strict';

(function() {
  angular
      .module('App')
      .factory('AuthService', AuthService)

  AuthService.$inject = ['$http', '$q', 'APP_CONSTANTS'];

  function AuthService($http, $q, APP_CONSTANTS) {

      var service = {
          login: login,
          logout: logout,
          _csrfToken: _csrfToken,
          setCurrentUser: setCurrentUser,
          getCurrentUser: getCurrentUser,
          destroyUser: destroyUser,
          isAuthenticated: isAuthenticated,
          _setCsrfToken: _setCsrfToken,
          _getCsrfToken: _getCsrfToken
      }

      return service;

      /*
        Login()
      */

      function login(model){

        var deferred = $q.defer();
        var urls = [
                    { url: APP_CONSTANTS.URL + "auth/login" }
                   ];
        var promises = [];

        urls.forEach(function(url){
          promises.push($http({ method: "POST", url: url.url, data: model}))
        });

        $q.all(promises).then(function(data){
          deferred.resolve({
            "Login": data[0].data
          })
        })

        return deferred.promise;
      }

      /*
        Logout()
      */

      function logout(model){

        var deferred = $q.defer();
        var urls = [
                    { url: APP_CONSTANTS.URL + "auth/login" }
                   ];
        var promises = [];

        urls.forEach(function(url){
          promises.push($http({ method: "POST", url: url.url, data: model}))
        });

        $q.all(promises).then(function(data){
          deferred.resolve({
            "Login": data[0].data
          })
        })

        return deferred.promise;
      }

      /*
        _csrfToken()
      */

      function _csrfToken(){

        var deferred = $q.defer();
        var urls = [
                    { url: APP_CONSTANTS.URL + "csrfToken" }
                   ];
        var promises = [];

        urls.forEach(function(url){
          promises.push($http({ method: "GET", url: url.url }))
        });

        $q.all(promises).then(function(data){
          deferred.resolve({
            "token": data[0].data._csrf
          })
        })

        return deferred.promise;
      };

      /*
        _setCsrfToken()
      */

      function _setCsrfToken(token){
        this.csrftoken = token
      }

      /*
        _getCsrfToken()
      */

      function _getCsrfToken(){
        return this.csrftoken;
      }

      /*
        setCurrentUser()
      */

      function setCurrentUser(model){
        this.user = model;
      }

      /*
        getCurrentUser()
      */

      function getCurrentUser(){
        return this.user;
      }

      /*
        destroyUser()
      */

      function destroyUser(){
        this.user = ''
      }

      /*
        isAuthenticated()
      */

      function isAuthenticated() {
        return !!this.user
      };

  }
})();
