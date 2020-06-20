(function(){
'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirectve);

  function FoundItemsDirectve(){
    var ddo={
      templateUrl:"foundItems.html",
      scope: {
        items: "<",
        myTitle: "@title",
        onRemove: "&"
      },
      controller: FoundItemsDirectveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectveController(){
    var list = this;

    list.itemsNotFound = function(){
      if (list.items !==undefined && list.items.length === 0){
        return true;
      }
      return false;
    };
  }

  NarrowItDownController.$inject=['MenuSearchService'];

  function NarrowItDownController (MenuSearchService){
    var menu = this;
    menu.searchItem= "";
    //menu.found = [];
    menu.findItems = function(searchItem){
      var promise = MenuSearchService.getMatchedMenuItems();
      promise.then(function(response){
        //console.log("response.data.menu_items "+response.data.menu_items.length);
        var i;
        menu.found = [];
        for (i=0; i < response.data.menu_items.length; i++){
          //console.log(response.data.menu_items[i].description);
          try {
            //console.log(response.data.menu_items[i].description.toLowerCase().indexOf(searchItem));
            //console.log(searchItem);
            if(response.data.menu_items[i].description.toLowerCase().indexOf(searchItem) > 0 ){

              menu.found.push({ short_name: response.data.menu_items[i].short_name,
                                name: response.data.menu_items[i].name,
                                description: response.data.menu_items[i].description
                              });//response.data.menu_items[i].short_name+" , "+response.data.menu_items[i].name);
              //console.log("In if - "+menu.found);
            }
          }catch(error){
            console.log("Error -"+error);
          }
        }
      //  if ( response.description.toLowerCase().indexOf(searchItem)){
      //    menu.found.push()
      //  }
        //menu.found = response.data;
        console.log(menu.found);
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });

    }
      menu.removeItem = function(itemIndex){
        menu.found.splice(itemIndex,1);
      }
    }

  MenuSearchService.$inject = ['$http','ApiBasePath'];
  function MenuSearchService($http,ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function (){
      var response = $http ({
        method: "GET",
        url: (ApiBasePath+"/menu_items.json")
      });

      return response;
    };
  }

})();
