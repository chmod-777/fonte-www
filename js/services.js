angular.module('starter.services', [])
.value('settings', {
  damId: "ENGESVN2DA",
  dbtKey: 'd634c26f06be1dae73edfb08d7290f52',
  orgList: [    
    {"id": 0,
    "en_orgName": "Peniel International",
    "pt_orgname": "Peniel Internacional",
    checked: true,
    "en_description": "Peniel Worship Center started in the city of Beira, in the suburb Matacuane, in a small room of a house with about 15 children. After 3 months, the church moved to a room in a private school. In 6 months the church grew to 80 members, and for lack of space the services took place in a building owned by the National Teacher’s Organization in the Ponta Gea district. By the end of the first year, the church grew to 150 members.<br/>The following year we returned to Matacuane and met in a circus-style tent. Later that year, a cyclone destroyed the tent but a week afterward we put up an even bigger tent that could hold 400 people. In 2006 the church grew to 500 members, and in 2007 we moved our services to an outdoor basketball stadium that can hold our now 5,000 members.",
    "pt_description":"Igreja Centro de Adoração Peniel começou em Matacuane numa pequena sala de uma casa tipo1, com aproximadamente 15 crianças. Depois de 3 meses a igreja passou para uma escola privada chamada Liceu Mira. Em 6 meses a igreja cresceu para 80 membros, por falta de espaço, os cultos passaram a ser realizados na ONP, em 6 meses o número de membros cresceu de 80 para 150 membros.<br/>No ano seguinte voltamos para Matacuane no liceu Mira, numa tenda provisória. Tempos depois passou um ciclone que derrubou a tenda. Uma semana depois, Construímos uma tenda para 400 pessoas. Até 2006 o número era de 500 membros. De 2007 à 2014 passamos a realizar os nossos cultos no pavilhão do Estrela onde a Igreja cresceu para mais de 5000 (cinco mil) membros.",
    "image": "images/orgs/peniel.png"},
    {"id": 1,
    "en_orgName": "Assemblies of God",
    "pt_orgname": "Assemblia de Deus",
    checked: false,
    "en_description": "The Assemblies of God is committed to fulfilling a four-fold mission. Its primary reason for being is:<br/>Evangelize the lost.<br/>Worship God.<br/>Disciple believers.<br/>Show compassion.",
    "pt_description": "Descrição dos Assemblias de Deus",
    "image": "images/orgs/aofg.gif"},
    {"id": 2,
    "en_orgName": "Baptist Church", 
    "pt_orgName": "Igreja Batista",
    checked: false,
    "en_description": "Baptist churches are found in almost every country in the world. As part of the world-wide Christian church, Baptists form one of the largest families of faith, alongside other trinitarian Christian traditions such as Anglicans, Methodists, Reformed, etc.<br/>For Baptists the concept of a family is important. The church is not so much a particular place or building, but rather a family of believers, committed to Christ, to one another and to the service of God in the world.<br/>In this Baptist family everybody is equal, for everybody has a part to play in the service of God. There is no hierarchy of bishops or priests exercising authority over their members. Equality of status, however, does not mean that all have the same role.<br/>Each local Baptist church appoints its own leaders - or ministers - to have particular responsibility for preaching, teaching and pastoral care. Working alongside these ministers are also deacons, who together with the minister(s) form the leadership team of the local Baptist church.",
    "pt_description": "Descrição da Igreja Batista",
    "image": "images/orgs/baptist.png"}
    ],
    speakerList: [    
    {"id": 0,
    "en_name": "Pastor Mario Casquinha",
    "pt_name": "Apostolo Mário Casquinha",
    "en_description": "Pastor Dr. Mario Casquinha is the leader of the International Peniel Worship Center. He was born in the city of Marromeu in the central-Mozambican province of Sofala. He converted and became a Christian in the city of Beira in 1987. In 2000 he began the Peniel church with only 15 children, and today the church has 5,000 members and is still growing. Peniel has planted daughter churches in 8 of the provincial capitals throughout Mozambique, each with a full-time pastor serving the Lord.<br/>Pastor Mario divides his time between many pursuits: his devotional life with God is his highest priority followed by his family. His lovely wife, Zaida, has accompanied him through their marriage of 17 years to date, and she has provided much-needed support for Mario’s ministry. They have 6 children, 4 girls and 2 boys.<br/>Pastor Mario has dedicated his life to preaching, teaching, and planting churches. In recent years he has even been invited to preach in other countries, and has traveled extensively as a result. His main focus is to preach the message of the Kingdom of God and preparing the church for the second coming of the Lord Jesus Christ.",
    "pt_description":"Apóstolo Dr. Mário Casquinha é  o presidente da Igreja  Peniel Internacional. Nasceu em  Marromeu província de Sofala Centro de moçambique. Converteu-se à Cristo na cidade da Beira em 1987.<br/>No ano 2000, começou com a igreja Peniel, com 15 Crianças, e hoje a igreja está a crescer acima de 7000 mil membros, e conta com  igrejas em 8 capitais províncias de Moçambique   Com pastores ao tempo inteiro servindo ao Senhor. <br/>O Apóstolo divide o seu tempo de várias formas a vida com Deus é a sua Prioridade, em seguida a sua família. Ele tem uma Linda família sua espos-a Bispa Zaida Casquinha tem o  acompanhado. Ao longo destes anos dando todo apoio necessário. Eles estão casados a 17 anos e tem 7 filhos  5 meninas e 2 rapazes.",
    "image": "images/speakers/apMario.jpg"}],


//Igreja Centro de Adoração Peniel começou em Matacuane numa pequena sala de uma casa tipo1, com aproximadamente 15 crianças. Depois de 3 meses a igreja passou para uma escola privada chamada Liceu Mira. Em 6 meses a igreja cresceu para 80 membros, por falta de espaço, os cultos passaram a ser realizados na ONP, em 6 meses o número de membros cresceu de 80 para 150 membros.

//No ano seguinte voltamos para Matacuane no liceu Mira, numa tenda provisória. Tempos depois passou um ciclone que derrubou a tenda. Uma semana depois, Construímos uma tenda para 400 pessoas. Até 2006 o número era de 500 membros. De 2007 à 2014 passamos a realizar os nossos cultos no pavilhão do Estrela onde a Igreja cresceu para mais de 5000 (cinco mil) membros.
  rLanguage: "Portuguese",
  rootURL: 'http://cloud.faithcomesbyhearing.com/mp3audiobibles2/',
  bibleBook: "",
  bibleBookId: 1,
  bibleBookNumChapters: 5,
  bibleChapterId: 0,
  languages: "",
  aapNum: 0
})

.service('fonteFns', ['settings', '$translate', '$http', function(settings, $translate, $http) {
    getLanguages = function (){
      console.log("getLanguages called");
      $http.get('ajax/languages.json').success(function(data) {
        settings.languages = data;
        console.log('languages.json called successfully from fonteFns');
      });
    };
    getLanguages();
    this.languages = settings.languages;
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
    logMe = function() {
      console.log("logMe function called");
    }
}])


;