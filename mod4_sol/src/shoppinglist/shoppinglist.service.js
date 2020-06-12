(function () {
  "use strict";

  angular
    .module("ShoppingList")
    .service("ShoppingListService", ShoppingListService)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

  ShoppingListService.$inject = ["$q", "$timeout", "ApiBasePath", "$http"];
  function ShoppingListService($q, $timeout, ApiBasePath, $http) {
    var service = this;

    // List of shopping items
    var items = [];

    service.getItems = function () {
      console.log("called getAllItems", ApiBasePath);

      var response = $http({
        method: "GET",
        url: ApiBasePath + "/categories.json",
      });
      //console.log(response);
      return response;
    };

    service.getMenuItems = function (id) {
      console.log("called getMenuItems", ApiBasePath);

      var response = $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json?category=" + id,
      });
      //console.log(response);
      return response;
    };
  }
})();
