// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
		key: 'AIzaSyD_E7KjrmA38EgfIo9DltauaXrE6qr7SYI',
		v: '3.17',
		libraries: '',
		language: 'en',
		sensor: 'false',
	})
    $stateProvider

    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });

    $urlRouterProvider.otherwise('login');
    $stateProvider
    // .state('reset_password', {
    //     abstract: true,
    //     url: '/reset_password',
    //     views: {
    //         'menuContent': {
    //         template:  '<div ui-view="templates/reset_password.html"></div>',
    //         controller: 'AppCtrl'
    //     }
    // }
    // })

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('forgot_password', {
        cache: 'false',
        url: '/forgot_password',
        templateUrl: 'templates/forgot_password.html',
        controller: 'AppCtrl'
    })


    .state('reset_password', {
        cache: 'false',
        url: '/reset_password',
        templateUrl: 'templates/reset_password.html',
        controller: 'AppCtrl'
    })


    .state('login', {
        cache: 'false',
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('signup', {
        cache: 'false',
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'RegisterCtrl'
    })

    .state('app.dashboard', {
            url: '/dashboard',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'DashCtrl'
                }
            }
        })
        .state('app.client_dashboard', {
            url: '/client_dashboard',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/client_dashboard.html',
                    controller: 'ClientDashCtrl'
                }
            }
        })
        .state('app.contactus', {
            url: '/contactus',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contactus.html',
                    controller: 'ContactCtrl'
                }
            }
        })

    .state('app.category_list', {
        url: '/category_list',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/category_list.html',
                controller: 'CategoryCtrl'
            }
        }
    })

    .state('app.createuser', {
        url: '/createuser',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/createuser.html',
                controller: 'RegisterCtrl'
            }
        }
    })

    .state('app.printjob', {
        url: '/printjob',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/printjob.html',
                controller: 'PrintjobCtrl'
            }
        }
    })

    .state('app.category_edit', {
        url: '/category_edit',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/category_edit.html',
                controller: 'CategoryCtrl'
            }
        }
    })

    .state('app.add_category', {
        url: '/add_category',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/add_category.html',
                controller: 'CategoryCtrl'
            }
        }
    })

    .state('app.add_article', {
        url: '/add_article',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/add_article.html',
                controller: 'ArticleCtrl'
            }
        }
    })

    .state('app.category_article', {
        url: '/category_article',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/category_article.html',
                controller: 'ArticleCategoryCtrl'
            }
        }
    })

    .state('app.article_edit', {
        url: '/article_edit',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/article_edit.html',
                controller: 'ArticleCtrl'
            }
        }
    })

    .state('app.article_list', {
        url: '/article_list',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/article_list.html',
                controller: 'ArticleCtrl'
            }
        }
    })

    .state('app.recharge', {
        url: '/recharge',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/recharge.html',
                controller: 'RechargeCtrl'
            }
        }
    })

    .state('app.profile_list', {
        url: '/profile_list',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile_list.html',
                controller: 'ProfileListCtrl'
            }
        }
    })

    .state('app.admin_profile_list', {
        url: '/admin_profile_list',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/admin_profile_list.html',
                controller: 'ProfileListCtrl'
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            }
        }
    })

    .state('app.profile_edit', {
        url: '/profile_edit',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile_edit.html',
                controller: 'ProfileCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('login');
});