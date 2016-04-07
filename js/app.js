// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core',  'ionic.service.analytics', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $ionicAnalytics, $rootScope) {
  $ionicPlatform.ready(function() {
    $ionicAnalytics.register();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function ($sceDelegateProvider, $translateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://storage.googleapis.com/jonandc1-europe/**',
    'http://cloud.faithcomesbyhearing.com/**'
  ]);

  $translateProvider.translations('en', {
    TAB_HOME: 'Home',
    TAB_BIBLES: 'Bibles',
    TAB_SERMONS: 'Sermons',
    TAB_RESOURCES: 'Resources',
    TAB_SETTINGS: 'Settings',
    TAG_LINE: 'Bibles, Sermons, and Resources in your language!',
    SETTINGS_TITLE: 'Settings',
    SETTINGS_EN: 'English',
    SETTINGS_PT: 'Portuguese',
    SETTINGS_INFORMATION: 'Information',
    SETTINGS_CLANGUAGE: 'Choose the App language:',
    SERMONS_SEARCH: 'Search',
    SERMONS_TITLE: 'Listen to Sermons',
    SERMONS_ABOUT_SPEAKER: 'About This Speaker',
    MENU_BACK: 'Back',
    SERMONS_ABOUT_ORG: 'About This Organization'
  });
  $translateProvider.translations('pt', {
    TAB_HOME: 'Casa',
    TAB_BIBLES: 'Biblias',
    TAB_SERMONS: 'Sermoés',
    TAB_RESOURCES: 'Recoursos',
    TAB_SETTINGS: 'Configuração',
    TAG_LINE: 'A Biblia, Sermoés, e Recoursos Cristão no seu lingua!',
    SETTINGS_TITLE: 'Configuração',
    SETTINGS_EN: 'Inglês',
    SETTINGS_PT: 'Portugûes',
    SETTINGS_INFORMATION: 'Informação',
    SETTINGS_CLANGUAGE: 'Escole a lingua de Applicativo:',
    SERMONS_SEARCH: 'Pescisa',
    SERMONS_TITLE: 'Escute os Sermoés',
    SERMONS_ABOUT_SPEAKER: 'Sobre o Pregador',
    MENU_BACK: 'Para Atras',
    SERMONS_ABOUT_ORG: 'Sobre o Organização'
  });
  $translateProvider.preferredLanguage('en');
})

//Filter list by organization listed in settings
.filter("orgFilter", ['settings', function(settings) {
  return function(items) {
  var filtered = [];
  orgs = settings.orgList;
  angular.forEach(orgs, function(org){
    if(org.checked) {
      //console.log(org);
      angular.forEach(items, function(item) {
        //console.log("org.id: ", org.id);
        //console.log("item.Organization", item);
        if(org.id == item.orgId) {
        filtered.push(item);
        };
      });
    };
  });
  return filtered;
  };
}])

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(5);

  // Moving Android tabs to the bottom
  $ionicConfigProvider.tabs.position('bottom');
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.bible', {
      url: '/bible',
      views: {
        'tab-bible': {
          templateUrl: 'templates/tab-bible.html',
        }
      }
    })
  .state('tab.bible-book', {
      url: '/bible/:bookId',
      views: {
        'tab-bible': {
          templateUrl: 'templates/bible-book.html'
        }
      }
    })
  .state('tab.bible-chapter', {
      url: '/bible/:bookId/:chapterId',
      views: {
        'tab-bible': {
          templateUrl: 'templates/bible-chapter.html'
        }
      }
    })
  .state('tab.sermons', {
      url: '/sermons',
      views: {
        'tab-sermons': {
          templateUrl: 'templates/tab-sermons.html',
          controller: 'SermonsCtrl'
        }
      }
    })
  .state('tab.orgdetail', {
      url: '/sermons/org-:orgId',
      views: {
        'tab-sermons': {
          templateUrl: 'templates/sermons-orgdetail.html',
          controller: 'SermonsCtrl'
        }
      }
    })
    .state('tab.speakerdetail', {
      url: '/sermons/speaker-:speakerId',
      views: {
        'tab-sermons': {
          templateUrl: 'templates/sermons-speakerdetail.html',
          controller: 'SermonsCtrl'
        }
      }
    })
  .state('tab.resources', {
    url: '/resources',
    views: {
      'tab-resources': {
        templateUrl: 'templates/tab-resources.html',
        controller: 'ResourceCtrl',
      }
    }
  })
  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
