/**
 * MambaJSFramework Core Methods
 */

var fs = require('fs');
var Promise = require('bluebird');
var spawn = require('child-process-promise').spawn;
var path = require('path');
var cheerio = require('cheerio');
var walk = require('walk');
var allowedFiles = ['.css', '.js', ' '];
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var async = require('async');

var Mamba = function(obj){
  scope = {
    AppModules: process.cwd() + '/modules/',
    templates: __dirname + '/templates/',
    jst: __dirname + '/templates/jst/',
    assets: '/assets/',
    $: ''
  }
}

Mamba.prototype.newProject = function(obj){

  var tree = [
    'app',
    'app/controller',
    'app/directive',
    'app/factory',
    'app/modules',
    'app/providers',
    'app/services',
    'app/routes',
    'app/templates',
    'app/templates/common',
    'app/templates/default',
    'assets',
    'assets/img',
    'assets/css',
    'assets/fonts',
    'assets/js',
    'assets/js/plugins'
  ];

  // add error handling

  tree.forEach(function(e){
    fs.mkdirSync(e)
  });

  var targets = {
    'app/app.module.js': { copy: 'app/app.module.js'},
    'app/app.config.js': { copy: 'app/app.config.js'},
    'app/app.run.js': { copy: 'app/app.run.js'},
    'app/controller/app.controller.js': { copy: 'app/controller/app.controller.js'},
    'app/directive/descriptions.js': { copy: 'app/directive/descriptions.js'},
    'app/directive/header.js': { copy: 'app/directive/header.js'},
    'app/directive/navbar.js': { copy: 'app/directive/navbar.js'},
    'app/routes/app.routes.js': { copy: 'app/routes/app.routes.js'},
    'app/providers/menu.js': { copy: 'app/providers/menu.js'},
    'app/providers/templates.js': { copy: 'app/providers/templates.js'},
    'app/providers/interceptor.js': { copy: 'app/providers/interceptor.js'},
    'app/services/interpolate_url.js': { copy: 'app/services/interpolate_url.js'},
    'app/services/interceptor_codes_messages.js': { copy: 'app/services/interceptor_codes_messages.js'},
    'app/factory/auth_service.js': { copy: 'app/factory/auth_service.js'},
    'app/factory/cache.js': { copy: 'app/factory/cache.js'},
    'app/templates/default/app.default.html': { copy: 'app/templates/default/app.default.html'},
    'app/templates/default/descriptions.html': { copy: 'app/templates/default/descriptions.html'},
    'app/templates/default/navbar.html': { copy: 'app/templates/default/navbar.html'},
    'app/templates/default/header.html': { copy: 'app/templates/default/header.html'},
    'app/templates/common/notify.html': { copy: 'app/templates/common/notify.html'},
    'app/templates/common/login.html': { copy: 'app/templates/common/login.html'},
    'assets/css/bootstrap.css': { copy: 'assets/css/bootstrap.css'},
    'assets/css/main.css': { copy: 'assets/css/main.css'},
    'assets/css/style.css': { copy: 'assets/css/style.css'},
    'assets/fonts/glyphicons-halflings-regular.eot': { copy: 'assets/fonts/glyphicons-halflings-regular.eot'},
    'assets/fonts/glyphicons-halflings-regular.svg': { copy: 'assets/fonts/glyphicons-halflings-regular.svg'},
    'assets/fonts/glyphicons-halflings-regular.ttf': { copy: 'assets/fonts/glyphicons-halflings-regular.ttf'},
    'assets/fonts/glyphicons-halflings-regular.woff': { copy: 'assets/fonts/glyphicons-halflings-regular.woff'},
    'assets/img/ipad-hand.png': { copy: 'assets/img/ipad-hand.png'},
    'assets/js/bootstrap.min.js': { copy: 'assets/js/bootstrap.min.js'},
    'assets.json': { copy: 'assets.json'},
    'dependencies.json': { copy: 'dependencies.json'},
    'index.html': { copy: 'index.html'},
    'README.md': { copy: 'README.md'}
  }

  var app = []

  _.map(targets, function(e,i){
    app.push(fs.createReadStream(scope.templates + i).pipe(fs.createWriteStream(e.copy)))
  })

  Promise.all(app)
  .delay(600)
  .then(function(){
    Mamba.prototype.installAssets()
    .then(function(m){
      console.log(m);
    })
    .catch(function(err){
      console.log('error promise', err);
    })
  })
  .catch(function(err){
    console.log('error', err);
  })
}

Mamba.prototype.installAssets = function(){
  return new Promise(function(resolve, reject){
    var json = JSON.parse(fs.readFileSync('assets.json', 'utf8')).assets
    var assets = []

    for(var i=0; i<json.length; i++){
      assets.push(Mamba.prototype.cloneModule(json[i]))
    }

    Promise.all(assets)
    .then(function(){
      resolve('assets installed')
    })
    .catch(function(err){
      reject(err)
    })
  })
}

