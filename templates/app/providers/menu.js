angular
    .module('App')
    .provider('Menu', function() {

    var pv = this;
    pv._menu = [];
    pv.$get = $get;
    pv.add = add;

    function $get(){
      return {
        getItems: function() {
          return pv._menu;
        }
      };
    };

    function add(item){
      pv._menu.push(item);
    };
  })
