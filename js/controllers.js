var app = angular.module('starter.controllers', ['pascalprecht.translate']);

app.controller('DashCtrl', function($scope) {})

.controller('MainCtrl', function ($scope, $ionicTabsDelegate) {
  $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }

    $scope.goToStart = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(0);
        }
    }
})

.controller('SermonsCtrl', ['settings', '$scope', 'fonteFns', '$state', function(settings, $scope, fonteFns, $state, $stateParams) {
  if(typeof analytics !== "undefined") {
    analytics.trackView("Sermons");
  }
  
  //Info for Org Description Page:
  $scope.whichOrg = $state.params.orgId;
  $scope.whichSpeaker = $state.params.speakerId;
  $scope.settings = settings;
  $scope.preachingList = [
      {artistId: 0,
      en_title: "Three Types of Curses",
      pt_title: "Tres Tipos de Maldição",
      duration: "5604",
      lang_main: 0,
      lang_translated: 1,
      hits: 921,
      orgId: 0,
      src: "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2016-01-06%20-%20Ap%20Mario%20Tres%20Tipos%20de%20Maldicao.mp3"},
      {artistId: 0,
      en_title: "Finding your Role in the Church",
      pt_title: "Descobrindo a sua Função",
      duration: "4189",
      lang_main: 0,
      hits: 219,
      orgId: 0,
      src: "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2013-10-30%20PT.%20AP.Mario%20Descobrindo%20a%20sua%20Funcao.mp3"},
      {artistId: 0,
      en_title: "The Judgment of the Messiah",
      pt_title: "O Tribunal de Cristo",
      duration: "4189",
      lang_main: 0,
      lang_translated: 1,
      hits: 10,
      orgId: 0,
      src: "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2013-04-30%20PT.EN%20AP.Mario%20O%20tribunal%20de%20Cristo-.mp3"},
      {artistId: 0,
      en_title: "The Story of Jesus",
      pt_title: "A Historia do Jesus",
      duration: "4189",
      lang_main: 2,
      hits: 21,
      orgId: 0,
      src: "http://www.inspirationalfilms.com/audio/The_Story_of_Jesus_Sena_84308.mp3"},
      {artistId: 0,
      en_title: "Knowing What Kind of Believers we are",
      pt_title: "Conciencia do tipo de Crente que nos Somos",
      duration: "4189",
      lang_main: 0,
      lang_translated: 1,
      hits: 50,
      orgId: 0,
      src: "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2015-28-08%20PT.EN%20Ap.%20Mario%20Casquinha_Conciencia%20do%20tipo%20de%20crente%20que%20nos%20somos.mp3"},
      {artistId: 0,
      en_title: "Annointing",
      pt_title: "Unção",
      duration: "4189",
      lang_main: 0,
      lang_translated: 1,
      hits: 1921,
      orgId: 2,      
      src: "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2016-01-10%20-%20Ap%20Mario%20Domingo%20a%20Noite%20Uncao.mp3"}
    ];
    $(".waiting").hide();

    $scope.playNow = fonteFns.playNow;
    $scope.download = fonteFns.download;
      //jQuery on Click Events to remove the Android issues with clicking
      //$("amazingaudioplayer-card h2, amazingaudioplayer-card i").click(playNow  ())

    //My attempt at sorting

    $scope.sortingBy = "hits";

    console.log("settings language from sermon page", settings.lang);
    console.log(settings.orgList);
}])

.controller('ResourceCtrl', ['settings', '$scope', function(settings, $scope){
  $scope.organizationList = settings.orgList;
  if(typeof analytics !== "undefined") {
    analytics.trackView("Resources");
  }
}])

.controller('BibleCtrl', ['$scope', '$http', 'settings', '$translate', 'fonteFns', function($scope, $http, settings, $translate, fonteFns) {
  console.log("BibleCtrl called");
  if(typeof analytics !== "undefined") {
    analytics.trackView("Bible");
    console.log("GA Bible tag called successfully");
  } else {
    console.log("GA Bible tag not called");
  }

  $scope.settings = settings;
  console.log("setting: ", settings);
  //$scope.languages = fonteFns.getLanguages();
  
  $scope.lang = $translate.use();
  listBooks = function(){
    $(".waiting").show();
    if ($scope.settings.testament == "IDOT") {
      $http.get('http://146.148.29.150/fonte/api/html/web/ot-book/api').success(function(data) {
        $scope.books = data;
        $(".waiting").hide();
      }).error(function(error) {
        alert("ot_books unable to be called");
      });
    } else {
      $http.get('http://146.148.29.150/fonte/api/html/web/nt-book/api').success(function(data) {
        $scope.books = data;
        $(".waiting").hide();
      }).error(function(error) {
        alert("nt_books unable to be called");
      });
    };
  };
  listBooks();
  $scope.$watch('settings.testament', listBooks);



}])

