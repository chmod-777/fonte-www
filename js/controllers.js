var app = angular.module('starter.controllers', ['pascalprecht.translate', 'jett.ionic.filter.bar']);

app.controller('MainCtrl', ['$scope', '$rootScope', '$localStorage', '$ionicTabsDelegate', 'ApiServe', 'settingsFns', '$interval', function ($scope, $rootScope, $localStorage, $ionicTabsDelegate, ApiServe, settingsFns, $interval) {
  //On call, move one tab to the right
  $scope.goForward = function () {
        console.log("goForward called");
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    //On call, move one tab to the left
    $scope.goBack = function () {
        console.log("goBack called");
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }

    //On call, go to start
    $scope.goToStart = function () {
        console.log("gotoStart called");
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(0);
        }
    }
    

    /*
    saveData = function(){
      $localStorage.settings = $rootScope.settings;
        console.log("Data Save function called: ");
    }
    loadData = function() {
        $rootScope.settings = $localStorage.settings;
        console.log("Data Load function called: ", $localStorage.settings);
      }*/
    //settings.orgList = [];
    //$rootScope.settings = settingsFns.initial;

    function getAPI(url, location) {
      ApiServe.getAPIS(url).then(function(response) {
        if(url == "organization") {
          $rootScope.settings.orgList = response.data;
          angular.forEach($rootScope.settings.orgList, function(value, key) {

          })
        }
        else if(url == "teacher") {
          $rootScope.settings.speakerList = response.data;
        }
        else if(url == "language") {
          $rootScope.settings.languages = response.data;
        }
        else if(url == "teaching") {
          $rootScope.settings.teachings = response.data;
        }
      });
    }

    //get languages: only local test
    ApiServe.getLanguages().then(function(response) {
      $rootScope.settings.languages = response.data;
    });

    //Get the selected information from the server
    //getAPI('organization');
    //getAPI('teacher');
    //getAPI('teaching');

    $rootScope.settings = $localStorage.$default({
      dbtKey: 'd634c26f06be1dae73edfb08d7290f52',
      rootURL: 'http://cloud.faithcomesbyhearing.com/mp3audiobibles2/',
      aapNum: 0,
      lang: 'pt',
      testament: "IDNT",
      rLanguage: 0,
      languages: "",
      firstRun: 1,
      timers: [], //*** add timers
      teachings: [],
      speakerList: []
    })
    if($rootScope.settings.speakerList.length) {
        console.log("teachers already loaded");
      } else {
        getAPI('teacher');
      };
    if($rootScope.settings.orgList.length) {
        console.log("organizations already loaded");
      } else {
        getAPI('organization');
        };
    if($rootScope.settings.teachings.length) {
        console.log("teachings already loaded");
      } else {
        getAPI('teaching');  
      };


}])

.controller('filterCtrl', ['$ionicFilterBar', function($ionicFilterBar) {
  //Filter control NOT FUNCTIONING copied from website
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
.controller('SermonsCtrl', ['settings', '$scope', '$rootScope', '$http', 'fonteFns', '$state', function(settings, $scope, $rootScope, $http, fonteFns, $state, $stateParams) {
  //Teaching page controller
  if(typeof analytics !== "undefined") {
    analytics.trackView("Sermons");
  }

  $(".waiting").show();

  //move to different API
  /*$http.get('http://146.148.29.150/fonte/api/html/web/teaching/api').success(function(data) {
        $scope.teachingList = data;
        $(".waiting").hide();
        console.log("Teachings API called with success", data);
      }).error(function(error) {
        alert("Teachings API unable to be called");
      });*/

  //Info for Org Description Page:
  $scope.whichOrg = $state.params.orgId;
  $scope.whichSpeaker = $state.params.speakerId;
  //$scope.settings = settings;
    

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
    //Not working ***
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

.controller('DownloadCtrl', ['settings', '$scope', '$cordovaFileOpener2', 'downloadService', '$ionicLoading', function(settings, $scope, $cordovaFileOpener2, downloadService, $ionicLoading){
  //$scope.organizationList = settings.orgList;
  if(typeof analytics !== "undefined") {
    analytics.trackView("Download");
  }
  console.log("Download List: ", downloadService.downloads);
  //Make list of teachings that are going to be downloaded.
  //This list comes from the downloadService factory
  var self = this;
  $scope.downloads = downloadService.downloads;
  function detectmob() { 
   if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
      return true;
    }
   else {
      return false;
    }
  }

$scope.downloadThis = function(title, url, type, folder, extension) {
    console.log("downloadThis called: ", title, url, type, folder, extension);
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);

    fileTransfer.download(
      url,
      01 + extension,
      function(entry) {
          console.log("download complete: " + entry.toURL());
      },
      function(error) {
          console.log("download error source " + error.source);
          console.log("download error target " + error.target);
          console.log("download error code" + error.code);
      },
      false,
      {
          headers: {
              "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
          }
      }
    );


    /*if(!detectmob()) {
      window.location.href = url;
    } else {*/
    

    /*
    $ionicLoading.show({
      template: 'Loading...'
    });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        
        fs.root.getDirectory(
            "fontedaVida/" + folder,
            {
                create: true
            },
            function(dirEntry) {
                dirEntry.getFile(
                    title + extension, 
                    {
                        create: true, 
                        exclusive: false
                    }, 
                    function gotFileEntry(fe) {
                        var p = fe.toURL();
                        fe.remove();
                        ft = new FileTransfer();
                        ft.download(
                            encodeURI(url),
                            p,
                            function(entry) {
                                $ionicLoading.hide();
                                //$scope.imgFile = entry.toURL();
                            },
                            function(error) {
                                $ionicLoading.hide();
                                alert("Download Error Source -> " + error.source);
                            },
                            false,
                            null
                        );
                    }, 
                    function() {
                        $ionicLoading.hide();
                        console.log("Get file failed");
                    }
                );
            }
        );
    },
    function() {
        $ionicLoading.hide();
        console.log("Request for filesystem failed");
    });
    }*/
  }
  //$scope.downloads = downloadService.downloads;
}])
.controller('DlButtonCtrl', ['$scope', 'downloadService', function($scope, downloadService) {
    var self = this;

    //On download click, add specific target to downloads in the factory.
    self.addDownload = function(item, key) {
      console.log("toDownload called: ", item);
      //$(".download-icon").active();
      downloadz(item, key);
    };

  /*$scope.toDownload = function (item, type) {
    console.log("toDownload called (item, type): ", item, type);
    if(type == 'teaching') {
      downloadService.download.teaching.push(item);
    } else if (type == 'resource') {
      download.resource.push(item);
    }  else if (type == 'resource') {
      download.bible.push(item);
    }
  }*/
}])

.controller('SettingsCtrl', ['$scope', '$rootScope', '$http', '$translate', 'settingsFns', function($scope, $rootScope, $http, $translate, settingsFns) {
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
  lang = $rootScope.settings.lang;
  console.log("lang: ", lang);
  //syncData(); //nonfunctional
  

   // settingsFns.saveData;
  //$scope.loadData() = settingsFns.loadData;

  $scope.next = next; //make function next() accessible from the front page

    //Firing before getLanguages completes.
     //settings.languages;
      //settings.languages = fonteFns.getLanguages();
  /*$scope.languages = settings.languages;*/

  console.log("SettingsCtrl settings information: ", $rootScope.settings);
  $scope.changeLanguage = function(newLang) {
    $translate.use(newLang);
    $rootScope.settings.lang = newLang;
    $scope.lang = newLang;
    console.log("Language changed - $scope.lang = ", $scope.lang);
  };
}]);