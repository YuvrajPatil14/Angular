(function () {
  "use strict";

  angular
    .module("ShoppingList")
    .controller("ItemDetailController", ItemDetailController);

  // Version with resolving to 1 item based on $stateParams in route config
  ItemDetailController.$inject = ["menuItems"];
  function ItemDetailController(menuItems) {
    var itemDetail = this;

    itemDetail.items = menuItems.data;
    itemDetail.category = menuItems.category;
    console.log(menuItems, itemDetail);
    // var item = items[$stateParams.itemId];
    // itemDetail.name = item.name;
    // itemDetail.quantity = item.quantity;
    // itemDetail.description = item.description;
  }
})();
//https://davids-restaurant.herokuapp.com/menu_items.json?category=L