.controller('BibleBookCtrl', ['$scope', '$http', 'settings', '$translate', '$state', 'fonteFns', function($scope, $http, settings, $translate, $state, fonteFns) {
  console.log("BibleBookCtrl called");
  //$ionicLoading.show();
  $scope.settings = settings;
  settings.bibleBookId = $state.params.bookId;
  $scope.bookName = $state.params.bookName;
  $scope.lang = $translate.use();
  if(typeof analytics !== "undefined") {
    analytics.trackEvent('Click', 'Book Click', settings.testament + settings.bibleBookId);  
    analytics.trackEvent('Click', 'Book Click', settings.rLanguage.en_language);
    console.log('Click', 'Book Click', settings.rLanguage.en_language);
  };  
  bookCode = $state.params.bookCode;
  if (settings.testament == "IDOT"){
    damId = settings.rLanguage.IDOT;
  } else {
    damId = settings.rLanguage.IDNT;
  }
  $http({
    method: 'GET',
    url: 'http://dbt.io/audio/path?v=2&key=' + settings.dbtKey + '&dam_id=' + damId + '&book_id=' + bookCode
  }).then(function successCallback(data){
    console.log("api success!", settings.bibleBookId);
      $scope.api = data;
      console.log($scope.api);
      $(".waiting").hide();
  }, function errorCallback(response){
    /* *** To do: make this work for NDau etc
          $http({
                async: true,
                url: 'http://dbt.io/audio/path',
                type:'GET',
                data:'v=2&key=' + dbtKey + '&dam_id=' + escape(dam_books) + '&book_id=' + escape(bookId),
                success:function(data){
                  if (data) {
                    $("#chapters span").html('');
                    for (var i = 0 ; i < data.length ; ++i) {
                      var zero = "0";
                      if (i>8) {
                        zero="";
                      }
                      var chapter = data[i];
                      /* Jon Note: Since the API is not working for the majority of the languages I need, I had to hack the API a bit. 
                      */
                      /*
                      var bookNum = chapter.path.substring(12, 14);
                      var bookName = chapter.path.substring(20, 32);
                      console.log("Pull suceeded");
                      $("#chapters span").append("<a href='#' onclick='loadChapter(\"" + damId + "/B" + bookNum + "___" + zero + chapter.chapter_id + "_" + bookName + damId + ".mp3" +
                       "\");return false;'>" + chapter.chapter_id + "</a>");
                      }
                    }
                  }
                });*/
    console.log(JSON.stringify(response));
    console.log("dbt.io api error");
  });
  $scope.playNow = fonteFns.playNow;
  $scope.download = fonteFns.download;


}])
.controller('LanguageCtrl', ['$scope', 'settings', '$http', function($scope, settings, $http) {
        $http.get('ajax/languages.json').then(function(result) {
        settings.languages = result.data;
        $scope.languages = result.data;
        console.log('languages.json called successfully from SettingsCtrl', $scope.languages);
        if (settings.rLanguage == 0) {
          settings.rLanguage = settings.languages[0];
          console.log("rLanguage 0");
        } else {
          console.log("rLanguage not 0", settings);
        };
        //$scope.rLanguage = settings.rLanguage;
        return result.data;
      }, function(){
        console.log("unable to return languages");
      });
        $scope.$watch('settings.rLanguage', function(a, b){
          console.log("rLanguage changed from to:", b, a);
        });

}])

.controller('SettingsCtrl', ['$scope', 'settings', '$http', '$translate', 'fonteFns', function($scope, settings, $http, $translate, fonteFns) {
  if(typeof analytics !== "undefined") {
    analytics.trackView("Settings");
  };

    //Firing before getLanguages completes.
     //settings.languages;
      //settings.languages = fonteFns.getLanguages();
  /*$scope.languages = settings.languages;*/
  console.log("SettingsCtrl $scope.languages: ");
  $scope.settings = settings;
  console.log("SettingsCtrl Organization Information: ", settings);
  $scope.orgList = settings.orgList;
  console.log("SettingsCtrl settings.languages: ", settings.languages);
  $scope.lang = settings.lang;
  $scope.changeLanguage = function(newLang) {
    $translate.use(newLang);
  };
}]);