angular
    .module('App')
    .directive('header', header);

function header(Templates) {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/' + Templates.getTemplate() + '/header.html'
    }
}
