angular.module('starter', ['ionic','ionic.service.core',  'ionic.service.analytics', 'starter.controllers', 'starter.services', 'ngCordova', 'pascalprecht.translate', 'ngStorage', 'ngSanitize', 'angular-loading-bar'])

.run(function($ionicPlatform, $ionicAnalytics, $rootScope, $translate, settingsFns, $interval) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (typeof analytics !== 'undefined'){
      analytics.startTrackerWithId('UA-53163653-2');
      analytics.trackView('App Started');
    }
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    $rootScope.settings.runTimes += 1;     
    console.log("runTimes: ", $rootScope.settings.runTimes);     
    
    document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        
        console.log("Cordova file log: ", cordova.file);
        
        $rootScope.settings.android = ionic.Platform.isAndroid();
        


      }
        //Language Setter
        if(typeof navigator.globalization !== "undefined") {
          navigator.globalization.getPreferredLanguage(function(syslanguage) {
            console.log(syslanguage.value);
            $translate.use((syslanguage.value).split("-")[0]).then(function(data) {
                console.log("Language-choice SUCCESS through OS settings: " + data);
                $rootScope.settings.lang = (syslanguage.value).split("-")[0];
                $rootScope.lang = $rootScope.settings.lang;
              }, function(data) {
                console.log("Language-choice FAIL through OS settings" + data);
            });
          }, null);
        } else {
          $translate.use($rootScope.settings.lang);
          console.log("default Language used");
        }
      });
})

