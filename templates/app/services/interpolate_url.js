(function(){
  angular
    .module('MambaJSInterpolateUrl', [])
    .service('interpolateUrl', interpolateUrl);

  function interpolateUrl(){

    var service = {
      interpolate: interpolate
    }

    return service;

    function interpolate(url, obj, fn){
      var interpolated = []
      var paramLen = Object.keys(obj[0]).length

      url.forEach(function(e, i){
        var ur = e.url
        var matches = ur.match(/:([a-z]\w*)/gi).length
        var aux

        _matches = function(rs){
          rs.replace(/:([a-z]\w*)/gi, function($0, label){
            if(obj[i].hasOwnProperty(label)){
              aux = rs.replace($0, obj[i][label])

              // console.log('aux', aux, label);

              _matches(aux)
            }
          });
          interpolated.push(aux);
        }
        _matches(ur);
      });

      var interpolatedU = interpolated.filter(function(e,p){
        return interpolated.indexOf(e) == p
      });

      return fn(interpolatedU)
    }

  }
})()
