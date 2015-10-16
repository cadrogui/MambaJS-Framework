(function() {
    'use strict';

    angular
        .module('App')
        .controller('AppController', AppController);

    AppController.$inject = ['Menu', '$timeout', 'notify', 'AuthService', '_']

    function AppController(Menu, $timeout, notify, AuthService, _) {
      console.log('load app.controller');

      var vm = this

      angular.extend(vm, {
        menu: Menu.getItems(),
        currentUser: AuthService.getCurrentUser()
      });

      notify(
        { message: 'Hello - This is a alert from App Controller, at Angular.JS way',
          templateUrl: 'app/templates/common/notify.html',
          duration: '4500',
          position: 'center'
        }
      );

    }

})();
