angular
    .module('App')
    .directive('navbar', navbar);

function navbar(Templates) {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/' + Templates.getTemplate() + '/navbar.html'
    }
}
