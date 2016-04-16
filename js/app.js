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
    //GA
/*    if(typeof analytics !== "undefined") {
      analytics.startTrackedWithId("UA-53163653-2");
    } else {
      console.log("analytics not started");
    }*/
  
  });

})

.config(function ($sceDelegateProvider, $translateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://storage.googleapis.com/jonandc1-europe/**',
    'http://cloud.faithcomesbyhearing.com/**',
    'http://www.inspirationalfilms.com/audio/**'
  ]);

  $translateProvider.translations('en', {
    TAB_HOME: 'Home',
    TAB_BIBLES: 'Bibles',
    TAB_SERMONS: 'Sermons',
    TAB_RESOURCES: 'Resources',
    TAB_SETTINGS: 'Settings',
    TAG_LINE: 'Bibles, Sermons, and Resources in your language!',
    BIBLE_CLANG: 'Your current Language',
    BIBLE_NT: 'New Testament',
    BIBLE_OT: 'Old Testament',
    BIBLE_BOOKS: 'Books of the Bible',
    BIBLE_HEADER: 'Listen to the Bible',
    BOOK_HEADER: 'Choose a Book',
    BOOK_CHAPTER: 'Chapter',
    SETTINGS_TITLE: 'Settings',
    SETTINGS_EN: 'English',
    SETTINGS_PT: 'Portuguese',
    SETTINGS_INFORMATION: 'Information',
    SETTINGS_CLANGUAGE: 'Choose the App language:',
    SETTINGS_ORGANIZATIONS: 'Show me Resources from the following organizations:',
    SERMONS_SEARCH: 'Search',
    SERMONS_TITLE: 'Listen to Sermons',
    SERMONS_ABOUT_SPEAKER: 'About This Speaker',
    MENU_BACK: 'Back',
    SERMONS_ABOUT_ORG: 'About This Organization',
    SEARCH_SORT: 'Sort by:',
    SEARCH_POPULARITY: 'Popularity',
    SEARCH_RECENT: 'Most Recent',
    SEARCH_HITS: 'hits',
    SEARCH_ORGANIZATION: 'Organization',
    SEARCH_TITLE: 'Title',
    SEARCH_PREACHER: 'Preacher'
  });
  $translateProvider.translations('pt', {
    TAB_HOME: 'Casa',
    TAB_BIBLES: 'Bíblias',
    TAB_SERMONS: 'Sermões',
    TAB_RESOURCES: 'Recursos',
    TAB_SETTINGS: 'Configuração',
    TAG_LINE: 'A Bíblia, Sermões, e Recursos Cristão na sua lingua!',
    BIBLE_CLANG: 'A Sua Língua',
    BIBLE_NT: 'Novo Testamento',
    BIBLE_OT: 'Velho Testamento',
    BIBLE_BOOKS: 'Livros da Bíblia',
    BIBLE_HEADER: 'Escutando a Bíblia',
    BOOK_HEADER: 'Escolhe um Livro',
    BOOK_CHAPTER: 'Capítulo',
    SETTINGS_TITLE: 'Configuração',
    SETTINGS_EN: 'Inglês',
    SETTINGS_PT: 'Portugûes',
    SETTINGS_INFORMATION: 'Informação',
    SETTINGS_CLANGUAGE: 'Escolhe a lingua do Applicativo:',
    SETTINGS_ORGANIZATIONS: 'Mostra-me os recursos das seguintes organizações:',
    SERMONS_SEARCH: 'Pesquisa',
    SERMONS_TITLE: 'Escute os Sermões',
    SERMONS_ABOUT_SPEAKER: 'Sobre o Pregador',
    MENU_BACK: 'Para Atras',
    SERMONS_ABOUT_ORG: 'Sobre a Organização',
    SEARCH_SORT: 'Ordenar por:',
    SEARCH_POPULARITY: 'Popularidade',
    SEARCH_RECENT: 'Mais Recente',
    SEARCH_HITS: 'Visitas',
    SEARCH_ORGANIZATION: 'Organização',
    SEARCH_TITLE: 'Titulo',
    SEARCH_PREACHER: 'Pregador'
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
        //console.log("item.Organization", item);lang_main: 2,
        if(org.id == item.orgId) {
          if(item.lang_main == settings.rLanguage.id || item.lang_translated == settings.rLanguage.id) {
            filtered.push(item);
          };
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
          controller: 'BibleCtrl'
        }
      }
    })
  .state('tab.bible-book', {
      url: '/bible/:bookId/:bookName/:bookCode',
      views: {
        'tab-bible': {
          templateUrl: 'templates/bible-book.html'
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
