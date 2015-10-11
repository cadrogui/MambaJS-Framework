(function() {
    'use strict';

    angular
      .module('App')
      .provider('Interceptors', InterceptorsProvider)

    InterceptorsProvider.$inject = ['$injector'];

    function InterceptorsProvider(){

      this.$get = Interceptors

      function Interceptors($injector){

        var q = $injector.get('$q');

        var service = {
          request: request,
          response: response,
          responseError: responseError
        }

        return service

        /*
          request
        */

        function request(config){
          var AuthService = $injector.get('AuthService');

          // Uncomment if you use a XSRF Token on each request

          // if (config.url.indexOf('jurisprudencia') === -1) {
          //   if(AuthService._getCsrfToken() != undefined){
          //     config.headers['X-XSRF-TOKEN'] = AuthService._getCsrfToken().token
          //   }
          // }

          return config;
        }

        /*
          response
        */

        function response(result){

          switch(result.status){

            case 201:
              var notify = $injector.get('notify');
              var StausCodeMessages = $injector.get('StausCodeMessages');

              notify.closeAll();
              notify(StausCodeMessages.message(result.status));
            break;

            case 204:
              var notify = $injector.get('notify');
              var StausCodeMessages = $injector.get('StausCodeMessages');

              notify.closeAll();
              notify(StausCodeMessages.message(result.status));
            break;

            case 205:
              var notify = $injector.get('notify');
              var StausCodeMessages = $injector.get('StausCodeMessages');

              notify.closeAll();
              notify(StausCodeMessages.message(result.status));
            break;
          }

          return result;
        }

        /*
          responseError
        */

        function responseError(rejection){
          switch(rejection.status){
            case 0:
              var notify = $injector.get('notify');
              var StausCodeMessages = $injector.get('StausCodeMessages');

              notify.closeAll();
              notify(StausCodeMessages.message(result.status));
            break;

            case 400:
              var notify = $injector.get('notify');
              var StausCodeMessages = $injector.get('StausCodeMessages');

              notify.closeAll();
              notify(StausCodeMessages.message(result.status));
            break;

            case 401:
            var notify = $injector.get('notify');
            var StausCodeMessages = $injector.get('StausCodeMessages');

              notify.closeAll();
              notify(StausCodeMessages.message(result.status));

              // var $state = $injector.get('$state');
              // var AuthService = $injector.get('AuthService');
              //
              // AuthService.destroyUser()
              //
              // AuthService._csrfToken().then(function(token){
              //   AuthService._setCsrfToken(token)
              // })
              //
              // $state.go("login")
            break;

            case 403:
              var notify = $injector.get('notify');
              var StausCodeMessages = $injector.get('StausCodeMessages');

              notify.closeAll();
              notify(StausCodeMessages.message(result.status));
            break;

            case 404:
              var notify = $injector.get('notify');
              var StausCodeMessages = $injector.get('StausCodeMessages');

              notify.closeAll();
              notify(StausCodeMessages.message(result.status));
            break;
          }

          return q.reject(rejection)
        }

      }
    }

})();
