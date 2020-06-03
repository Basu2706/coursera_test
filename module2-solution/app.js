(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject=['ShoppingListCheckOffService'];

  function ToBuyController (ShoppingListCheckOffService){
    var buyList = this;
    console.log(ShoppingListCheckOffService);
    buyList.buyItems = ShoppingListCheckOffService.getBuyItems();

    console.log("buy list: ",buyList.buyItems);

    buyList.bought = function(itemIndex){
        ShoppingListCheckOffService.bought(itemIndex);
    };

  }

  AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService){
    var boughtList = this;
    boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService (){
    var service = this;

    //var buyItems = [];
    var boughtItems = [];
    console.log("In ShoppingListCheckOffService");
    var buyItems = [{
                name: "cookies",
                quantity: 10
                },
                {
                  name: "bread",
                  quantity: 20
                },
                {
                  name: "chocolate",
                  quantity: 30
                },
                {
                  name: "candy",
                  quantity: 5
                },
                {
                  name: "soft drinks",
                  quantity: 8
                }

              ];

    service.bought = function(itemIndex){
     boughtItems.push(buyItems[itemIndex]);
      buyItems.splice(itemIndex,1);
    };

    service.getBuyItems = function(){
      return buyItems;
    };

    service.getBoughtItems = function(){
      return boughtItems;
    };
  }

})();
