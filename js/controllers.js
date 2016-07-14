var app = angular.module('starter.controllers', ['pascalprecht.translate', 'jett.ionic.filter.bar']);

app.controller('MainCtrl', function ($scope, $ionicTabsDelegate) {
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
.controller('filterCtrl', ['$ionicFilterBar', function($ionicFilterBar) {
  function ItemController($ionicFilterBar) {  
    var vm = this,
        items = [],
        filterBarInstance;

    for (var i = 1; i <= 1000; i++) {
        var itemDate = moment().add(i, 'days');

        var item = {
            description: 'Description for item ' + i,
            date: itemDate.toDate()
        };
        items.push(item);
    }

    vm.items = items;

    vm.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: vm.items,
        update: function (filteredItems) {
          vm.items = filteredItems;
        },
        filterProperties: 'description'
      });
    };

    return vm;
}
}
])
.controller('SermonsCtrl', ['settings', '$scope', '$http', 'fonteFns', '$state', function(settings, $scope, $http, fonteFns, $state, $stateParams) {
  if(typeof analytics !== "undefined") {
    analytics.trackView("Sermons");
  }

  $(".waiting").show();
  $http.get('http://146.148.29.150/fonte/api/html/web/teaching/api').success(function(data) {
        $scope.teachingList = data;
        $(".waiting").hide();
        console.log("Teachings API called with success", data);
      }).error(function(error) {
        alert("Teachings API unable to be called");
      });

  //Info for Org Description Page:
  $scope.whichOrg = $state.params.orgId;
  $scope.whichSpeaker = $state.params.speakerId;
  $scope.settings = settings;
    

    $(".waiting").hide();

    $scope.playNow = fonteFns.playNow;
    $scope.download = fonteFns.download;
      //jQuery on Click Events to remove the Android issues with clicking
      //$("amazingaudioplayer-card h2, amazingaudioplayer-card i").click(playNow  ())

    //on click count. The problem is that this doesn't work with PlayNow yet ***
    $(".amazingaudioplayer-next").click(function(){
      $http.get('http://146.148.29.150/fonte/api/html/web/teaching/hit?id=' + sermon.id).success(function(data) {
          console.log("hit added, ID = ", sermon.id);
        }).error(function(error) {
          console.log("unable to count hit");
      });
    });

    //My attempt at sorting
    $scope.sortingBy = "hits";

    console.log("settings language from sermon page", settings.lang);
    console.log(settings.orgList);
}])

.controller('ResourceCtrl', ['settings', '$scope', '$http', '$cordovaFileOpener2', function(settings, $scope, $http, $cordovaFileOpener2){
  $scope.organizationList = settings.orgList;
  if(typeof analytics !== "undefined") {
    analytics.trackView("Resources");
  }
  $scope.settings = settings;

  console.log("ResourceCtrl called");
  $(".waiting").show();
  $http.get('http://api.biblia.co.mz/resource/api').success(function(data) {
        $scope.resourceList = data;
        $(".waiting").hide();
        console.log("Resource API called with success", data);
        console.log("resourceList: ", $scope.resourceList);
      }).error(function(error) {
        alert("resource API unable to be called");
      });

  $scope.resourceOpen = function(resource) {
    $http.get('http://api.biblia.co.mz/resource/hit?id=' + resource.id).success(function(data) {
        console.log("hit added, ID = ", resource.id);
      }).error(function(error) {
        console.log("unable to count hit");
      });
    console.log("resource URL: ", resource.resource_url);
    $cordovaFileOpener2.open(
      resource.resource_url,
      'application/pdf'
    ).then(function() {
        // file opened successfully
        console.log("file opened successfully");
    }, function(err) {
        // An error occurred. Show a message to the user
        console.log("file not opened successfully");
    });
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
        alert("nt_books unable to be called", error);
        console.log("nt_books api error: ", error);
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
.controller('rLanguageCtrl', ['$scope', 'settings', '$http', function($scope, settings, $http) {
        $http.get('ajax/languages.json').then(function(result) {
        settings.languages = result.data;
        $scope.languages = result.data;
        console.log('languages.json called successfully from rLanguageCtrl', $scope.languages);
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

.controller('DownloadCtrl', ['settings', '$scope', '$cordovaFileOpener2', function(settings, $scope, $cordovaFileOpener2){
  $scope.organizationList = settings.orgList;
  if(typeof analytics !== "undefined") {
    analytics.trackView("Download");
  }
  $scope.settings = settings;


}])

.controller('SettingsCtrl', ['$scope', '$rootScope', 'settings', '$http', '$translate', 'fonteFns', function($scope, $rootScope, settings, $http, $translate, fonteFns) {
  if(typeof analytics !== "undefined") {
    analytics.trackView("Settings");
  };
  next = function(number) {
    console.log("Next function called");
    $(".splash").animate({
      'background-position-x': number * 20 + 40 + "%"
    }, 400, 'linear');
    $("#fp-div").animate({
      'left': number * -1000 + "px"
    }, 400, 'linear');
  }
  syncData(); //nonfunctional
  
 

  $scope.next = next; //make function next() accessible from the front page

    //Firing before getLanguages completes.
     //settings.languages;
      //settings.languages = fonteFns.getLanguages();
  /*$scope.languages = settings.languages;*/

  //loadData and saveData Test
  console.log("SettingsCtrl $scope.languages: ");
  settings.lang = loadData("settings.lang");
  $scope.settings = settings;

  console.log("SettingsCtrl Organization Information: ", settings);
  $scope.orgList = settings.orgList;
  console.log("SettingsCtrl settings.languages: ", settings.languages);
  $scope.changeLanguage = function(newLang) {
    $translate.use(newLang);
    settings.lang = newLang;
    $scope.lang = newLang;
    saveData("settings.lang", newLang);
    test = loadData("settings.lang");
    console.log("loadData Test", test);
    console.log("Language changed - $scope.lang = ", $scope.lang);
  };
}]);