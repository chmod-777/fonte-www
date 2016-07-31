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
    
    function getAPI(url, location) {
      ApiServe.getAPIS(url).then(function(response) {
        if(url == "organization") {
          
      //Setting defaults for organizations: new ones default to true 
          for(var i=0; i < response.data.length; i++) {
            if($rootScope.settings.orgList[i] == undefined) {
              $rootScope.settings.orgList[i] = response.data[i];
              $rootScope.settings.orgList[i].checked = true;
            }
          }
      
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

    getAPI('teacher');
    getAPI('teaching');

    $rootScope.settings = $localStorage.$default({
      dbtKey: 'd634c26f06be1dae73edfb08d7290f52',
      rootURL: 'http://cloud.faithcomesbyhearing.com/mp3audiobibles2/',
      aapNum: 0,
      lang: 'pt',
      testament: "IDNT",
      rLanguage: {id: 0, en_language: "Portuguese", pt_language: "Português", IDNT: "PORNLHN2DA", IDOT: 0},
      languages: "",
      runTimes: 0,
      teachings: [],
      orgList: [],
      speakerList: [],
      licenses: [],
      timerTeacher: Date.now(),
      timerTeaching: Date.now(),
      timerOrg: Date.now(),
      timerResource: Date.now(),
      networkError: 0
    }); 

    $rootScope.settings.aapNum = 0;
    console.log("aapNum: ", $rootScope.settings.aapNum);
    function apiTime() {
      console.log("apiTime called");
      if(!$rootScope.settings.speakerList.length || (Date.now() > ($rootScope.settings.timerTeacher + 86400000*1))) {
          getAPI('teacher');
          $rootScope.settings.timerTeacher = Date.now();
          console.log("teachers will call again at: ", ($rootScope.settings.timerTeacher + 86400000*1));
        } else {
          console.log("teachers already loaded");
        };

      if(!$rootScope.settings.languages.length || (Date.now() > ($rootScope.settings.timerOrg + 86400000*7))) {
        var v = 'languages';
        ApiServe.getLocal(v).then(function(response) {
          $rootScope.settings.languages = response.data;
          $rootScope.settings.timerOrg = Date.now();
        });
          console.log("Languages will call again at: ", ($rootScope.settings.timerOrg + 86400000*7));
        } else {
          console.log("languages already loaded");
        };

      if(!$rootScope.settings.licenses.length) {
        var v = 'licenses';
        ApiServe.getLocal(v).then(function(lResponse) {
          $rootScope.settings.licenses = lResponse.data;
        });
          console.log("Licenses called");
        } else {
          console.log("Licenses already loaded");
        };

      if(!$rootScope.settings.orgList.length || (Date.now() > ($rootScope.settings.timerOrg + 86400000*1))) {
          getAPI('organization');
          $rootScope.settings.timerOrg = Date.now();
          console.log("organizations will call again at: ",($rootScope.settings.timerOrg + 86400000*1));
        } else {
          console.log("organizations already loaded");
        };

      if(!$rootScope.settings.teachings.length || (Date.now() > ($rootScope.settings.timerTeaching + 86400000*1))) {
          getAPI('teaching');
          $rootScope.settings.timerTeaching = Date.now();
          console.log("teachings will call again at: ", ($rootScope.settings.timerTeaching + 86400000*1));
        } else {
          console.log("teachings already loaded");
        };

    }
    apiTime(); //call on load

    //Set rLanguage:
    console.log("rLanguage = ", $rootScope.settings.rLanguage);

    $interval(function() {
      apiTime(); 
    }, 60000*60, 20);

    

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
.controller('SermonsCtrl', ['$scope', '$sce', '$rootScope', '$http', 'fonteFns', function($scope, $sce, $rootScope, $http, fonteFns) {
  //Teaching page controller
  if(typeof analytics !== "undefined") {
    analytics.trackView("Teachings");
  }

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $(".waiting").show();

  $(".waiting").hide();

  $scope.playNow = fonteFns.playNow;
  $scope.download = fonteFns.download;
  $scope.sortingBy = "hits";

  $scope.clearSearch = function() {
    console.log("Function clearSearch called");
    $scope.search_query = "";
  }

}])
.controller('ResourceCtrl', ['$scope', '$rootScope', '$sce', '$http', '$cordovaFileOpener2', function($scope, $rootScope, $sce, $http, $cordovaFileOpener2){
  if(typeof analytics !== "undefined") {
    analytics.trackView("Resources");
  }
  console.log("ResourceCtrl called");
  $(".waiting").show();
  $http.get('http://api.biblia.co.mz/resource/api').success(function(data) {
        $rootScope.settings.resourceList = data;
        $(".waiting").hide();
        $scope.resourceList = $rootScope.settings.resourceList;
        console.log("Resource API called with success", data);
        console.log("resourceList: ", $rootScope.resourceList);
      }).error(function(error) {
        alert("resource API unable to be called");
      });



  $scope.resourceOpen = function(resource) {
    //Not working ***
    var trustedURL = $sce.trustAsResourceUrl(resource.resource_url);
      if(typeof analytics !== "undefined") {
        analytics.trackView("Resource Open: ", resource.id);
      }
    console.log("resource URL: ", resource.resource_url);
    $(".waiting").show();
    
    handleDocumentWithURL(
      function() {
        console.log('resource open success');
        $(".waiting").hide();
      },
      function(error) {
    if (error == 2) {
      alert('File not found, please check the URL.');
      } else if (error == 53) {
        // This is for Android only, because iOS always uses the QuickLook framework.
        alert('No app that handles this file type, please install one from the Play Store.');
      } else {
        alert('Unknown generic error. Code: ' + error);
      }
    },
      resource.resource_url
    );
    $http.get('http://api.biblia.co.mz/resource/hit?id=' + resource.id).success(function(data) {
        console.log("hit added, ID = ", resource.id);
      }).error(function(error) {
        console.log("unable to count hit");
      });
  }
  $scope.clearSearch = function() {
    console.log("Function clearSearch called");
    $scope.search_query = "";
  }

}])

.controller('DlCtrl', [ '$ionicPlatform', '$cordovaFile', function($ionicPlatform, $cordovaFile) {
  
  this.resourceDl = function(resource){
    console.log("resourceDl called", JSON.stringify(resource.resource_url));
    var directory = 'downloads';
    var filename = 'download.pdf';
    var url = resource.resource_url;

    $ionicPlatform.ready(function() {})
    .then(function() {
      console.log("createDir called");
      return $cordovaFile.createDir(directory, false);
    })
    .then(function() {
      console.log("createFile called");
      return $cordovaFile.createFile(directory + '/' + filename, false);
    })
    .then(function(newFile) {
      console.log("newFile: ", newFile.nativeURL);
      return $cordovaFile.downloadFile(url, newFile.nativeURL);
    })
    .then(function(result) {
      // Success!
      console.log("success:", result);
    }, function(err) {
      // Error
      console.log("error: ", JSON.stringify(err, null, 2));
    }, function (progress) {
      // constant progress updates
      console.log('Downloading: '+(progress.loaded/progress.total).toFixed()+'%');
    });
  }
}])

.controller('DetailPageCtrl', ['$rootScope', '$state', '$scope', function($rootScope, $state, $scope) {
  $scope.whichOrg = $state.params.orgId;
  $scope.whichSpeaker = $state.params.speakerId;
}])

.controller('SDetailCtrl', ['$scope', 'fonteFns', '$state', 'getId', '$rootScope' , function($scope, fonteFns, $state, getId, $rootScope){
  if(typeof analytics !== "undefined") {
    analytics.trackView("Teaching page " + $state.params.teachingId);
  }
  $('.waiting').hide();
  teachingId = $state.params.teachingId;
  $scope.src = getId.all(teachingId, 'teaching');
  console.log("chosenTeaching: ", $scope.src, teachingId);

  $scope.playNow = fonteFns.playNow;
  $scope.wordLength = window.innerWidth - 220;
  $scope.page = 'teaching';

}])

.controller('RDetailCtrl', ['$scope', '$parse', '$state', '$window', 'getId', '$sce', '$http', '$cordovaFileOpener2', '$rootScope' , function($scope, $parse, $state, $window, getId, $sce, $http, $cordovaFileOpener2, $rootScope){
  if(typeof analytics !== "undefined") {
    analytics.trackView("Resource page " + $state.params.resourceId);
  }
  $('.waiting').hide();
  resourceId = $state.params.resourceId;
  $scope.src = getId.all(resourceId, 'resource');
  $scope.wordLength = window.innerWidth - 220;
  $scope.page = 'resource';
  console.log("chosenResource: ", $scope.chosenResource, resourceId);
/*  $scope.license = $rootScope.settings.licenses[$scope.chosenResource.license_type_id];
  $scope.teacher = $rootScope.settings.teacher[$scope.chosenResource.teacher_id];
  $scope.organization = $rootScope.settings.orgList[$scope.chosenResource.organization_id];
*/
  $scope.resourceDownload = function(resource) {
      $window.open(resource.resource_url, '_blank');
      console.log("resourceDownload called");      
  }

  $scope.resourceOpen = function(resource) {
    var trustedURL = $sce.trustAsResourceUrl(resource.resource_url);
      if(typeof analytics !== "undefined") {
        analytics.trackView("Resource Open: ", resource.id);
      }
    console.log("resource URL: ", resource.resource_url);
    $(".waiting").show();
    
    if(typeof handleDocumentWithURL !== 'undefined') {
      handleDocumentWithURL(
        function() {
          console.log('resource open success');
          $(".waiting").hide();
        },
        function(error) {
      if (error == 2) {
        alert('File not found, please check the URL.');
        } else if (error == 53) {
          // This is for Android only, because iOS always uses the QuickLook framework.
          if ($rootScope.settings.lang == 'pt') {
            alert('Não tem aplicativo que pode abrir este tipo de ficheiro PDF. Faz download de uma no Play Store');
          } else {
            alert('No app that handles this file type, please install one from the Play Store.');
          }
        } else {
          alert('Unknown generic error. Code: ' + error);
        }
      },
        resource.resource_url
      );
    } else {
      window.open(resource.resource_url, '_blank');
      $(".waiting").hide();
    }
    $http.get('http://api.biblia.co.mz/resource/hit?id=' + resource.id).success(function(data) {
        console.log("hit added, ID = ", resource.id);
      }).error(function(error) {
        console.log("unable to count hit");
      });
}

}])

.controller('FormCtrl', [ '$http', '$scope', '$window', '$translate', function($http, $scope, $window, $translate){
  console.log("FormCtrl called");
  this.sendMail = function(emailInfo, formType) {

  console.log('SendMail called:');
  if (formType == 'copyright') {
  var email = {
   method: 'POST',
   url: 'http://api.biblia.co.mz/postmail.php',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
   },
   data: $.param({ 
      'name'     : $('input[name=name]').val(),
      'email'    : $('input[name=email]').val(),
      'organization' : $('input[name=organization]').val(),
      'teaching' : $('input[name=teaching]').val(),
      'issue' : $('input[name=issue]').val()
    })
  }} else if (formType == 'partnership') {
    var email = {
   method: 'POST',
   url: 'http://api.biblia.co.mz/postmail.php',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
   },
   data: $.param({ 
      'name'     : $('input[name=name]').val(),
      'email'    : $('input[name=email]').val(),
      'organization' : $('input[name=organization]').val(),
      'phone' : $('input[name=phone]').val(),
      'details' : $('input[name=details]').val(),
      'languages' : $('input[name=languages]').val()
    }) 
  }
  }

  $http(email).then(function(){
    console.log("email success", email);
    $window.location.href = '#/tab/dash';
      $translate('EMAIL_SUCCESS').then(function (headline) {
    alert(headline);
  }, function (translationId) {
    alert(translationId);
    });
  }, function(){
    $translate('EMAIL_FAIL').then(function (headline) {
    alert(headline);
  }, function (translationId) {
    alert(translationId);
    });
  });
  
}}])

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
  $scope.clearSearch = function() {
    console.log("Function clearSearch called");
    $scope.search_query = "";
  }    


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
      console.log("data from api: ", data);


      if (!data.length && ((damId == 'NDCBSZN2DA') || (damId == 'KDNBSZN2DA') || (damId =='YAOBSMN2DA'))) {
        console.log("$http not working: trying Jon EN hack method");
        $http({
          method: 'GET',
          url: 'http://dbt.io/audio/path?v=2&key=' + $rootScope.settings.dbtKey + '&dam_id=' + 'ENGESVN2DA' + '&book_id=' + bookCode
          }).then(function successCallback(engResults){
            var data = engResults.data;
            console.log("Jon EN hack data: ", data);
            var bookNum = data[0].path.substring(12, 14);
            var bookName = data[0].path.substring(20, 32);
            if (data) {
              var zero = "0";
              for (var i = 0 ; i < data.length ; ++i) {
                data[i].path = damId + "/B" + bookNum + "___" + zero + (i+1) + "_" + bookName + damId + ".mp3";
                console.log("data path: ", data[i].path);
                if (i == 8) {
                  zero="";
                }
                $scope.api.data = data;
              }
            }
          });
      } else if (!data.length && (damId == 'RNGSBMN2DA')) {
        console.log("$http not working: trying Jon PT hack method");
        $http({
          method: 'GET',
          url: 'http://dbt.io/audio/path?v=2&key=' + $rootScope.settings.dbtKey + '&dam_id=' + 'PORNLHN2DA' + '&book_id=' + bookCode
          }).then(function successCallback(engResults){
            var data = engResults.data;
            console.log("Jon PT hack data: ", data);
            var bookNum = data[0].path.substring(12, 14);
            var bookName = data[0].path.substring(20, 32);
            if (data) {
              var zero = "0";
              for (var i = 0 ; i < data.length ; ++i) {
                data[i].path = damId + "/B" + bookNum + "___" + zero + (i+1) + "_" + bookName + damId + ".mp3";
                console.log("data path: ", data[i].path);
                if (i == 8) {
                  zero="";
                }
                $scope.api.data = data;
              }
            }
          });
      }
      $(".waiting").hide();
  });
  $http({
    method: 'GET',
    url: '  http://dbt.io/library/metadata?v=2&key=' + $rootScope.settings.dbtKey + '&dam_id=' + damId
  }).then(function successCallback(data){
    console.log("copyright pull success!", data);
      $scope.copyright = data.data[0];
      console.log("$scope.copyright: ", $scope.copyright);
      if(!$scope.speakers.length) {
        $('.bible-org-info').hide();
      }
      }, function errorCallback(error) {
        $('.bible-org-info').hide();
        console.log("error: ", error);
      });
  $http.get('ajax/speakers.json').success(function(data) {
    console.log("speakers.json called with success", data);
    angular.forEach(data[0], function(value, key) {
      if((key == 'dam') && (value == damId)) {
        $scope.speakers = data[0]['names'];
        console.log("$scope.speakers called: ", $scope.speakers);
      }
      console.log("speakers.json forEach called: ", data)
    });
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
}])

