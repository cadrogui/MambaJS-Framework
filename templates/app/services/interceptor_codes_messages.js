(function(){
  angular
    .module('MambaJSInterceptorMessages', [])
    .service('StausCodeMessages', StausCodeMessages);

  function StausCodeMessages(){

    var service = {
      message: message
    }

    return service;

    function message(status_code){

      var template  ='app/views/common/notify.html';
      var duration = '500';

      switch(status_code){

        // Success
        
        case 201:
          var msg = {
            message: 'Success - the record has saved successfully',
              classes: 'alert-success',
              templateUrl: template,
              duration: duration
            }
        break;

        case 204:
          var msg = {
            message: 'Success - the record has been deleted successfully',
              classes: 'alert-success',
              templateUrl: template,
              duration: duration
            }
        break;

        case 205:
          var msg = {
            message: 'Success - the record has been updated successfully',
              classes: 'alert-success',
              templateUrl: template,
              duration: duration
            }
        break;

        // Errors

        case 0:
          var msg = {
            message: 'Fail - the conenction with the REST service has lost',
              classes: 'alert-success',
              templateUrl: template,
              duration: duration
            }
        break;

        case 400:
          var msg = {
            message: 'Fail - Bad Request',
              classes: 'alert-success',
              templateUrl: template,
              duration: duration
            }
        break;

        case 401:
          var msg = {
            message: 'Fail - this request is not authorized',
              classes: 'alert-success',
              templateUrl: template,
              duration: duration
            }
        break;

        case 403:
          var msg = {
            message: 'Fail - this request is forbidden, my it for wrong credentials',
              classes: 'alert-success',
              templateUrl: template,
              duration: duration
            }
        break;

        case 404:
          var msg = {
            message: 'Fail - the place that you can get it, ewas not found',
              classes: 'alert-success',
              templateUrl: template,
              duration: duration
            }
        break;
      }

      return msg;
    }

  }
})()
