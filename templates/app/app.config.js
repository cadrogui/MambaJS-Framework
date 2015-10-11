(function () {
  angular
    .module('App')
    .config(configure);

  configure.$inject = ['$httpProvider', 'InterceptorsProvider'];

  function configure($httpProvider, InterceptorsProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push(InterceptorsProvider.$get);
  }

})();
