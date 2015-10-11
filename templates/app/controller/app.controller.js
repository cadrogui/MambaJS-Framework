(function() {
    'use strict';

    angular
        .module('App')
        .controller('AppController', AppController);

    AppController.$inject = ['Menu', '$timeout', 'notify', 'AuthService']

    function AppController(Menu, $timeout, notify, AuthService) {
      console.log('load app.controller');

      var vm = this
      vm.menu = Menu.getItems();
      vm.currentUser = AuthService.getCurrentUser()

      notify(
        { message: 'Hello - This is a alert from App Controller, at Angular.JS way',
          templateUrl: 'app/templates/common/notify.html',
          duration: '4500',
          position: 'center'
        }
      );

    }

})();
