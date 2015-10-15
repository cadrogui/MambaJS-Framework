# Mamba JS Framework

![](http://legalintelligence.cl/logo-mamba.png)

## Rapid Web Development With AngularJS.

The main goal of Mamba is help to develop AngularJS Apps, as fast as you can, in this way, i propose an structure for build Angular Apps, based on a few documents that i read on the net, the most important ducument is one about best design practices, maintainable and scable code from [John Papa - Angular Style Guide](https://github.com/johnpapa/angular-styleguide), is on this guide where resides the main concepts for build greats and clean code for your apps.

The pattern design used in mamba is domain pattern.

Mamba has built with several tools and concepts for help to create a fast way to create apps

* Autogenerate code (controllers, directives, providers, etc)
* Modularity, manage app modules from Git repositories, when you install a module the menu of this module automatically inject into the main app.
* Templates, Mamba has come with a simple provider that can manage several themes

## The declaration of principles

* Clean Code
* Single Responsability
* Angular Components as Inmmediatelly Invoked Function Expression
* Avoid Naming Collitions
* Controller As Syntax
* Bindable Members of components
* Work with promises
* Exception Catchers
* Startup Logic

## No use of vm for bind data to views.

Mamba JS use ***angular.extend*** for bind data or methods to views, because this way is more cleaner and Object-Driven way, so you can keep things clear about your ***private*** and ***public*** variables or methods,
if you want yo bind data you must do like this:

````
MyFactory.method().then(function(data){
  angular.extend(vm, {
    viewVar: data
  })
})
````

## Use One-Time Binding Syntax

Since AngularJS 1.3, you can give some extra preformance to your app, using one time binding syntax, but why use this?, because the ***$digest cycle*** is a loop through all binding wich checks for changes in the data and re render any value changes as when the app scale the binding counts increase and performance of the app gets down, becasue the $digest loop size increase, to optimize this use the one time binding syntax, and ***in the DOM not all things must be watched.***

Commonly in the views the data is represented like this:

````
<p>
	{{ vm.hello }}
</p>
````

the new syntax add ***::*** in front of any values, wich declares we want to one time binding

````
<p>
	{{ ::vm.hello }}
</p>
````

more examples:

````
<div ng-if="::vm.user.isLogged"></div>
````

````
<div ng-class="::{ isLogged: vm.user.isLogged }"></div>
````

````
<ul>
  <li ng-repeat="item in ::vm.items"></li>
</ul>
````

In this way youre data is unbinded, and you performance are increased.

## Install using npm

````
npm i -g mamba-js-framework
````

## Setting your environment (Dev)

Add to your .bashrc file:
````
alias mamba=/path/to/mamba/cloned/repo
````
This file is in ~/.bashrc (home directory)

To expose all scripts in the shell directory add mamba path to your system path
````
export PATH=/path/to/mamba/cloned/repo:$PATH
````

## Creating a new AngularJS project

````
mamba new
````
This command will create a complete main tree for develop an AngularJS App, in the modules folder resides the entire logic of your app.
Heres is the directory tree:

* app
    * controller
    * directive
    * factory
    * modules
    * providers
    * routes
    * templates
* assets

## Creating a new Controller

````
mamba generate controller -n newController -m App -D
````

This will generate a new blank controller if you add the -D option the controller will be created with the default actions (CRUD), if you want to create custom actions, use comma separated values.

````
mamba generate controller -n newController -m App -a foo,bar
````

## Installing modules

Mamba can install modules from remote ***Git repositories***, you must configure the ***dependencies.json*** file:

The module must have the same directory tree listed above, cause mamba gets a module as micro app ***(Domain Design Pattern)***

````
{
  "modules":[
    {
      "name": "Demo",
      "repository": "ssh://git@li.homeip.net:2222/cadrogui/mamba-modulo.git",
      "branch": "master",
      "type": "module"
    }
  ]
}
````
for install the modules listed in your dependencies.json file, just type:

````
mamba install -m
````

## Url Interpolator

Mamba has built in with an ***URL Interpolator*** for develop a clean and easy to read code, you can read the gist [here](https://gist.github.com/cadrogui/286669e5fb17faeae0fb).

For use the Interpolator you must provide an array with an object and the object properties are the interpolated labels.

If you want use the interpolator, you must add the label to your url in the factory method like this:

````
{ url: APP_CONSTANTS.URL + "posts/:post_id/user/:user_id" }
````

````
var obj = [{ post_id: 12, user_id: 66 }]

AppFactory.getPostsByUser(obj).then(function(promise){
	console.log(promise)
});
````

## Cache

Mamba has built in with a cache factory for cached your request and save bandwidth and give more speed to your app.

For use the factory you must inject the ***CachedData*** on your controller.

````
MyController.$inject = ['CachedData']
````

Add data to cache:

````
CachedData.put('key', values)
````

Read data fom cache:

````
CachedData.get('key')
````

Remove data from cache:

````
CachedData.remove('key')
````

Clear entire cache:

````
CachedData.removeAll();
````

## Auth Service

Mamba came with a complete auth service to handle you auth process, the methods are:

* login
* logout
* _csrfToken
* _setCsrfToken
* _getCsrfToken
* setCurrentUser
* getCurrentUser
* destroyUser
* isAuthenticated

## Restrict Acces to a UI-Router State

For handle restricted areas in your app, you must add this to the desired state.

````
data: { requireLogin: true },
````

The app on the event ***$stateChangeStart***, will verify if the state has the requiredLogin flag to true, if is true the app will verify if the ***AuthService.isAuthenticated()*** method return true if both conditions are true you must restricted area if ***AuthService.isAuthenticated()*** method is false will redirect to login state.

### Login Controller

In process

## HTTP Interceptor

Mamba suggest to handle the request by HTTP Status Codes, in this way you can set some generic resposnses string for those status codes, and you not implement error handling in ***$stateChangeError***, if you want catch errors in the HTTP interceptor you must create a ***$rootScope.$broadcast('customErrorHandling')*** and in the ***app.run.js*** catch this broadcasted message with ***$rootScope.$on('customErrorHandling', fn())***.

## Menu Provider

Mambas has built with a menu provider for ***handle dinamically the menu item injection*** in the template, you must add the items in the route.js file:

````
  MenuProvider.add({
    url: 'Github',
    title: 'Forkme on Github!'
  });
````

If you want to create a external link you must add this:

````
  $stateProvider
    .state('Github', {
         url: 'https://github.com/cadrogui',
         external: true,
         data: { requireLogin: false }
    })
````

All other thing are setup to work propertly.

## Template Provider

In process

## Building templates

In process