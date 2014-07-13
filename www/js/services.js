/**
 * Created by acidghost on 12/07/14.
 */

angular.module('GeoWiki.services', ['ngResource'])

.factory('WikiLocation', function($resource) {

    return $resource('http://api.wikilocation.org/articles?format=json&lat=:lat&lng=:lng&radius=:radius&locale=:locale', null,
      {
        'get': { method: 'GET', isArray: false }
      }
    );

  })

.factory('Wikipedia', function($resource) {

    return $resource('http://:language.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=:pagename', null,
      { 'get': { method: 'GET' } }
    );

  });
