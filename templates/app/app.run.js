(function () {
    angular
    .module('App')
    .run(runBlock);

    runBlock.$inject = ['$rootScope','$stateParams', '$state',
                        'AuthService', '$window'];

    function runBlock($rootScope, $stateParams, $state, AuthService, $window) {

      // AuthService._csrfToken().then(function(token){
      //   AuthService._setCsrfToken(token)
      // })

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
        var requireLogin = toState.data.requireLogin;

        if(toState.external){
          event.preventDefault();
          $window.open(toState.url, '_new');
        }

        if (toState.data.requireLogin && AuthService.isAuthenticated() === false) {
          $state.go("login")
          event.preventDefault();
        }
      });
    }

})();