/*.controller('LatestCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  $scope.rLatest = [];
  $scope.lang = $rootScope.settings.lang;
  console.log("Language: ", $scope.lang);
  //syncData(); //nonfunctional
  getLatest = function() {
    return $http.get('http://api.biblia.co.mz/resource/api?limit=5').success(function(data) {
          $scope.rLatest = data;
          console.log("Latest resources called with success", $scope.rLatest);

          //saveData("settings.orgList", data);
        }).error(function(error) {
          alert("Latest resources unable to be called");
      });
  }
  $scope.rLatest = getLatest();
}])*/

.controller('SettingsCtrl', ['$scope', '$ionicScrollDelegate', '$rootScope', '$http', '$translate', 'settingsFns', function($scope, $ionicScrollDelegate, $rootScope, $http, $translate, settingsFns) {
  if(typeof analytics !== "undefined") {
    analytics.trackView("Settings");
  };
  next = function(number) {
    console.log("Next function called");
    $(".splash").animate({
      'background-position-x': number * 20 + 40 + "%"
    }, 400, 'linear');
    $("#fp-div").animate({
      'left': number * -2000 + "px"
    }, 400, 'linear');
    $ionicScrollDelegate.scrollTop(true);  
  }
  if($rootScope.settings.runTimes > 1) {
    $("#fp-div").css("left", "-4000px");
  }
  lang = $rootScope.settings.lang;
  $scope.rLatest = [];
  console.log("lang: ", lang);
  
  $scope.next = next; //make function next() accessible from the front page

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
})
.directive('infoOrganization', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/info-organization.html'
  };
})
.directive('infoTeacher', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/info-teacher.html'
  };
})
.directive('infoLicense', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/info-license.html'
  };
})
.directive('nothingHere', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/nothing-here.html'
  };
});