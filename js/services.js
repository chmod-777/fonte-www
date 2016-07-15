angular.module('starter.services', [])
.value('settings', {
  dbtKey: 'd634c26f06be1dae73edfb08d7290f52',
  rootURL: 'http://cloud.faithcomesbyhearing.com/mp3audiobibles2/',
  aapNum: 0,
  lang: 'pt',
  testament: "IDNT",
  rLanguage: 0,
  languages: "",
  firstRun: 1,
  timers: [] //*** add timers
})

.factory('ApiServe', ['$http', function($http) {
    
    var getAPIS = function(v) {
      return $http.get('http://api.biblia.co.mz/' + v + '/api').success(function(data) {
          console.log(v + " API called with success", data);
          //saveData("settings.orgList", data);
        }).error(function(error) {
          alert(v + " API unable to be called");
      });
    }
    
    var getLanguages = function() {
      return $http.get('ajax/languages.json').success(function(data) {
        $(".waiting").hide();
        console.log("Languages API called with success", data);
        return data;
      }).error(function(error) {
        alert("Languages API unable to be called");
      });
    }

    return {
      getAPIS: getAPIS,
      getLanguages: getLanguages
    };
    /*
        this.getTeaching = function() {
      $http.get('http://146.148.29.150/fonte/api/html/web/teaching/api').success(function(data) {
        $(".waiting").hide();
        console.log("Teachings API called with success", data);
        return data;
      }).error(function(error) {
        alert("Teachings API unable to be called");
      });
    }

    this.getBooks = function() {
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
    };*/

}])

