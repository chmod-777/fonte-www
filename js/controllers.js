var app = angular.module('starter.controllers', ['pascalprecht.translate']);

app.controller('DashCtrl', function($scope) {})



.controller('SermonsCtrl', ['settings', '$scope', 'fonteFns', '$state', function(settings, $scope, fonteFns, $state, $stateParams) {
  console.log("loadPlayer called");
  //Info for Org Description Page:
  $scope.whichOrg = $state.params.orgId;
  $scope.whichSpeaker = $state.params.speakerId;
  $scope.settings = settings;
  $scope.preachingList = [
      {"artistId": 0,
      "en_title": "Three Types of Curses",
      "pt_title": "Tres Tipos de Maldição",
      "duration": "5604",
      "hits": 921,
      "orgId": 0,
      "src": "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2016-01-06%20-%20Ap%20Mario%20Tres%20Tipos%20de%20Maldicao.mp3"},
      {"artistId": 0,
      "en_title": "Finding your Role in the Church",
      "pt_title": "Descobrindo a sua Função",
      "duration": "4189",
      "hits": 219,
      "orgId": 0,
      "src": "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2013-10-30%20PT.%20AP.Mario%20Descobrindo%20a%20sua%20Funcao.mp3"},
      {"artistId": 0,
      "en_title": "The Judgment of the Messiah",
      "pt_title": "O Tribunal de Cristo",
      "duration": "4189",
      "hits": 10,
      "orgId": 0,
      "src": "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2013-04-30%20PT.EN%20AP.Mario%20O%20tribunal%20de%20Cristo-.mp3"},
      {"artistId": 0,
      "en_title": "Knowing What Kind of Believers we are",
      "pt_title": "Conciencia do tipo de Crente que nos Somos",
      "duration": "4189",
      "hits": 50,
      "orgId": 0,
      "src": "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2015-28-08%20PT.EN%20Ap.%20Mario%20Casquinha_Conciencia%20do%20tipo%20de%20crente%20que%20nos%20somos.mp3"},
      {"artistId": 0,
      "en_title": "Annointing",
      "pt_title": "Unção",
      "duration": "4189",
      "hits": 1921,
      "orgId": 2,      
      "src": "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2016-01-10%20-%20Ap%20Mario%20Domingo%20a%20Noite%20Uncao.mp3"}
    ];

    $scope.playNow = fonteFns.playNow;

    //Making the close button work
    $(".player-close-button").click(function(){
      fonteFns.closePlayer("#amazingaudioplayer-1");
    });
      //jQuery on Click Events to remove the Android issues with clicking
      //$("amazingaudioplayer-card h2, amazingaudioplayer-card i").click(playNow  ())

    //My attempt at sorting
    $scope.sortingBy =  "sermon.en_title";
    console.log($scope.sortingBy);
    $scope.order = function(sortingBy) {
      $scope.sortingBy = sortingBy;
      $scope.title = orderBy($scope.preachingList.title);
      $scope.popularity = orderBy($scope.preachingList.hits);
      $scope.preacher = orderBy($scope.preachingList.artist);
    }
    console.log("settings language from sermon page", settings.lang);
    console.log(settings.orgList);
}])

//not yet functioning
.controller('menuCtrl', ['$scope', '$ionicSideMenuDelegate', function($scope, $ionicSideMenuDelegate){
$scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
}])

.controller('ResourceCtrl', ['settings', '$scope', function(settings, $scope){
  $scope.organizationList = settings.orgList;
}])

.controller('BibleCtrl', ['$scope', '$http', 'settings', '$translate', function($scope, $http, settings, $translate) {
  console.log("BibleCtrl called");
  $scope.lang = $translate.use();
  $http.get('ajax/nt_books.json').success(function(data) {
    $scope.books = data;
  });
  $scope.settings = settings;
  $scope.changeBookId = function(settings, book, bookName){
    settings.bibleBookId = book;
    settings.bibleBook = bookName;
    console.log("function changeBookId called. Book = : ", book);
  };

}])

.controller('BibleBookCtrl', ['$scope', '$http', 'settings', 'fonteFns', function($scope, $http, settings, fonteFns) {
  console.log("BibleBookCtrl called");
  $scope.settings = settings;
  $http({
    method: 'GET',
    url: 'http://dbt.io/audio/path?v=2&key=' + settings.dbtKey + '&dam_id=' + settings.damId + '&book_id=' + settings.bibleBookId
  }).then(function successCallback(data){
    console.log("api success!");
      $scope.api = data;
      console.log($scope.api);
  }, function errorCallback(response){
    console.log(response);
    console.log(scope);
  });
  $scope.playNow = fonteFns.playNow;

}])

.service("bibleService", function(){
  this.book = "Matthew";
  this.bookId = 1;
  this.chapter_id = 0;
  this.damId = "ENGESVN2DA";
})
.controller('languagePicker', ['$scope', 'settings', '$http', function($scope, settings, $http) {
  $scope.settings = settings;
  getLanguages = function (){
      console.log("getLanguages called");
      $http.get('ajax/languages.json').success(function(data) {
        settings.languages = data;
        console.log('languages.json called successfully from languagePicker');
      });
    $scope.languages = settings.languages;
    };
    getLanguages();
    $scope.rLanguageChange = function (settings){
      settings.rLanguage.dam = $(this).attr("ng-value");
      console.log(settings.rLanguage.dam);
    }
}])


.controller('SettingsCtrl', ['$scope', 'settings', '$translate', function($scope, settings, $translate) {
  //$scope.settings = settings;
  console.log("Organization Information: ", settings.orgList);
  $scope.orgList = settings.orgList;

  console.log("settings.languages: ", settings.languages);
  $scope.languageChange = function(lang) {
    console.log("languageChange function called");
    if(this.appLanguage === lang) {}
      else {
        $(".language-picker a.button-positive").removeClass("button-positive").addClass("button-middle");
        $(".language-picker a.button-calm").removeClass("button-calm").addClass("button-positive");
        $(".language-picker a.button-middle").removeClass("button-middle").addClass("button-calm");
      };
    this.appLanguage = lang;
    $translate.use(lang);
    settings.lang = lang;
    console.log(lang);
    
  };
  this.set = function() {
    $scope.settings.push(this);
  };
}]);