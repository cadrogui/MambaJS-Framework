'use strict';

(function() {
  angular
    .module('MambaJSCache', [])
    .factory('CachedData', CachedData);

  CachedData.$inject = ['$cacheFactory'];

  function CachedData($cacheFactory) {
    return $cacheFactory('CachedData');
  }

})();