.config(function ($sceDelegateProvider, $translateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://storage.googleapis.com/jonandc1-europe/**',
    'http://cloud.faithcomesbyhearing.com/**',
    'http://www.inspirationalfilms.com/audio/**',
    'http://dbt.io/**',
    'http://146.148.29.150/fonte/api/html/web/nt-book/api',
    'http://146.148.29.150/fonte/api/html/web/ot-book/api',
    'http://146.148.29.150/fonte/api/html/web/teaching/api',
    'http://api.biblia.co.mz/**'
  ]);

  $translateProvider.translations('en', {
    ABOUT_TITLE: 'About the App',
    ABOUT_RESOURCE: 'About the Resource',
    TAB_HOME: 'Home',
    TAB_BIBLES: 'Bibles',
    TAB_DOWNLOADS: 'Downloads',
    TAB_SERMONS: 'Sermons',
    TAB_RESOURCES: 'Resources',
    TAB_ABOUT: 'About the App',
    TAG_LINE: 'Bibles, Sermons, and Resources in your language!',
    BIBLE_CLANG: 'Your current Language',
    BIBLE_NT: 'New Testament',
    BIBLE_OT: 'Old Testament',
    BIBLE_BOOKS: 'Books of the Bible',
    BIBLE_HEADER: 'Listen to the Bible',
    BOOK_HEADER: 'Choose a Chapter',
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
    SEARCH_PREACHER: 'Preacher',
    DOWNLOAD: 'Download',
    SEARCH: 'Search',
    OPEN: 'Open',
    SELECTED_LANGUAGE: 'Your Selected Language: ',
    RESOURCE_LANGUAGE: 'Resource Language: ',
    NEXT: 'Next',
    BACK:'Back',
    LANGUAGE: 'Language',
    AUTHOR: 'Author',
    ORGANIZATION: 'Organization',
    LICENSE: 'License',
    PLAY: 'Play',
    PREACHER: 'Teacher',
    ABOUT_TEACHING: "About this Teaching",
    EMAIL_SUCCESS: "E-mail successfully sent",
    EMAIL_FAIL: "E-mail was not successfully sent. Are you connected to the internet?",
    NAME: "Name",
    PHONE: "Telephone number",
    LANGUAGES_AVAILABLE: "Language(s) in which your organization has resources, teachings, or sermons",
    ORGANIZATION_DETAILS: "Please tell us more about your organization",
    SUBMIT: "Submit",
    PARTNERSHIP: "Partnership",
    PARTNERSHIP_INFORMATION: "Partnership Information and Form",
    COPYRIGHT: "Copyright",
    COPYRIGHT_FORM: "Copyright Complaint Form",
    TEACHING_FILED: "Teaching or Resource with complaint filed",
    COPYRIGHT_DETAIL: "Please explain the issue you have with the teaching or resource",
    IMPORTANT_NOTICE: "IMPORTANT: Your organization must agree to the terms and conditions found",
    HERE: "here",
    AGREE: "Agree and Continue",
    NOTHING: "Nothing here. Please check the following:",
    YOUR_INTERNET: "Your Internet Connection",
    YOUR_LANGUAGE: "Your Selected Language",
    YOUR_ORGANIZATIONS: "Your Selected Organizations",
    NARRATOR: "Narrators"

  });
  $translateProvider.translations('pt', {
    ABOUT_TITLE: 'Sobre o Applicativo',
    ABOUT_RESOURCE: 'Sobre o Recurso',
    TAB_HOME: 'Casa',
    TAB_BIBLES: 'Bíblias',
    TAB_DOWNLOADS: 'Baixados',
    TAB_SERMONS: 'Sermões',
    TAB_RESOURCES: 'Recursos',
    TAB_ABOUT: 'Sobre o Applicativo',
    TAG_LINE: 'A Bíblia, Sermões, e Recursos Cristão na sua Idioma!',
    BIBLE_CLANG: 'A Sua Língua',
    BIBLE_NT: 'Novo Testamento',
    BIBLE_OT: 'Velho Testamento',
    BIBLE_BOOKS: 'Livros da Bíblia',
    BIBLE_HEADER: 'Escutando a Bíblia',
    BOOK_HEADER: 'Escolhe um Capítulo',
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
    SEARCH_PREACHER: 'Pregador',
    DOWNLOAD: 'Baixar',
    SEARCH: 'Procurar',
    OPEN: 'Abrir',
    SELECTED_LANGUAGE: 'Selecionar o seu Idioma: ',
    RESOURCE_LANGUAGE: 'Idioma dos Recursos: ',
    NEXT: 'Proximo',
    BACK: 'Volta',
    LANGUAGE: 'Idioma',
    AUTHOR: 'Autor',
    ORGANIZATION: 'Organização',
    LICENSE: 'Licença',
    PLAY: 'Toca',
    PREACHER: 'Pregador',
    ABOUT_TEACHING: "Sobre este Incinamento",
    EMAIL_SUCCESS: "E-mail enviado com sucesso",
    EMAIL_FAIL: "E-mail não foi enviado com sucesso. Esta conectado a rede?",
    NAME: "Nome",
    PHONE: "Número de telefone",
    LANGUAGES_AVAILABLE: "Língua(s) em que a sua organização tem recursos, ensinamentos e sermões",
    ORGANIZATION_DETAILS: "Por favor nos dê mais informações sobre a sua organização",
    SUBMIT: "Enviar",
    PARTNERSHIP: "Parceria",
    PARTNERSHIP_INFORMATION: "Informações e ficha sobre a parceria",
    COPYRIGHT: "Direitos Autorais",
    COPYRIGHT_FORM: "Ficha de reclamação de direitos autorais",
    TEACHING_FILED: "Ensino ou recurso com a queixa apresentada",
    COPYRIGHT_DETAIL: "Por favor, explique o problema que você tem com o ensino ou recurso",
    IMPORTANT_NOTICE: "IMPORTANTE: Sua organização deve concordar com os termos e condições encontradas",
    HERE: "aqui",
    AGREE: "Eu Concordo - Continua",
    NOTHING: "O seu pescisa não foi encontrada, por favor verifique:",
    YOUR_INTERNET: "A sua conexão à internete",
    YOUR_LANGUAGE: "O idioma escolhido",
    YOUR_ORGANIZATIONS: "Os organizações selecionado",
    NARRATOR: "Narradores"

  

  });
  $translateProvider.preferredLanguage('pt');
  $translateProvider.useSanitizeValueStrategy('escape');
})

