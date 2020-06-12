(function () {
  "use strict";

  angular.module("ShoppingList").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise("/");

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state("home", {
        url: "/",
        templateUrl: "src/shoppinglist/templates/home.template.html",
      })

      // Premade list page
      .state("mainList", {
        url: "/categories",
        templateUrl:
          "src/shoppinglist/templates/main-shoppinglist.template.html",
        controller: "MainShoppingListController as mainList",
        resolve: {
          items: [
            "ShoppingListService",
            function (ShoppingListService) {
              return ShoppingListService.getItems();
            },
          ],
        },
      })

      // Item detail
      .state("itemDetail", {
        url: "/items/{itemId}",
        templateUrl: "src/shoppinglist/templates/item-detail.template.html",
        controller: "ItemDetailController as itemDetail",
        resolve: {
          menuItems: [
            "$stateParams",
            "ShoppingListService",
            function ($stateParams, ShoppingListService) {
              console.log($stateParams);

              return ShoppingListService.getMenuItems($stateParams.itemId).then(
                function (items) {
                  console.log(items);

                  return {
                    data: items.data.menu_items,
                    category: items.data.category.name,
                  };
                }
              );
            },
          ],
        },
      });
    // .state('mainList.itemDetail', {
    //   // url: '/item-detail/{itemId}',
    //   templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    //   controller: 'ItemDetailController as itemDetail',
    //   params: {
    //     itemId: null
    //   }
    // });
  }
})();
