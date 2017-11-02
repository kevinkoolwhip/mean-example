angular.module('itemService', [])
    .factory('Item',function($http){

        var itemFactory = {};

        itemFactory.get = function(id)	{
            return $http.get('api/item/' + id );
        };
        itemFactory.all = function()	{
            return $http.get('/api/item');
        };
        itemFactory.create = function(item)	{
            return $http.post('/api/item', item);
        };
        itemFactory.delete = function(id)	{
            return $http.delete('/api/item/' + id);
        };

        return itemFactory;
    });