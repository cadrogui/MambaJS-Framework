angular
  .module('App')
  .config(config)
  .run(function($rootScope, $state) {
      $rootScope.$state = $state;
  });

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, TemplatesProvider, MenuProvider) {

  $urlRouterProvider.otherwise("index");

  $ocLazyLoadProvider.config({
      debug: false
  });

  MenuProvider.add({
    url: 'Github',
    title: 'Forkme on Github!'
  });

  $stateProvider
    .state('Github', {
         url: 'https://github.com/cadrogui',
         external: true,
         data: { requireLogin: false }
    })

  MenuProvider.add({
    url: 'segure_page',
    title: 'A Secure State'
  });

  $stateProvider
    .state('index', {
        url: "/index",
        templateUrl: 'app/templates/' + TemplatesProvider.getName() + '/app.default.html',
        data: { requireLogin: false },
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                      name: 'MambaJSInterpolateUrl',
                      files: [
                        'app/services/interpolate_url.js'
                      ]
                    }
                ]);
            },
        }
    })

    .state('login', {
      url: "/login",
      templateUrl: 'app/templates/common/login.html',
      data: { requireLogin: false },
    })

    .state('segure_page', {
      url: "/segure_page",
      templateUrl: 'app/templates/default/segure_page.html',
      data: { requireLogin: true },
    })

}