.service('settingsFns', ['$cordovaFile', '$localStorage', 'settings', '$rootScope', 'ApiServe', '$window', '$http', function($cordovaFile, $localStorage, settings, $rootScope, ApiServe, $window, $http) {
    //Save data to persistent storage
    this.saveData = function(variable) {
      $localStorage.settings = variable;
      console.log("Data Save function called: ", JSON.stringify(variable));
    }
    
    //Load data from persistent storage
    this.loadData = function() {
      return $localStorage.settings;
      console.log("Data Load function called: ");
    }
    







    /*sync data back and forth - untested
    var newSettings = 0;
    syncData = function(){  
      angular.forEach(original_settings, function(value, key){
        newSettings.key = original_settings.key;
      });
      loaded_settings = loadData('settings');
      angular.forEach(loaded_settings, function(value, key) {
        settings[value] = loaded_settings[key];
      });
    }*/

    //Create file 
    /*this.syncSettings = function(info){
      console.log("syncSettings called");
      console.log("Free Space: ", $cordovaFile.getFreeDiskSpace());
      var type = window.persistent;
      var size = 1024*1024;
      console.log("StorageDirectory: ", cordova.file.externalDataDirectory);
      var settings_stringed = JSON.stringify(info);
      //console.log("settings: ", JSON.stringify(info));

      $window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir){ 
        dir.getDirectory("settings2", {create: true}).then(function(success){
          console.log("success");
        }, function(error) {
          console.log("failure: ", error);
        }); 
      });
      $cordovaFile.createDir(cordova.file.externalDataDirectory, "settings", true).then(function(success) {
          console.log("success! creating directory...");
        }, function (error) {
          console.log("error creating directory: ", JSON.stringify(error));
      });

      console.log("CheckFile: ", JSON.stringify(cordova.file.applicationDirectory, 'settings.js'));
      

        $cordovaFile.writeFile(cordova.file.externalDataDirectory + "settings", 'settings.js', settings_stringed, true).then(function(success) {
          console.log("success! writing file...");
          $cordovaFile.checkFile(cordova.file.externalDataDirectory + "settings/", 'settings.js').then(function(success) {
          console.log("success! checking file...");
          }, function (error) {
            console.log("error checking file: ", JSON.stringify(error));
          });
        }, function (error) {
          console.log("error writing file: ", JSON.stringify(error));
        });

      }

  this.loadSettings = function(){
    console.log("loadSettings called");

    $cordovaFile.checkFile(cordova.file.externalDataDirectory + "settings/", 'settings.js').then(function(success) {
          console.log("success! checking file from loading...: ", JSON.stringify(success));
          }, function (error) {
            console.log("error checking file: ", JSON.stringify(error));
          });
    console.log(cordova.file.externalDataDirectory + 'settings/settings.js');
    $http.get(cordova.file.externalDataDirectory + 'settings/settings.js').success(function(data) {
        console.log("http.get read file success");
      }).error(function(error) {
        console.log("http.get read file fail: ", error);
      })
        var output = $cordovaFile.readAsBinaryString(cordova.file.externalDataDirectory + "settings", 'settings.js');
        console.log("Trying to output", JSON.stringify(output));

  }
       
    
      /*
    if(typeof cordova.exec !== "undefined") {
      cordova.exec(function(result) {
          console.log("Free Disk Space: " + result);
        }, function(error) {
          console.log("Error: " + error);
        }, "File", "getFreeDiskSpace", []);
        } else {
          console.log("cordova not installed");
        }*/

    //***Expand in case of saved settings
    this.initial = settings;

    console.log("settingsFns service called");
    
}])
.factory('downloadService', ['settings', function(settings) {
    console.log("downloadService");
    


    //Make the download lists: this are the files TO download; not the ones already done downloading!!!
    var downloads = {};
    downloads.teaching = [];
    downloads.resource = [];
    downloads.bible = [];

    downloadz = function(item, key){
      console.log("downloads.add called from the downloadService");
      //item.type = 0;
      item.type = key;
      if(key == "teaching") {
            downloads.teaching.push(item);
          }
          else if(key == "resource") {
            downloads.resource.push(item);
          }
          else if(key == "bible") {
            downloads.bible.push(item);
          };
      }
    return {
      downloadz: downloadz,
      downloads: downloads
    };
}])
.service('fonteFns', ['settings', '$translate', '$http', function(settings, $translate, $http) {
    //For GA_LocalStorage. If not using, remove
    //ga_storage._trackPageview('/fonteFns', 'FonteFns Called');
    //Dependencies for startPlayer
    //this.languages = settings.languages;
    
    //needed for Amazing Audio Player
    var scripts = document.getElementsByTagName("script");
    var jsFolder = "audioplayerengine/";
    for (var i= 0; i< scripts.length; i++)
    {
        if( scripts[i].src && scripts[i].src.match(/initaudioplayer-1\.js/i))
            jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);
    }


    /*this.download = function(downloadURL, title) {
      console.log("download function called successfully");
      $cordovaFile.copyFile(downloadURL, title, cordova.file.dataDirectory, title)
          .then(function (success) {
              // success
              console.log("successfully downloaded file");
            }, function (error) {
              // error
              console.log("File download error");
            }); 
     }*/

    /*
    syncData = function(variables) {
      var variable_new;
      angular.forEach(settings, function(value, key){
        console.log("Variables: ", key, value);
        if(window.localStorage.getItem('settings.' + value).length != 0) {
          variable_new.settings = window.localStorage.getItem('settings.' + value);
        }
      });
      return variable_new;
    }*/
    /*
    function getTeachers(settings) {
      $http.get('http://api.biblia.co.mz/teacher/api').success(function(data) {
          settings.speakerList = data;
          console.log("Teacher API called with success from FonteFns", data);
          //console.log("speakerList: ", settings.speakerList);
          //saveData("settings.speakerList", settings.speakerList);
        }).error(function(error) {
          alert("Teacher API unable to be called");
      });
    }

    function getOrgs (settings) {
      $http.get('http://api.biblia.co.mz/organization/api').success(function(data) {
          settings.orgList = data;
          console.log("Organization API called with success from FonteFns", data);
          //console.log("orgList: ", settings.orgList);
          //saveData("settings.orgList", settings.orgList);
        }).error(function(error) {
          alert("Organization API unable to be called");
      });
    }

    
    getOrgs(settings);
    getTeachers(settings);
    */


    function startPlayer (playerList){
      console.log("startPlayer from SermonsCtrl: ", playerList);
      console.log($(playerList));
      $(playerList).amazingaudioplayer({
        jsfolder:jsFolder,
        skinsfoldername:"",
        titleinbarwidthmode:"fixed",
        timeformatlive:"%CURRENT% / LIVE",
        volumeimagewidth:24,
        barbackgroundimage:"",
        showtime:true,
        titleinbarwidth:80,
        showprogress:true,
        random:false,
        titleformat:"%TITLE%",
        height:164,
        loadingformat:"Loading...",
        prevnextimage:"prevnext-48-48-0.png",
        showinfo:true,
        imageheight:100,
        skin:"MusicBox",
        loopimage:"loop-24-24-1.png",
        loopimagewidth:24,
        showstop:false,
        prevnextimageheight:48,
        infoformat:"%ARTIST% %ALBUM%<br />%INFO%",
        stopotherplayers:true,
        showloading:true,
        forcefirefoxflash:false,
        showvolumebar:true,
        imagefullwidth:false,
        width:300,
        showtitleinbar:false,
        showloop:false,
        volumeimage:"volume-24-24-1.png",
        playpauseimagewidth:48,
        loopimageheight:24,
        tracklistitem:10,
        tracklistitemformat:"%ID%. %TITLE% <span style='position:absolute;top:0;right:0;'>%DURATION%</span>",
        prevnextimagewidth:48,
        tracklistarrowimage:"tracklistarrow-48-16-0.png",
        forceflash:false,
        playpauseimageheight:48,
        showbackgroundimage:false,
        imagewidth:100,
        stopimage:"stop-48-48-0.png",
        playpauseimage:"playpause-48-48-0.png",
        forcehtml5:false,
        showprevnext:true,
        backgroundimage:"",
        autoplay:true,
        volumebarpadding:8,
        progressheight:8,
        showtracklistbackgroundimage:false,
        titleinbarscroll:true,
        showtitle:true,
        defaultvolume:100,
        tracklistarrowimageheight:16,
        heightmode:"fixed",
        titleinbarformat:"%TITLE%",
        showtracklist:false,
        stopimageheight:48,
        volumeimageheight:24,
        stopimagewidth:48,
        volumebarheight:80,
        noncontinous:false,
        tracklistbackgroundimage:"",
        showbarbackgroundimage:false,
        showimage:true,
        tracklistarrowimagewidth:48,
        timeformat:"%CURRENT% / %DURATION%",
        showvolume:true,
        fullwidth:true,
        loop:1,
        preloadaudio:true

      });
    };

    //Closes the audio player and increases the size of the screen by taking out the margin
    this.closePlayer = function(keyDivHash){
      amazingAudioPlayerObjects.objects[settings.aapNum - 1].pauseAudio();
      $(keyDivHash).hide();
      $("ion-content").css("margin-bottom", "0px");
      console.log("closePlayer called");
    };
    closePlayer = this.closePlayer;
    this.playNow = function(selectedAudio){
      if(typeof analytics !== "undefined") {
        analytics.trackEvent('Player Started', selectedAudio.en_title, settings.rLanguage.en_language);
      };        
      //Testing statements
      console.log("scope.playNow called");
      
      //count hit on the teaching
      //***make this nonfunctional for Bible audio
      $http.get('http://146.148.29.150/fonte/api/html/web/teaching/hit?id=' + selectedAudio.id).success(function(data) {
        console.log("hit added, ID = ", selectedAudio.id);
      }).error(function(error) {
        console.log("unable to count hit");
      });

      //functionality for the red x in the corner of the player
      $(".player-close-button").click(function(){
        closePlayer("#amazingaudioplayer-1");
      });

      //clean out the old playlist for the audio player
      function cleanDiv(toClean){
        console.log("cleanDiv function called");
        $("#" + toClean).remove();

        //adds a blank starting div back in once we delete the old one
        $("ion-tabs").before('<div id="' + toClean + '" class="aapplayer-div" style="position:fixed;bottom:45px;width:100%;height:170px;margin:0px auto 0px;"><a class="player-close-button"><img width="25px" src="images/close.png"/></a><ul class="amazingaudioplayer-audios" style="display:none"></ul></div>');
        
        //adds in the close button
        $(".player-close-button").click(function(){
          closePlayer("#" + toClean);
          console.log("close-click called");
        });
      }
      
      //Change play/pause button
      //$(".sermon-page .amazingaudioplayer-card .icon").toggleClass("ion-ios-play ion-ios-pause").click(function(){
      //    console.log("toggle called");
      //});
        
      //keyDiv is the ID of the special div found between </ion-content> and </ion-view> that has a list item added to it per playlist item.
      keyDiv = "amazingaudioplayer-1";
      settings.aapNum += 1;
      keyDivHash = "#" + keyDiv;



      //If there is already a player div, destroy the old one:
      if (settings.aapNum > 1) {
        cleanDiv(keyDiv);
        amazingAudioPlayerObjects.objects[0].pauseAudio();
        console.log("cleanDiv called with aapNum: and keyDiv: ", settings.aapNum, keyDiv); 
      } else {
        console.log("cleanDiv not called with aapNum: and keyDiv: ", settings.aapNum, keyDiv);
        
      };  

      //Make sure div is visible
      $("ion-content").css("margin-bottom", "122px");  
      $(keyDivHash).css("display", "block");

      //Each sermon has an associated <li> generated in the html with all of the information needed for the player. This copies those <li>'s to the correct place to be a playlist, then sorts through the playlist to put the latest thing clicked on on top.
      $("ion-item li").clone().appendTo("#" + keyDiv + " ul");

      //removing unneeded styling from the clones <li>'s
      $("#" + keyDiv + " li").removeAttr("ng-if style");
      

      //change order of the aap playlist to the started chapter
      //*** selectedAudio.en_title works for sermons but not bible audio
      playList = $("#" + keyDiv + " li");
      keepgoing = 1;
      console.log("selectedAudio: ", selectedAudio);

      //if a Bible verse, use the top method; if a sermon, the bottom:
      if(selectedAudio.en_title == null) {
         angular.forEach(playList, function(item){
            if($(item).children().attr("data-src") == (settings.rootURL + selectedAudio.path)) {
              keepgoing = 0;
            } else if (keepgoing == 1) {
              console.log(selectedAudio.path, settings.rootURL, " type ID'd as Bible: moved");
              $(item).appendTo("#" + keyDiv + " ul");
            };
         });
       } else {
        angular.forEach(playList, function(item){
            if($(item).attr("data-title") == selectedAudio.en_title) {
              keepgoing = 0;
            } else if (keepgoing == 1) {
              console.log(selectedAudio.en_title, " type ID'd as sermon: moved");
              $(item).appendTo("#" + keyDiv + " ul");
            };
         });
       }
      startPlayer(keyDivHash);

    }; //end playNow Function
}])


;