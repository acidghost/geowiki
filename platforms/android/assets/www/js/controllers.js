angular.module('GeoWiki.controllers', [])

.controller('AppCtrl', function($scope) {
  $scope.languages = [
    //{ lang: 'ar' },
    //{ lang: 'bg' },
    //{ lang: 'ca' },
    //{ lang: 'cs' },
    //{ lang: 'da' },
    { lang: 'de' },
    { lang: 'en', default: true },
    //{ lang: 'eo' },
    { lang: 'es' },
    //{ lang: 'fa' },
    { lang: 'fi' },
    { lang: 'fr' },
    //{ lang: 'gl' },
    //{ lang: 'he' },
    //{ lang: 'hu' },
    //{ lang: 'id' },
    { lang: 'it' },
    { lang: 'ja' },
    //{ lang: 'ko' },
    //{ lang: 'lt' },
    //{ lang: 'ms' },
    { lang: 'nl' },
    //{ lang: 'nn' },
    { lang: 'no' },
    { lang: 'pl' },
    { lang: 'pt' },
    //{ lang: 'ro' },
    { lang: 'ru' },
    //{ lang: 'simple' },
    //{ lang: 'sk' },
    //{ lang: 'sl' },
    //{ lang: 'sr' },
    { lang: 'sv' },
    { lang: 'tr' },
    { lang: 'uk' },
    //{ lang: 'vi' },
    //{ lang: 'vo' },
    //{ lang: 'war' },
    //{ lang: 'zh' }
  ];

    $scope.settings = {};
    $scope.settings.radius = 500;
    $scope.settings.language = 'en';

    $scope.setSettings = function(settings) {
      $scope.settings = settings;
      $scope.$broadcast('settingsChanged', settings);
    };
})

.controller('ArticlesCtrl', ['$scope', 'WikiLocation', function($scope, WikiLocation) {
    $scope.articles = [];
    $scope.$on('settingsChanged', function(event, settings) {
      WikiLocation.get({ lat: 41.12728, lng: 16.86625, radius: settings.radius, locale: settings.language }).$promise.then(
        function(datas) {
          $scope.articles = datas.articles;
        },
        function(error) { console.log(error); }
      );
    });
}]);
