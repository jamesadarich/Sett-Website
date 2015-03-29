// Load modules and use them
require.config({
    baseUrl: '/admin/js',
    paths: {
        angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular',
        angularAria: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-aria',
        angularAnimate: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-animate',
        angularMaterial: '//ajax.googleapis.com/ajax/libs/angular_material/0.8.3/angular-material',
        angularAMD: '//cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min',
        angularRoute: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-route',
        /*
        textAngular: '//cdnjs.cloudflare.com/ajax/libs/textAngular/1.3.7/dist/textAngular.min',
        textAngularSanitize: '//cdnjs.cloudflare.com/ajax/libs/textAngular/1.3.7/dist/textAngular-sanitize.min',
        rangy: '//cdnjs.cloudflare.com/ajax/libs/textAngular/1.3.7/dist/textAngular-rangy.min',
        jQuery: 'http://code.jquery.com/jquery-2.1.3.min',
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min',
        textAngular: 'http://cdn.jsdelivr.net/g/angular.textangular@1.3.11(textAngular-rangy.min.js+textAngular-sanitize.min.js+textAngular.min.js)?noext',
        
        */siteShell: 'services/site-shell',
        toolbar: 'controllers/toolbar'
    },
    shim: {
        'angularAMD': ['angular'],
        'angularRoute': ['angular'],
        'angularAnimate': ['angular'],
        'angularAria': ['angular'],
        'angularMaterial': ['angularAnimate', 'angularAria']//,
        //'textAngularSanitize': ['angular'],
        //'textAngular': ['angular', 'textAngularSanitize', 'rangy']
    },
    deps: ['app']
});