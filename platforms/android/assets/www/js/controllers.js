angular.module('GeoWiki.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $cordovaGeolocation) {
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
    $scope.position = { lat: 0, lng: 0 };

    $cordovaGeolocation.getCurrentPosition().then(function(position) {
      // Position here: position.coords.latitude, position.coords.longitude
      $scope.position.lat = position.coords.latitude;
      $scope.position.lng = position.coords.longitude;
    }, function(err) {
      // error
      console.log(err);
    });

    var watch = $cordovaGeolocation.watchPosition({ frequency: 1000 });

    watch.promise.then(function() {
      // Not currently used
    }, function(err) {
      // An error occured. Show a message to the user
      console.log(err);
    }, function(position) {
      // Active updates of the position here
      // position.coords.latitude/longitude
      $scope.position.lat = position.coords.latitude;
      $scope.position.lng = position.coords.longitude;
    });

    $scope.decrementRadius = function(amount) {
      if($scope.settings.radius-amount < 250) {
        return;
      } else {
        $scope.settings.radius -= amount;
      }
    };
    $scope.incrementRadius = function(amount) {
      if($scope.settings.radius+amount > 5000) {
        return;
      } else {
        $scope.settings.radius += amount;
      }
    };

    $scope.setSettings = function(settings) {
      $scope.settings = settings;
      $scope.$broadcast('settingsChanged', settings);
    };
})

.controller('ArticlesCtrl', ['$scope', '$window', 'WikiLocation', 'Wikipedia', function($scope, $window, WikiLocation, Wikipedia) {
    $scope.articles = [];
    $scope.$on('settingsChanged', function(event, settings) {
      $scope.updateWikiArticles(settings);
    });
    $scope.updateWikiArticles = function(settings) {
      if(settings == undefined) {
        settings = $scope.settings;
      }
      WikiLocation.get({ lat: $scope.position.lat, lng: $scope.position.lng, radius: settings.radius, locale: settings.language }).$promise.then(
        function(datas) {
          $scope.articles = datas.articles;
        },
        function(error) { console.log(error); }
      ).finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.openLink = function(url) {
      window.open(url, '_system', 'location=no')
    };

    $scope.loadWikiSummary = function(article, index) {
      if(!$scope.articles[index].loadWiki && !article.text) {
        Wikipedia.get({ pagename: article.title, language: $scope.settings.language }).$promise.then(
          function(wiki) {
            console.log(wiki);
            $scope.articles[index].text = wiki.parse.text['*'];
          },
          function(error) {
            console.log('Error', error);
          }
        );
      }
    };

}]);
