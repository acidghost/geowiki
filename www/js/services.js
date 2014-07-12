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

  });
