angular
  .module('App', ['ui.router',
                  'oc.lazyLoad',
                  'cgNotify',
                  'MambaJSInterceptorMessages',
                  'MambaJSUnderscore'])
  .config(AppConfig)
  .constant('APP_CONSTANTS', {
    URL: 'http://URI_REST/'
  })

function AppConfig(TemplatesProvider){
  TemplatesProvider.setTemplate('default')
}
