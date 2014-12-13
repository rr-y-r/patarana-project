define([

], function(){
    function Ctrlproduct($scope,serviceAjax,$location,localStorageService,growl,$timeout){
        /*
        function refresh_files(){
            $.get('./upload/files/')
            .success(function (data){
                $('#files').html(data);
            });
        }
        
        $scope.uploadFile = function(data){

            serviceAjax.posDataToServer('product','doUpload',data).then(function(data){

                    console.log(data);
                    growl.addSuccessMessage('Berhasil Di upload',{ttl: 2000});

                $.ajaxFileUpload({
                    url 			:'../upload/upload_file/', 
                    secureuri		:false,
                    fileElementId	:'productImg',
                    dataType		: 'json',
                    data			: {
                        'title'				: $('#title').val()
                    },
                    success	: function (data, status){
                        if(data.status != 'error'){
                            $('#pimg').html('<p>Reloading files...</p>');
                            refresh_files();
                            $('#title').val('');
                        }
                        alert(data.msg);
                    }
                });
                return false;

            });
            
            
        }
        

        
        $scope.updateProduct = function(){
            $.get('./upload/files/')
            .success(function (data){
                $('#files').html(data);
            });
        }
        
        
        $scope.level = localStorageService.get('user');

        $scope.loaddata = serviceAjax.getDataFromServer('product','get').then(function(data){
            if (data) {
                $scope.product = data;
                $scope.$apply();
            }
        });

        $scope.loaddata;
        */
        $scope.productModal = function(action){
            if(action=='add'){
                $scope.modaloption = 'show';
                $scope.action = action;
            }else if(action =='Edit'){
                serviceAjax.getDataFromServer('product','getbyid',+id).then(function(data){
                    if (data) {
                        $scope.modaloption = 'show';
                        $scope.action = action;
                        $scope.data = data[0];
                        $scope.$apply();
                    } else {

                        serviceAjax.getDataFromServer('product','get').then(function(data){
                            if (data) {
                                $scope.product = data['data'];
                            }
                        });

                    }
                });
            }
        };

        $scope.closeModal = function(){
            $scope.modaloption = 'hide';
            $scope.data = '';
        }
        
        $scope.saveProduct = function(data,action){
            $scope.submitProduct(data);
        };

        $scope.submitProduct = function(data){
            serviceAjax.posDataToServer('product','insert',data).then(function(data){
                if(data){
                    console.log(data);
                    $scope.closeModal();
                    growl.addSuccessMessage('product Berhasil Di Tambah!',{ttl: 2000});
                }
            });
        };
        
        $scope.deleteProduct = function(id){
            serviceAjax.getDataFromServer('product','delete',+id).then(function(data){
                if(data.length > 0){
                    console.log('log isinfunction');
                    growl.addSuccessMessage('product Berhasil Di Delete!',{ttl: 2000});
                    serviceAjax.getDataFromServer('product','get')
                    .then(function(data){
                        if (data) {
                            $scope.product = data;
                            $scope.$apply();
                        }
                    });
                }
            });

        };
        $scope.editProduct = function(data){
            serviceAjax.posDataToServer('product','update',data).then(function(data){
                if(data){
                    $scope.closeModal();
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('product Berhasil Di Edit!',{ttl: 2000});
                }
            });
        }
        
    }
    
    window.Ctrlproduct = Ctrlproduct;

    return Ctrlproduct;
}); 