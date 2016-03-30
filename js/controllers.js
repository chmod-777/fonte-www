var app = angular.module('starter.controllers', ['pascalprecht.translate']);

app.controller('DashCtrl', function($scope) {})



.controller('SermonsCtrl', ['settings', '$scope', '$state', function(settings, $scope, $state, $stateParams) {
  console.log("loadPlayer called");
  //Info for Org Description Page:
  $scope.whichOrg = $state.params.orgId;
  $scope.whichSpeaker = $state.params.speakerId;

  $scope.settings = settings;
  var scripts = document.getElementsByTagName("script");

    var jsFolder = "audioplayerengine/";

    for (var i= 0; i< scripts.length; i++)
    {
        if( scripts[i].src && scripts[i].src.match(/initaudioplayer-1\.js/i))
            jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);
    }

    function startPlayer (playerList){
      console.log("startPlayer: ", playerList);
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
        showloading:false,
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
        autoplay:false,
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
    //Jon's attempts at adding another sermon to the AAP playlist
    /*$scope.addAmazingSermon = function(sermon){
      console.log("addAmazingSermon called");
      item = {"album": "", "artist": sermon.artist, "duration": sermon.duration, "image": sermon.image, "info": "", "live": false, "source": [{"src": sermon.src, "type": "audio.mpeg"}]};
      console.log(amazingAudioPlayerObjects.objects);
      //amazingAudioPlayerObjects.objects[0].push(1, item);
      //amazingAudioPlayerObjects.addaudioItem(item);
    };*/
    /*$scope.addtoPlaylist = function(sermon){
      console.log("addtoPlaylist called");
      divcall = "amazingaudioplayer-" + settings.aapNum;
      console.log(divcall);
      $(".player-div").attr("id", divcall);
      $(".player-div ul").append('<li data-artist="' + sermon.artist + '" data-title="' + sermon.title + '" data-album data-info data-image="' + sermon.image + '" data-duration="' + sermon.duration + '"><div class="amazingaudioplayer-source" data-src="' + sermon.src + '" data-type="audio/mpeg" /></li>');
      $(".player-div").css("display", "block");
      startPlayer("#" + divcall);
      settings.aapNum += 1;
      console.log("aapNum: ", settings.aapNum);
      
    };
    $scope.playNow = function(sermon){
      console.log("PlayNow called");
      divcall = "amazingaudioplayer-" + settings.aapNum;
      console.log(divcall);
      $(".player-div").after('<div id="amazingaudioplayer-' + (settings.aapNum - 1) + '"></div>');
      $(".player-div").attr("id", divcall);
      $(".player-div ul").html('<li data-artist="' + sermon.artist + '" data-title="' + sermon.title + '" data-album data-info data-image="' + sermon.image + '" data-duration="' + sermon.duration + '"><div class="amazingaudioplayer-source" data-src="' + sermon.src + '" data-type="audio/mpeg" /></li>');
      $(".player-div").css("display", "block");
      startPlayer("#" + divcall);
      settings.aapNum += 1;
      console.log("aapNum: ", settings.aapNum);
      
    };*/
    $scope.playNow = function(sermon){
      function cleanDiv(toClean){
        console.log("cleanDiv function called");
        $("#" + toClean).remove();
        $("ion-content").after('<div id="' + toClean + '" class="player-div" style="display:none;position:fixed;bottom:0px;width:100%;height:170px;margin:0px auto 0px;"><ul class="amazingaudioplayer-audios" style="display:none"></ul></div>');
      }
      keyDiv = "aap-1";
      settings.aapNum += 1;
      if (settings.aapNum > 1) {
        cleanDiv(keyDiv);
        console.log("cleanDiv called with keyDiv: ", keyDiv);
      };
      $("ion-item li").clone().appendTo("#" + keyDiv + " ul");
      playList = $("#" + keyDiv + " li");
      keepgoing = 1;
      angular.forEach(playList, function(item){
        console.log(item);
        if($(item).attr("data-title") == sermon.en_title) {
          keepgoing = 0;
        } else if (keepgoing == 1) {
          console.log(sermon.en_title, ": moved");
          $(item).appendTo("#" + keyDiv + " ul");

        }
      });
      $(".player-div").css("display", "block");
      $("ion-content").css("margin-bottom", "122px");
      startPlayer("#" + keyDiv);
    }
    //My attempt at sorting
    $scope.sortingBy =  "sermon.en_title";
    console.log($scope.sortingBy);
    $scope.order = function(sortingBy) {
      $scope.sortingBy = sortingBy;
      $scope.title = orderBy($scope.preachingList.title);
      $scope.popularity = orderBy($scope.preachingList.hits);
      $scope.preacher = orderBy($scope.preachingList.artist);
    }


    /*$scope.addSermon = function(sermon){
      console.log("addSermon called");
      $("#amazingaudioplayer-1 ul").append('<li data-artist="' + sermon.artist + '" data-title="' + sermon.title + '" data-album data-info data-image="' + sermon.image + '" data-duration="' + sermon.duration + '"><div class="amazingaudioplayer-source" data-src="' + sermon.src + '" data-type="audio/mpeg" /></li>');
      $("#amazingaudioplayer-1").css("display", "block");
      startplayer("#amazingaudioplayer-1");
      console.log(amazingAudioPlayerObjects.objects[0]);
    };*/
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
function startPlayer (playerList){
      console.log("startPlayer: ", playerList);
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
        showloading:false,
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
        autoplay:false,
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
      playNow = function(sermon){
        function cleanDiv(toClean){
          console.log("cleanDiv function called");
          $("#" + toClean).remove();
          $("ion-content").after('<div id="' + toClean + '" class="player-div" style="display:none;position:fixed;bottom:0px;width:100%;height:170px;margin:0px auto 0px;"><ul class="amazingaudioplayer-audios" style="display:none"></ul></div>');
        }
        keyDiv = "aap-1";
        settings.aapNum += 1;
        if (settings.aapNum > 1) {
          cleanDiv(keyDiv);
          console.log("cleanDiv called with keyDiv: ", keyDiv);
        };
        $("ion-item li").clone().appendTo("#" + keyDiv + " ul");
        playList = $("#" + keyDiv + " li");
        keepgoing = 1;
        angular.forEach(playList, function(item){
          console.log(item);
          if($(item).attr("data-title") == sermon.title) {
            keepgoing = 0;
          } else if (keepgoing == 1) {
            console.log(sermon.title, ": moved");
            $(item).appendTo("#" + keyDiv + " ul");

          }
        });
        $(".player-div").css("display", "block");
        startPlayer("#" + keyDiv);
    };

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
    console.log(lang);
    
  };
  this.set = function() {
    $scope.settings.push(this);
  };
}]);