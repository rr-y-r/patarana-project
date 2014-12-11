define([

], function(){
    function Ctrllogin($scope,serviceAjax,$location,localStorageService,growl,$timeout){

        $scope.loading = false;
        $scope.login = {};

        $scope.loginCheck = function(){
            $scope.loading = true;
            
            if($scope.login['username'] !== undefined || $scope.login['password'] != undefined ){
                serviceAjax.posDataToServer('login',$scope.login).then(function(data){
                    $timeout(function(){
                        if (data.length > 0) {
                            
                            //$location.path('/main');
                            localStorageService.add('user',data);
                            if (data[0]['level'] == 'admin'){
                                $location.path('/main');
                                localStorageService.add('user',data);
                            }else{
                                $location.path('/userHome');
                                localStorageService.add('user',data);   
                            }
                        } else {
                            growl.addWarnMessage("Ops, User / Pass Anda Tidak Terdaftar Di database ",{ttl: 1000});
                            $scope.loading = false;
                        }
                    },2000);
                });
            }else{
                $scope.loading = false;
                growl.addErrorMessage("ops, sepertinya anda melewatkan sesuatu",{ttl: 2000});
            }
        };
        
        $scope.signUpUser = function(data){
            serviceAjax.posDataToServer('user','insert',data).then(function(data){
                if(data){
                    /*close modal*/
                    /*tamplikan list*/
                    growl.addSuccessMessage('registrasi berhasil!',{ttl: 2000});
                    $scope.closeModal();
                }
            });
        }
        
        $scope.closeModal = function(){
            $scope.signUpModal = 'hide';
            $scope.data = '';
        }
        
        $scope.signUpModal = function(signUpStep,id){

            $scope.signUpStep = 'createUser';
            $scope.signUpForm = 'show';
            $scope.storeForm = 'hide';

            $scope.signUpSubmit = function(signUpStep,data){
                $scope.submitSignUpForm(data);
                //on trial
            };


                

            $scope.submitStoreForm = function(data){
                serviceAjax.posDataToServer('user','signUp',data).then(function(data){
                    if(this){
                        $scope.closeModal();
                        growl.addSuccessMessage('store Berhasil Di Tambah!',{ttl: 2000});
                    }
                });
            };

            $scope.submitSignUpForm = function(data){
                serviceAjax.posDataToServer('user','checkUser',data).then(function(data){
                    if (this) {
                        $scope.signUpStep = 'createStore';
                        $scope.modaloption = 'show';
                        $scope.signUpForm = 'hide';
                        $scope.storeForm = 'show';
                    }
                });
            };


            $scope.delete = function(id){
                serviceAjax.getDataFromServer('store','delete',+id).then(function(data){
                    if(data.length > 0){
                        console.log('log isinfunction');

                        growl.addSuccessMessage('store Berhasil Di Delete!',{ttl: 2000});
                        serviceAjax.getDataFromServer('store','get')
                        .then(function(data){
                            if (data) {
                                $scope.store = data;
                                $scope.$apply();
                            }
                        });
                    }
                });

            };
            
            $scope.edit = function(data){
                serviceAjax.posDataToServer('store','update',data).then(function(data){
                    if(data){
                        /*close modal*/
                        $scope.closeModal();
                        /*tamplikan list*/
                        $scope.gotoPage($scope.page);
                        growl.addSuccessMessage('store Berhasil Di Edit!',{ttl: 2000});
                    }
                });
            }




            /*
            $scope.modaltest = function(){
                if (json.isSuccessful) {
                    $('#successMessage').html(json.message);
                    $('#form_token').fadeOut(750);
                    $('#success').show();
                    $('#error').hide();
                    $('#f_download').fadeIn(2000);
                    $.ajax().always(function () {
                        btn.button('reset')
                    });

                    document.getElementById('dl_link').href = "<?=site_url('c_site/create_pdf/')."/".$token['iid'];?>";
                    console.log('validation sucess ');
                    console.log('download link = '+document.getElementById('dl_link').href);
                    rdata = null;
                } else {
                    $('#errorMessage').html(json.message);
                    $('#success').hide();
                    $('#f_download').hide();
                    $('#error').show();
                    console.log('validation failed ');
                    $.ajax().always(function () {
                        btn.button('reset')
                    });
                $('#storeForm').hide();
                $('#signUpError').hide();
                $('#signUpSuccess').hide();

                var t_id = $(this).data('id');
                $('#imb_key').val(t_id);

                $('#signUpSubmitBtn').click(function(){

                    btn.button('loading');
                    $('#error').hide();
                    $('#success').hide();
                    $('#f_download').hide();

                    var imb_key = '<?=$token['imb_key'];?>';
                    console.log("t_id + imb_key = " + t_id+" "+imb_key );

                    if(t_id == imb_key){
                        console.log("t_id + imb_key (should be same) = " + t_id+" "+imb_key );

                        var faction = "<?=site_url('c_site/token_validation/'.$token['iid']);?>";
                        var fdata = $('#input_token').serialize();

                        var input = document.getElementById('t_input').value;
                        console.log('input -> '+input);
                        console.log('url -> '+faction);

                        $.post(faction, {itoken : input}, function(rdata) {
                            var json = $.parseJSON(rdata);
                            if (json.isSuccessful) {
                                $('#successMessage').html(json.message);
                                $('#form_token').fadeOut(750);
                                $('#success').show();
                                $('#error').hide();
                                $('#f_download').fadeIn(2000);
                                $.ajax().always(function () {
                                    btn.button('reset')
                                });

                                document.getElementById('dl_link').href = "<?=site_url('c_site/create_pdf/')."/".$token['iid'];?>";
                                console.log('validation sucess ');
                                console.log('download link = '+document.getElementById('dl_link').href);
                                rdata = null;
                            } else {
                                $('#errorMessage').html(json.message);
                                $('#success').hide();
                                $('#f_download').hide();
                                $('#error').show();
                                console.log('validation failed ');
                                $.ajax().always(function () {
                                    btn.button('reset')
                                });
                            }
                        });
                    }
                });*/
        }
    }

    // set to global
    window.Ctrllogin = Ctrllogin;

    return Ctrllogin;
});