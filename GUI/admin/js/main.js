﻿// Load modules and use them
require.config({
    baseUrl: '/admin/js',
    paths: {
        angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular',
        angularAria: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-aria',
        angularAnimate: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-animate',
        angularMaterial: '//ajax.googleapis.com/ajax/libs/angular_material/0.8.3/angular-material',
        textAngular: '//cdnjs.cloudflare.com/ajax/libs/textAngular/1.2.2/textAngular.min',
        angularAMD: '//cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min',
        angularRoute: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-route',
        textAngular: '//cdnjs.cloudflare.com/ajax/libs/textAngular/1.2.2/textAngular.min',
        angularSanitize: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.1/angular-sanitize.min',
        siteShell: 'services/site-shell',
        toolbar: 'controllers/toolbar'
    },
    shim: {
        'angularAMD': ['angular'],
        'angularRoute': ['angular'],
        'angularAnimate': ['angular'],
        'angularAria': ['angular'],
        'angularMaterial': ['angularAnimate', 'angularAria'],
        'angularSanitize': ['angular'],
        'textAngular': ['angularSanitize']
    },
    deps: ['app']
});