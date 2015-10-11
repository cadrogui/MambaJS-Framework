angular
    .module('App')
    .directive('descriptions', descriptions);

function descriptions(Templates) {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/' + Templates.getTemplate() + '/descriptions.html'
    }
}
