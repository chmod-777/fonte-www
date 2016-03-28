angular.module('starter.services', [])
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

.service('fonteFns', ['settings', '$translate', '$http', function(settings, $translate, $http) {
    getLanguages = function (){
      console.log("getLanguages called");
      $http.get('ajax/languages.json').success(function(data) {
        settings.languages = data;
        console.log('languages.json called successfully from fonteFns');
        console.log(data);
      });
    };
    getLanguages();
  this.languages = settings.languages;
}])

;