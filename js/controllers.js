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
      
      //Setting defaults for organizations: new ones default to true 
          angular.forEach($rootScope.settings.orgList, function(value, key) {
            if(value.checked == undefined) {
              console.log("Org not checked: defaulting to true");
              value.checked = true;
            }       
          });
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
      timers: [{
        teacher: 0,
        teaching: 0,
        orgList: 0,
        organization: 0
      }],
      teachings: [],
      orgList: [],
      speakerList: []
    })  

    $rootScope.settings.aapNum = 0;
    console.log("aapNum: ", $rootScope.settings.aapNum);
    function apiTime() {
      if(!$rootScope.settings.speakerList.length || (Date.now() > ($rootScope.settings.timers.teacher + 86400000*1))) {
          getAPI('teacher');
          $rootScope.settings.timers.teacher = Date.now();
          console.log("teachers will call again at: ", ($rootScope.settings.timers.teacher + 86400000*1));
        } else {
          console.log("teachers already loaded");
        };

      if(!$rootScope.settings.languages.length || (Date.now() > ($rootScope.settings.timers.organization + 86400000*1))) {
        ApiServe.getLanguages().then(function(response) {
          $rootScope.settings.languages = response.data;
          $rootScope.settings.timers.languages = Date.now();
        });
          console.log("Languages will call again at: ",($rootScope.settings.timers.organization + 86400000*1));
        } else {
          console.log("languages already loaded");
        };

      if(!$rootScope.settings.orgList.length || (Date.now() > ($rootScope.settings.timers.organization + 86400000*1))) {
          getAPI('organization');
          $rootScope.settings.timers.organization = Date.now();
          console.log("organizations will call again at: ",($rootScope.settings.timers.organization + 86400000*1));
        } else {
          console.log("organizations already loaded");
        };

      if(!$rootScope.settings.teachings.length || (Date.now() > ($rootScope.settings.timers.teaching + 86400000*1))) {
          getAPI('teaching');
          $rootScope.settings.timers.teaching = Date.now();
          console.log("teachings will call again at: ", ($rootScope.settings.timers.teaching + 86400000*1));
        } else {
          console.log("teachings already loaded");
        };

      /*if($rootScope.settings.teachings.length) {
          console.log("teachings already loaded");
        } else {
          getAPI('teaching');  
        };
      if($rootScope.settings.languages.length) {
          console.log("languages already loaded");
        } else {
          ApiServe.getLanguages().then(function(response) {
            $rootScope.settings.languages = response.data;
          });
        }; */
    }
    apiTime(); //call on load
    getAPI('teaching');
    //getAPI('organization');

    //Set rLanguage:
    if($rootScope.settings.rLanguage == 0) {
      $rootScope.settings.rLanguage = $rootScope.settings.languages[0];
      console.log("rLanguage changed: ", $rootScope.settings.rLanguage);
    }
    console.log("rLanguage = ", $rootScope.settings.rLanguage);

    $interval(function() {
      $rootScope.settings.firstRun = 0;
      apiTime(); 
    }, 86400000, 20);

    

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
.controller('SermonsCtrl', ['$scope', '$sce', '$rootScope', '$http', 'fonteFns', '$state', function($scope, $sce, $rootScope, $http, fonteFns, $state, $stateParams) {
  //Teaching page controller
  if(typeof analytics !== "undefined") {
    analytics.trackView("Teachings");
  }

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $(".waiting").show();

  //Info for Org Description Page:
  $scope.whichOrg = $state.params.orgId;
  $scope.whichSpeaker = $state.params.speakerId;
  $(".waiting").hide();

  $scope.playNow = fonteFns.playNow;
  $scope.download = fonteFns.download;
  $scope.sortingBy = "hits";

  $scope.clearSearch = function() {
    console.log("Function clearSearch called");
    $scope.search_query = "";
  }

}])

