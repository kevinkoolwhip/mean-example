angular.module('itemCtrl',['itemService'])
    .controller('itemController',function(Item)	{

        var vm = this;
        vm.processing = true;
        Item.all()
            .success(function(data)	{
                vm.processing = false;
                vm.items = data;
            });

        vm.deleteItem = function (id) {
            vm.processing = true;
            console.log(id);
            Item.delete(id)
                .success(function (data) {
                    Item.all()
                        .success(function(data){
                            vm.processing = false;
                            vm.items    = data;
                        });
                });
        };
    })
    .controller('newItemController',function(Item){
        var vm = this;
        vm.type = 'create';
        vm.saveItem = function(){
            vm.processing = true;
            vm.message = '';
            console.log(vm.itemData);
            Item.create(vm.itemData)
                .success(function (data) {
                    vm.processing = false;
                    vm.itemData = {};
                    vm.message = data.message;
                })
        }

    });