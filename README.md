issueTracker
===================

Angular Web Client Application for issueTracker

----------

### Table of contents

[TOC]

Requirements
-------------

> - [Angular 1.4.0](https://github.com/angular/angular.js)
> - [Bootstrap 3.2.0](http://getbootstrap.com/)
> - [growl 0.4.0](https://github.com/marcorinck/angular-growl)
> - [Angular Strap 2.3.1](http://mgcrea.github.io/angular-strap/)
> - [Font Awesome 4.2.0](http://fortawesome.github.io/Font-Awesome/)
> - [UI-Grid 3.0.7](https://github.com/angular-ui/ui-grid)
> - [ngWig 2.2.1](https://github.com/stevermeister/ngWig)
> - [Angular Chart 0.8.5](http://jtblin.github.io/angular-chart.js/)


 Setup  locally
-------------------

If you want to run locally follow steps.

> **Requirements:**

> - Git
> - Node.js versions >= 0.8.0
> - Grunt
> - Bower

####  Clone project

```
git clone git@https://tanja_brzak@bitbucket.org/tanja_brzak/issuetracker.git
```
####  Install dependencies

```
npm install
```
####  Install Grunt

```
npm install -g grunt-cli
```
#### Install Bower
```
npm install -g bower
```
####  Install required plugins
```
bower install
```
----------

####  Configure
```
Copy secret_example.json to secret.json and configure
```
----------

####  Launch
```
grunt serve
```

####  Build & development
```
Run `grunt` for building and `grunt serve` for preview.
```

####  Testing
```
Running `grunt test` will run the unit tests with karma.
```

-------------------

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0.