(function(){
    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService)//ShoppingListCheckOffService


    ToBuyController.$inject = ['ShoppingListCheckOffService']
    function ToBuyController(ShoppingListCheckOffService){
        var list1 = this
        list1.items = ShoppingListCheckOffService.getItems('toBuy')
        list1.buy = function(itemIndex){
            console.log("called");
            ShoppingListCheckOffService.buy(itemIndex)
            
        }

    }
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var list2 = this
        list2.items = ShoppingListCheckOffService.getItems('notToBuy')
    }

    function ShoppingListCheckOffService(){
        var service = this

        var itemsTobuy =[ 
            {
                name:"item1",
                quantity:10,
            },
            {
                name:"item2",
                quantity:20,
            },
            {
                name:"item3",
                quantity:30,
            },
            {
                name:"item4",
                quantity:40,
            },
            {
                name:"item5",
                quantity:50,
            },
            {
                name:"item6",
                quantity:60,
            },
           
        ]
        var notToBuy= [
        ]

    service.getItems =  function(type){
        if(type === 'toBuy')
        { 
            return itemsTobuy
        }
       // const notToBuy = items.filter((item)=>!item.tobuy)
        console.log("not to buy", notToBuy);
            return notToBuy
    }

    service.buy = function(itemIndex){
        
         var item = itemsTobuy.splice(itemIndex,1)
         console.log(item[0],typeof item);
         
         notToBuy.push(item[0])
    }


    }


    







})();