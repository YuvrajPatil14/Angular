(function() {
  "use strict";

  angular
    .module("mod3Sol", [])
    .controller("MenuCategoriesController", MenuCategoriesController)
    .factory("MenuFactory", MenuFactory)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com")
    .directive("foundItems", FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl:"foundItems.html",
      scope: {
        workHere : '@work',
        items: '<',
        onRemove: '&',
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'menu',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var menu = this;
    console.log(menu);
    
  }
  MenuCategoriesController.$inject = ["MenuFactory"];
  function MenuCategoriesController(MenuFactory) {
    var menu = this;
    menu.item = "";
    menu.work = 'please work';
    menu.error = ''
    var menuList = MenuFactory();
    // menu.items="";
    // console.log(menu);

    menu.getAll = function() {
      // console.log("called");
      console.log(menu.item);

      var promise = menuList.getAllItems();
      promise
        .then(function(response) {
         // menu.items = response.data.menu_items;
          var res = menuList.getNarrowedItems(
            menu.item,
            response.data.menu_items
          );
          if(res.length === 0)
          {
            menu.items = []
            menu.error = 'Nothing found!!'
          }
          else{
            menu.items = res
            menu.error = ''
          }
          console.table( menu.items );
        })
        .catch(function(err) {
          console.log("somethig went wrong");
        });
    };

    menu.removeItem = function(itemIndex) {
      menuList.removeItem(menu.items, itemIndex);
      console.log("remove item controller");
    };
  }


  function MenuCategoriesService($http, ApiBasePath) {
    var service = this;
    service.getAllItems = function() {
      console.log("called getAllItems");

      var response = $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json",
      });
      return response;
    };

    service.getNarrowedItems = function(query, list) {
      // console.log('narrrooooo', query,list)
      var narrowedList = []
      if(!query){
        return narrowedList
      }
      var q = query.toLowerCase();
      narrowedList = list.filter(
        (item) => item.description.toLowerCase().indexOf(q) > -1
      );
      return narrowedList;
    };

    service.removeItem = function(items, itemIndex) {
      console.log("remove item service ");

       items.splice(itemIndex, 1);
    };
  }
  MenuFactory.$inject = ["$http", "ApiBasePath"];

  function MenuFactory($http,ApiBasePath) {
    var factory = function () {
      return new MenuCategoriesService($http,ApiBasePath);
    };
  
    return factory;
  }



})();
