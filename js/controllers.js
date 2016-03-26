var app = angular.module('starter.controllers', ['pascalprecht.translate']);

app.controller('DashCtrl', function($scope) {})

.config(function ($sceDelegateProvider, $translateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://storage.googleapis.com/jonandc1-europe/**'
  ]);

  $translateProvider.translations('en', {
    TAB_HOME: 'Home',
    TAB_BIBLES: 'Bibles',
    TAB_SERMONS: 'Sermons',
    TAB_RESOURCES: 'Resources',
    TAB_SETTINGS: 'Settings',
    TAG_LINE: 'Bibles, Sermons, and Resources in your language!',
    SETTINGS_TITLE: 'Settings',
    SETTINGS_EN: 'English',
    SETTINGS_PT: 'Portuguese',
    SETTINGS_INFORMATION: 'Information',
    SETTINGS_CLANGUAGE: 'Choose the App language:'
  });
  $translateProvider.translations('pt', {
    TAB_HOME: 'Casa',
    TAB_BIBLES: 'Biblias',
    TAB_SERMONS: 'Sermoés',
    TAB_RESOURCES: 'Recoursos',
    TAB_SETTINGS: 'Configuração',
    TAG_LINE: 'A Biblia, Sermoés, e Recoursos Cristão no seu lingua!',
    SETTINGS_TITLE: 'Configuração',
    SETTINGS_EN: 'Inglês',
    SETTINGS_PT: 'Portugûes',
    SETTINGS_INFORMATION: 'Informação',
    SETTINGS_CLANGUAGE: 'Escole a lingua de Applicativo:'
  });
  $translateProvider.preferredLanguage('en');
})

.value('settings', {
  damId: "ENGESVN2DA",
  dbtKey: 'd634c26f06be1dae73edfb08d7290f52',
  orgList: [    
    {"orgName": "Peniel International", checked: true},
    {"orgName": "Assemblies of God", checked: false},
    {"orgName": "Baptist", checked: true},
    ],
  rLanguage: "Portuguese",
  rootURL: 'http://cloud.faithcomesbyhearing.com/mp3audiobibles2/',
  bibleBook: "",
  bibleBookId: 1,
  bibleBookNumChapters: 5,
  bibleChapterId: 0,
  languages: "",
  aapNum: 1
})

.controller('SermonsCtrl', ['settings', '$scope', function(settings, $scope, $stateParams) {
  console.log("loadPlayer called");
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
      {"artist": "Pastor Mario Casquinha",
      "title": "Tres Tipos de Maldição",
      "image": "audios/Ap-Mario.jpg",
      "duration": "5604",
      "src": "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2016-01-06%20-%20Ap%20Mario%20Tres%20Tipos%20de%20Maldicao.mp3"},
      {"artist": "Pastor Mario Casquinha",
      "title": "Descobrindo a sua Função",
      "image": "audios/Ap-Mario.jpg",
      "duration": "4189",
      "src": "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2013-10-30%20PT.%20AP.Mario%20Descobrindo%20a%20sua%20Funcao.mp3"},
      {"artist": "Pastor Mario Casquinha",
      "title": "O Tribunal de Cristo",
      "image": "audios/Ap-Mario.jpg",
      "duration": "4189",
      "src": "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2013-04-30%20PT.EN%20AP.Mario%20O%20tribunal%20de%20Cristo-.mp3"},
      {"artist": "Pastor Mario Casquinha",
      "title": "Conciencia do tipo de Crente que nos Somos",
      "image": "audios/Ap-Mario.jpg",
      "duration": "4189",
      "src": "https://storage.googleapis.com/jonandc1-europe/teachings/peniel/apmariocasquinha/2015-28-08%20PT.EN%20Ap.%20Mario%20Casquinha_Conciencia%20do%20tipo%20de%20crente%20que%20nos%20somos.mp3"},
      {"artist": "Pastor Mario Casquinha",
      "title": "Unção",
      "image": "audios/Ap-Mario.jpg",
      "duration": "4189",
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
    $scope.addtoPlaylist = function(sermon){
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
      
    };
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
    /*$scope.books.forEach() {
      if($translate.use() === 'en') {
        this.name = data.en_language;
      } else $scope.books.name = data.pt_language;
      console.log($scope.books);
    };*/
  });
  $scope.settings = settings;
  $scope.changeBookId = function(settings, book, bookName){
    settings.bibleBookId = book;
    settings.bibleBook = bookName;
    console.log("function changeBookId called. Book = : ", book);
  };
  $http.get('ajax/languages.json').success(function(data) {
    $scope.language = data;
    console.log('languages.json called successfully');
  });
  settings.languages = $scope.language;
}])

.controller('BibleBookCtrl', ['$scope', '$http', 'settings', function($scope, $http, settings) {
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

}])

.service("bibleService", function(){
  this.book = "Matthew";
  this.bookId = 1;
  this.chapter_id = 0;
  this.damId = "ENGESVN2DA";
})

.controller('SettingsCtrl', ['$rootScope', '$scope', 'settings', '$translate', function($rootScope, $scope, settings, $translate) {
  $scope.appLanguage="en";
  $rootScope.settings= {};
  $rootScope.settings.language="PORNLHN2DA";
  console.log("Organization Information: ", settings.orgList);
  $scope.orgList = settings.orgList;
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