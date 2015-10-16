'use strict';

(function() {
  angular
    .module('MambaJSUnderscore', [])
    .factory('_', underscore);

  function underscore() {
    return window._;
  }

})();
