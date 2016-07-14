angular.module('starter.services', [])
.value('original_settings', {
  dbtKey: 'd634c26f06be1dae73edfb08d7290f52',
  rootURL: 'http://cloud.faithcomesbyhearing.com/mp3audiobibles2/',
  aapNum: 0,
  lang: 'pt',
  testament: "IDNT",
  rLanguage: 0,
  languages: ""
})
.service('settings', ['original_settings', function(original_settings) {
    saveData = function(key, value) {
      window.localStorage.setItem(key,value);
      console.log("Data Save function called: ", key, value);
    }
    loadData = function(key) {
      return window.localStorage.getItem(key);
      console.log("Data Load function called: ", key);
    }
    var newSettings = 0;
    syncData = function(){  
      angular.forEach(original_settings, function(value, key){
        newSettings.key = original_settings.key;
      });
      loaded_settings = loadData('settings');
      angular.forEach(loaded_settings, function(value, key) {
        settings[value] = loaded_settings[key];
      });
    }
    this.lang = loadData("settings.lang");
    this.rLanguage = original_settings.rLanguage;
    
}])

.service('fonteFns', ['settings', '$translate', '$http', function(settings, $translate, $http) {
    //For GA_LocalStorage. If not using, remove
    //ga_storage._trackPageview('/fonteFns', 'FonteFns Called');
    //Dependencies for startPlayer
    //this.languages = settings.languages;
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


    function getTeachers(settings) {
      $http.get('http://api.biblia.co.mz/teacher/api').success(function(data) {
          settings.speakerList = data;
          console.log("Teacher API called with success", data);
          console.log("speakerList: ", settings.speakerList);
          saveData("settings.speakerList", settings.speakerList);
        }).error(function(error) {
          alert("Teacher API unable to be called");
      });
    }

    function getOrgs (settings) {
      $http.get('http://api.biblia.co.mz/organization/api').success(function(data) {
          settings.orgList = data;
          console.log("Organization API called with success", data);
          console.log("orgList: ", settings.orgList);
          saveData("settings.orgList", settings.orgList);
        }).error(function(error) {
          alert("Organization API unable to be called");
      });
    }
    getOrgs(settings);
    getTeachers(settings);

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
      $http.get('http://146.148.29.150/fonte/api/html/web/teaching/hit?id=' + selectedAudio.id).success(function(data) {
        console.log("hit added, ID = ", selectedAudio.id);
      }).error(function(error) {
        console.log("unable to count hit");
      });
      $(".player-close-button").click(function(){
        closePlayer("#amazingaudioplayer-1");
      });
      //clean out the old list div for the audio player
      function cleanDiv(toClean){
        console.log("cleanDiv function called");
        $("#" + toClean).remove();
        $("ion-tabs").before('<div id="' + toClean + '" class="aapplayer-div" style="position:fixed;bottom:45px;width:100%;height:170px;margin:0px auto 0px;"><a class="player-close-button"><img width="25px" src="images/close.png"/></a><ul class="amazingaudioplayer-audios" style="display:none"></ul></div>');
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
      //*** selectedAudio.en_title works for sermons but no bible audio
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