.controller('ResourceCtrl', ['$scope', '$sce', '$http', '$cordovaFileOpener2', function($scope, $sce, $http, $cordovaFileOpener2){
  if(typeof analytics !== "undefined") {
    analytics.trackView("Resources");
  }
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
    var trustedURL = $sce.trustAsResourceUrl(resource.resource_url);
    console.log("resource URL: ", resource.resource_url);
    handleDocumentWithURL(
      function() {console.log('resource open success');},
      function(error) {
        console.log('resource open failure', error);
        if(error == 53) {
          console.log('No app that handles this file type.');
        }
      }, 
      resource.resource_url
    );
    $http.get('http://api.biblia.co.mz/resource/hit?id=' + resource.id).success(function(data) {
        console.log("hit added, ID = ", resource.id);
      }).error(function(error) {
        console.log("unable to count hit");
      });
      /*
    //console.log("resource URL: ", resource.resource_url);
    cordova.plugins.fileOpener2.appIsInstalled('com.adobe.reader', {
    success : function(res) {
        if (res.status === 0) {
            console.log('Adobe Reader is not installed.');
        } else {
            console.log('Adobe Reader is installed.')
        }
        }
    });
    $cordovaFileOpener2.open(
      trustedURL,
      'application/pdf'
    ).then(function() {
        // file opened successfully
        console.log("file opened successfully");
    }, function(err) {
        // An error occurred. Show a message to the user
        console.log("file not opened successfully", JSON.stringify(err));
    });*/
  }

}])

.controller('BibleCtrl', ['$scope', '$http', '$rootScope', '$translate', function($scope, $http, $rootScope, $translate) {
  console.log("BibleCtrl called");
  if(typeof analytics !== "undefined") {
    analytics.trackView("Bible");
    console.log("GA Bible tag called successfully");
  } else {
    console.log("GA Bible tag not called");
  }

  listBooks = function(){
    $(".waiting").show();
    if (($rootScope.settings.testament == "IDOT") && ($rootScope.settings.rLanguage.IDOT != 0)) {
      $http.get('http://146.148.29.150/fonte/api/html/web/ot-book/api').success(function(data) {
        $scope.books = data;
        console.log("OT called", data);
        $(".waiting").hide();
      }).error(function(error) {
        alert("ot_books unable to be called");
      });
    } else {
      $http.get('http://146.148.29.150/fonte/api/html/web/nt-book/api').success(function(data) {
        $scope.books = data;
        $(".waiting").hide();
        console.log("NT called", data);
        
      }).error(function(error) {
        console.log("nt_books api error: ", error);
      });
    };
  };
  listBooks();
  $scope.$watch('settings.testament', listBooks);
  $scope.$watch('settings.rLanguage', listBooks);
        


}])

.controller('BibleBookCtrl', ['$scope', '$sce', '$rootScope', '$http', '$translate', '$state', 'fonteFns', function($scope, $sce, $rootScope, $http, $translate, $state, fonteFns) {
  console.log("BibleBookCtrl called");
  //$ionicLoading.show();
  settings.bibleBookId = $state.params.bookId;
  $scope.bookName = $state.params.bookName;
  if(typeof analytics !== "undefined") {
    analytics.trackEvent('Click', 'Book Click', settings.testament + settings.bibleBookId);  
    analytics.trackEvent('Click', 'Book Click', settings.rLanguage.en_language);
    console.log('Click', 'Book Click', settings.rLanguage.en_language);
  };

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }  
  bookCode = $state.params.bookCode;
  if (settings.testament == "IDOT"){
    damId = $rootScope.settings.rLanguage.IDOT;
  } else {
    damId = $rootScope.settings.rLanguage.IDNT;
  }
  $http({
    method: 'GET',
    url: 'http://dbt.io/audio/path?v=2&key=' + $rootScope.settings.dbtKey + '&dam_id=' + damId + '&book_id=' + bookCode
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
  $scope.changeRLanguage = function(rLanguage) {
    console.log("rLanguage changed: ", rLanguage);
    console.log("rLanguage changed rS: ", $rootScope.settings.rLanguage);
    $rootScope.settings.rLanguage = rLanguage;
  };


}])
.directive('headerBar', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/header-bar.html'
  };
});