.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.parentSelector = '.loading-bar';
}])

//Filter list by organization listed in settings
.filter("orgFilter", ['$rootScope', function($rootScope) {
  console.log("orgFilter Run", $rootScope.settings);
  return function(items) {
    var filtered = [];
    orgs = $rootScope.settings.orgList;
    angular.forEach(orgs, function(org){
      if(org.checked) {
        angular.forEach(items, function(item) {
        if(org.id == item.organization_id) {
            filtered.push(item);
          };
        });
      };
    });
    return filtered;
  }
  var filterTest = [];
  console.log("Filter results: ", filtered);

}])

//Filter by chosen language:
.filter("rLangFilter", ['$rootScope', function($rootScope) {
  rLanguage = $rootScope.settings.rLanguage;
  return function(items, settings) {
    if (settings.rLanguage == undefined) {
      settings.rLanguage = $rootScope.settings.languages[0];
      console.log("rLanguage undefined: set to:", JSON.stringify(settings.rLanguage));
    }
    var filtered = [];
      angular.forEach(items, function(item) {
        //console.log("org.id: ", org.id);
        //console.log("item.Organization", item);lang_main: 2,
        if((settings.rLanguage.id == item.primary_language_id) || (settings.rLanguage.id == item.secondary_language_id)) {
            filtered.push(item);
          };
        });
    return filtered;
  }

}])

.filter("ashtml", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}])//     

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
        templateUrl: 'templates/tab-dash.html'
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
  .state('tab.teachings-detail', {
      url: '/sermons/teaching-:teachingId',
      views: {
        'tab-sermons': {
          templateUrl: 'templates/teachings-detail.html',
          controller: 'SDetailCtrl'
        }
      }
    })
  .state('tab.orgdetail', {
      url: '/teaching/org-:orgId',
      views: {
        'tab-sermons': {
          templateUrl: 'templates/sermons-orgdetail.html',
          controller: 'DetailPageCtrl'
        }
      }
    })
    .state('tab.speakerdetail', {
      url: '/teaching/speaker-:speakerId',
      views: {
        'tab-sermons': {
          templateUrl: 'templates/sermons-speakerdetail.html',
          controller: 'DetailPageCtrl'
        }
      }
    })
    .state('tab.rorgdetail', {
      url: '/resources/org-:orgId',
      views: {
        'tab-resources': {
          templateUrl: 'templates/sermons-orgdetail.html',
          controller: 'DetailPageCtrl'
        }
      }
    })
    .state('tab.rspeakerdetail', {
      url: '/resources/speaker-:speakerId',
      views: {
        'tab-resources': {
          templateUrl: 'templates/sermons-speakerdetail.html',
          controller: 'DetailPageCtrl'
        }
      }
    })
    .state('tab.resourcedetail', {
      url: '/resources/resource-:resourceId',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resource-resourcedetail.html',
          controller: 'RDetailCtrl'
        }
      }
    })
  .state('tab.resources', {
    url: '/resources',
    views: {
      'tab-resources': {
        templateUrl: 'templates/tab-resources.html',
        controller: 'ResourceCtrl'
      }
    }
  })
  .state('tab.download', {
    url: '/download',
    views: {
      'tab-download': {
        templateUrl: 'templates/tab-download.html',
        controller: 'DownloadCtrl'
      }
    }
  })
  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html'
      }
    }
  })
  .state('tab.copyright', {
      url: '/about/copyright-form',
      views: {
        'tab-about': {
          templateUrl: 'templates/about-copyright.html',
          controller: 'FormCtrl as form'
        }
      }
    })
  .state('tab.partnership', {
      url: '/about/partnership-form',
      views: {
        'tab-about': {
          templateUrl: 'templates/about-partnership.html',
          controller: 'FormCtrl as form'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
