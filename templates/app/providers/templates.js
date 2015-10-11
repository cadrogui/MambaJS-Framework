angular
  .module('App')
  .provider('Templates', function(){

    var pv = this;
    pv.$get = $get;
    pv.getName = getName;
    pv.setTemplate = setTemplate;

    function $get(){
      return {
        getTemplate: function(){
          return pv.template;
        }
      }
    }

    function getName(){
      return pv.template;
    }

    function setTemplate(template){
      pv.template = template
    }

  })