Mamba.prototype.cloneModule = function(e){
  return new Promise(function(resolve, reject){

    if(e.type == 'module'){
      var module = scope.AppModules + e.name
      var installDir = scope.AppModules
    }else if(e.type == 'asset'){
      var module = process.cwd() + scope.assets + e.name
      var installDir = process.cwd() + '/assets'
    }

    fs.exists(module, function(exists){

      if(!exists){
        console.log('Downloading: ', e.name);
        try{
          process.chdir(installDir)
        }catch(e){
          reject('Wrong path for install modles or assets ', process.cwd());
        }

        spawn('git', ['clone', '--depth', 1, '-b' , e.branch , e.repository, e.name])
        .then(function(){
          console.log('Installing module: ', e.name);
          resolve({ name: e.name, path: scope.AppModules + e.name })
        })
        .fail(function(err){
          console.log('spawn fail', err);
          reject('fail', err)
        })
      }
    })
  })
}

Mamba.prototype.installModules = function(){

  try{
    scope.dependencies = JSON.parse(fs.readFileSync(Mamba.prototype.getPaths().appPath + '/dependencies.json', 'utf8')).modules
  }catch(e){
    console.log(e);
    console.log('cannot read the dependencies.json package');
    console.log('are you sure you in the app folder?');
    process.exit()
  }

  var promises = [];
  var registerFiles = [];

  for(var i = 0; i < scope.dependencies.length; i++){

    var module = scope.AppModules + scope.dependencies[i].name

    if(!fs.existsSync(module)){
      promises.push(Mamba.prototype.cloneModule(scope.dependencies[i]))
    }else{
      console.log('Module %s is installed', scope.dependencies[i].name);
    }
  }

  if(promises.length > 0){
    Promise.all(promises)
    .then(function(modules){

      function dependencies(dirname, moduleName) {
        var walker = walk.walk(dirname, { FIFO: true });
        walker.on('file', function (root, stat, next) {

          if (modules.length) {
            var ext = path.extname(stat.name);
            if(allowedFiles.indexOf(ext) > -1){
              var container = root.substr(root.lastIndexOf('/') + 1)
              var folder;

              (moduleName == container)? folder = container : folder = moduleName + '/' + container

              Mamba.prototype.register({moduleName: moduleName, folder: folder, name: stat.name});
            }
            next();
          }
        });
      }

      modules.forEach(function(e){
        dependencies(e.path, e.name)
      })
    })
    .catch(function(err){
      console.log('catch', err);
    })
  }
}

Mamba.prototype.compile = function(obj){

  var template = fs.readFileSync(scope.jst + obj.type + '.jst', 'utf8')
  var compiled = _.template(template)

  switch(obj.type){
    case 'controller':
      var path = process.cwd() + '/controller/' + obj.name + 'Controller.js'
    break;

    case 'factory':
      var path = process.cwd() + '/factory/' + obj.name + 'Factory.js'
    break;
  }

  fs.writeFile(path, compiled(obj), function(err){
    if(!err){
      Mamba.prototype.register({moduleName: obj.module, folder: path, name: obj.name + 'Controller.js'})
    }else{
      console.log('ouco', err);
    }
  })
}

Mamba.prototype.register = function(obj){
  console.log('Registring ', path.relative(process.cwd(), obj.folder) + '/' + obj.name);

  var paths = Mamba.prototype.getPaths(obj);

  scope.$ = cheerio.load(fs.readFileSync(paths.appPath + '/index.html', 'utf8'));
  scope.$('body').append('\t <!-- Module ' + obj.moduleName + ' --> \n');
  scope.$('body').append('\t <script type="text/javascript" src="' + paths.registeredFile + '"></script> \n')

  fs.writeFileSync(paths.appPath + '/index.html', scope.$.html());
}

Mamba.prototype.getPaths = function(obj){

  obj == undefined? obj = { name: '', folder: '/' }: obj = obj;

  var split = process.cwd().split('/');
  var paths = [];

  split.forEach(function(e){
    if(e != ''){
      paths.push(e);
    }
  })

  var len = paths.length;
  var pos = paths.indexOf('modules') + 1;

  if(pos < len && pos != 0){
    var appPath = path.resolve(path.dirname(process.cwd()), '..', '..');
    var registeredFile = 'modules/' + paths[len-1] + '/' + path.relative(process.cwd(), obj.folder);
  }

  if (pos == len) {
    var appPath = path.resolve(path.dirname(process.cwd()), '..');
    var registeredFile = 'modules/' + path.relative(process.cwd(), obj.folder) + '/' + obj.name;
  }

  if(pos == 0){
    var appPath = path.resolve(path.dirname(process.cwd()));
    var registeredFile = path.relative(process.cwd(), obj.folder);
  }

  return {
    appPath: appPath,
    registeredFile: registeredFile
  }
}

module.exports = Mamba;

return module.exports
