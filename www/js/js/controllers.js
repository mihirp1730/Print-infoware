angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('AppCtrl', function($scope, $state, $ionicModal, $ionicLoading, $ionicPlatform, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

        

   $ionicPlatform.registerBackButtonAction(function() {
        if ($location.path() === "/login" || $location.path() === "login") {
            navigator.app.exitApp();
        } else {
            $ionicHistory.goBack();
            //navigator.app.goBack();
        }
    }, 100);

        $scope.show = function(){
        
            $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
            });
        };
        

        $scope.hide = function(){
        $ionicLoading.hide();
        };

    $scope.GotoReset = function(email){

  if(email==undefined){
      //$cordovaToast.show('Enter Email', 'short', 'center');
  }

  else{

  localStorage.setItem("Email", email);
  $state.go('reset_password');

}


}



$scope.back_forgot = function(){
  $state.go('forgot_password');
}

        $scope.logout = function() {
            $state.go('login');
                }

$scope.GetEmail = function(){
  $scope.email = localStorage.getItem("Email");
}


$scope.ResetPassword = function(password){

  if(password==undefined){

    $cordovaToast.show('Enter Password', 'short', 'center');
  }

  else{

    $scope.show($ionicLoading);

    var email = localStorage.getItem("Email");

    $scope.ResetData = {

                        "Email":email,
                        "Password":password,

    }

    

     $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:51578/api/account/resetPassword',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.ResetData),
//           ,
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                
            },
            success: function(data, status)
            {
           
              console.log(data.Message);
              if(data.Message == 'Unregistered email'){

                 $cordovaToast.show('Your Email Address Is Not Registered', 'short', 'center');

                 $scope.hide($ionicLoading);

                 $state.go('forgot_password');

              }

              else{

                //$cordovaToast.show('Password Updated', 'short', 'center');
                $scope.hide($ionicLoading);
                 $state.go('login');
              }
             
            },
            error: function(error)
            {
                console.log(error);
            }
        });

  }

} 

    

})

.controller('PrintjobCtrl', function($scope, $ionicLoading, $location, $ionicPlatform, GetArticleServices, $ionicHistory,  $ionicPopup, $rootScope, $http, $state) {
        $scope.show = function(){
  
            $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
            });
        };
 

        $scope.hide = function(){
        $ionicLoading.hide();
        };

 
        var token = localStorage.getItem("token");

        $scope.GetArticle_Category = function(){
            
         $scope.show($ionicLoading);
            
            $http({
                method: "GET",
                url: "http://localhost:51578/api/category/getcategory",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token}
                }).success(function (response) {
                    $scope.hide($ionicLoading);
                    console.log(response);
                    $scope.category = response.Data;
                })
             }   

             $scope.Job={};

             $scope.c_id = function(Name){
                 console.log($scope.c_id);
                var Id = $scope.Job.Data.Id;
                localStorage.setItem("aname", Name);
                $scope.show($ionicLoading);
                $http({
                        method: "GET",
                        url: "http://localhost:51578/api/article/getarticlebycategoryid?categoryId="+Id,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': token}
                    }).success(function (response) {
                    $scope.hide($ionicLoading);
                    $scope.articlename = response.Data;
                    })
                }

})

.controller('LoginCtrl', function($scope, $ionicLoading, $location, $ionicPlatform, $ionicHistory,  $ionicPopup, $rootScope, $http, $state) {
      
       $scope.signup = function() {
        $state.go('signup');
    }

     $scope.forgot = function() {
        $state.go('forgot_password');
    }
    
      $scope.logout = function() {
            $state.go('login');
        }

        $scope.LoginData = {};

        
        $scope.login_role = function() {

        if($scope.LoginData.Email==undefined){
            alert("Enter Email");
        }

            else if($scope.LoginData.Password==undefined){
                alert("Enter Password");
            }

                else{

                        //$scope.show($ionicLoading);

      $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:51578/api/account/token',
            contentType: "application/Body-x-www-form-urlencoded",
            dataType: "json",
            data: {'grant_type': 'password','username': $scope.LoginData.Email,
            'password': $scope.LoginData.Password, 'gcmString': localStorage.getItem("gcm")},
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
               // xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
            console.log(data);  
            localStorage.setItem("token", 'bearer '+data.access_token); // Contains the suite
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("name", data.name); 
            localStorage.setItem("balance", data.balance);
            localStorage.setItem("userRole", data.userRole);

             if(data.userRole=='Admin'){

                $state.go('app.dashboard');
                $scope.hide($ionicLoading);
                $rootScope.isShowNavT1=true;
                $rootScope.isShowNavT2=true;
                $rootScope.isShowNavT3=true;

                $rootScope.isShowNavU1=false;
                $rootScope.isShowNavU2=false;
                $rootScope.isShowNavU3=false;
                $rootScope.isShowNavU4=false;
                $rootScope.isShowNavU5=false;
            }

             else if(data.userRole=='Master Admin'){

                 $state.go('app.dashboard');
                  $scope.hide($ionicLoading);

                  $rootScope.isShowNav=true;
                  $rootScope.isShowNav1=true;
                  $rootScope.isShowNav2=true;
                  $rootScope.isShowNav3=true;
                  $rootScope.isShowNav4=true;
                  $rootScope.isShowNav5=true;

            }

            else{

                $state.go('app.dashboard');
                 //$scope.hide($ionicLoading);
                $rootScope.isShowNavU1=true;
                $rootScope.isShowNavU2=true;
                $rootScope.isShowNavU3=true;
                $rootScope.isShowNavU4=true;
                $rootScope.isShowNavU5=true;

                  $rootScope.isShowNav=false;
            } 

            },
            error: function(error)
            {

                //$cordovaToast.show(error.responseJSON.error_description, 'short', 'center');
                //$scope.hide($ionicLoading);
            }
        });
                
      }
    }    
})

.controller('DashCtrl', function($scope, $filter, $cordovaToast, $ionicLoading, $http, $state) {

})



.controller('ClientDashCtrl', function($scope, $filter, $cordovaToast, GetProfile, $ionicLoading, $http, $state) {
        var token = localStorage.getItem("token");
            $scope.show = function() {
                $ionicLoading.show({
                    template: '<p>Please wait...</p><ion-spinner></ion-spinner>'
                });
            };

            $scope.hide = function() {
                $ionicLoading.hide();
            };

                       

            $scope.GetAllProfile = function(){
            var Id = localStorage.getItem("userId");
            var balance = localStorage.getItem("balance");
            $scope.show($ionicLoading);
                $http({
                    method: "GET",
                    url: "http://localhost:51578/api/contact/getcontactinfobyuserid?userId="+Id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': token}
                }).success(function (response) {
                    console.log(response);
                    $scope.hide($ionicLoading);
                    $scope.profile = response.Data;
                    console.log(response.Data)

            localStorage.setItem("ContactId", response.Data.ContactId.Id);
            localStorage.setItem("AddressId", response.Data.AddressId.Id);
                          
                           
                          
                $scope.FirstName = response.Data.ContactId.FirstName;
                $scope.LastName = response.Data.ContactId.LastName;
                $scope.BirthDate = $filter('date')(response.Data.ContactId.BirthDate, 'yyyy-MM-dd');
                $scope.Email = response.Data.ContactId.Email;
                $scope.Phone = response.Data.ContactId.Phone;
                $scope.Mobile = response.Data.ContactId.Mobile;
                $scope.Street1 = response.Data.AddressId.Street1;
                $scope.Street2 = response.Data.AddressId.Street2;
                $scope.City = response.Data.AddressId.City;
                $scope.State = response.Data.AddressId.State;
                $scope.Country = response.Data.AddressId.Country;
                $scope.PinCode =  response.Data.AddressId.PinCode;
                 $scope.hide($ionicLoading);
                })
            } 
                
                    $scope.user_detail = function(){
                        $state.go('app.profile_edit');
                    }



        $scope.edit_user = function(UserId, UserName, FirstName, LastName, BirthDate, Email, Phone, Mobile, Street1, Street2
     , City, State, Country, PinCode){
  $scope.show($ionicLoading);
  
 $scope.edit_data =

   {
    "Data":{
          "Id":localStorage.getItem("userId"),
         // "Username":UserName,
          //"Password":Password,
          "ContactId":{
            "Id":localStorage.getItem("ContactId"),
          "FirstName":FirstName,
          "LastName":LastName,
          "BirthDate":BirthDate,
          "Email":Email,
          "Phone":Phone,
          "Mobile":Mobile
           },
        //   "UserRole":{
        //     "Name":UserRole
        //   },
          "AddressId":{
            "Id":localStorage.getItem("AddressId"),
          "Street1":Street1,
          "Street2":Street2,
          "City":City,
          "State":State,
          "Country":Country,
          "PinCode":PinCode
          
          }        
         
 }
}

  
 console.log($scope.edit_data);

$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:51578/api/account/manageinfo',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.edit_data),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                $ionicHistory.goBack();
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
  
}
    

})


.controller('AdminCtrl', function($scope, $filter, $ionicLoading, $http, $state, $ionicPopup, $ionicHistory) {

        
$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

var token = localStorage.getItem("token");

 
        $scope.GetServices = function(){
        $http({
            method: "GET",
            url: "http://localhost:51578/api/category/getcategory",
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token}
        }).success(function (response) {
            console.log(response);
            $scope.hide($ionicLoading);
            $scope.category = response.Data;
          })
        }


// $scope.GetUsers = function(){
//    $scope.show($ionicLoading);
//   $http({
//     method: "GET",
//     url: "http://api.skyjinxtechnology.com/api/contact/getallnamebyrole",
//     headers: {'Content-Type': 'application/x-www-form-urlencoded',
//               'Authorization': token}
// }).success(function (response) {
//     console.log(response);
//     $scope.hide($ionicLoading);
//     $scope.userlist = response.Data;
//   })
// }

})

.factory('GetProfile', function($http){

  var token = localStorage.getItem("token");
  
  return {
   
    GetAllProfile: function(){

    return  $http({
    method: "GET",
    url: "http://localhost:51578/api/contact/getcontact",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
   console.log(response);
   profile = response.Data;
   return profile;

});

    }
  }
})

.controller('ProfileCtrl', function($scope, $ionicLoading, $ionicPopup, GetProfile, $cordovaToast, $http, $state, $filter) {
        var token = localStorage.getItem("token");
            $scope.show = function() {
                $ionicLoading.show({
                    template: '<p>Please wait...</p><ion-spinner></ion-spinner>'
                });
            };

            $scope.hide = function() {
                $ionicLoading.hide();
            };

                       

            $scope.GetAllProfile = function(){
            var Id = localStorage.getItem("userId");
            $scope.show($ionicLoading);
                $http({
                    method: "GET",
                    url: "http://localhost:51578/api/contact/getcontactinfobyuserid?userId="+Id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': token}
                }).success(function (response) {
                    console.log(response);
                    $scope.hide($ionicLoading);
                    $scope.profile = response.Data;
                    console.log(response.Data)
                })
        }     





//var token = localStorage.getItem("token");
    $scope.show = function()    {
        $ionicLoading.show({
            template: '<p>Please wait...</p><ion-spinner></ion-spinner>'
        });
    };

    $scope.hide = function() {
        $ionicLoading.hide();
    };

        
    $scope.back_dashboard=function(){
        $state.go('app.dashboard');
    }
    $scope.show($ionicLoading);



$scope.GetUser = function(){ 

var Id = localStorage.getItem("userId");

        $http({
            method: "GET",
            url: "http://localhost:51578/api/contact/getcontactinfobyuserid?userId="+Id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token}
        }).success(function (response) {
            console.log(response);
          
            localStorage.setItem("ContactId", response.Data.ContactId.Id);
            localStorage.setItem("AddressId", response.Data.AddressId.Id);
                          
                           
                          
                $scope.FirstName = response.Data.ContactId.FirstName;
                $scope.LastName = response.Data.ContactId.LastName;
                $scope.BirthDate = $filter('date')(response.Data.ContactId.BirthDate, 'yyyy-MM-dd');
                $scope.Email = response.Data.ContactId.Email;
                $scope.Phone = response.Data.ContactId.Phone;
                $scope.Mobile = response.Data.ContactId.Mobile;
                $scope.Street1 = response.Data.AddressId.Street1;
                $scope.Street2 = response.Data.AddressId.Street2;
                $scope.City = response.Data.AddressId.City;
                $scope.State = response.Data.AddressId.State;
                $scope.Country = response.Data.AddressId.Country;
                $scope.PinCode =  response.Data.AddressId.PinCode;
                 $scope.hide($ionicLoading);
                }) 
                }
                    $scope.user_detail = function(){
                        $state.go('app.profile_edit');
                    }

        $scope.back_profile = function(){
            $state.go("app.client_dashboard");
        }


$scope.edit_user = function(UserId, UserName, FirstName, LastName, BirthDate, Email, Phone, Mobile, Street1, Street2
     , City, State, Country, PinCode){
  $scope.show($ionicLoading);
  
 $scope.edit_data =

   {
    "Data":{
          "Id":localStorage.getItem("userId"),
         // "Username":UserName,
          //"Password":Password,
          "ContactId":{
            "Id":localStorage.getItem("ContactId"),
          "FirstName":FirstName,
          "LastName":LastName,
          "BirthDate":BirthDate,
          "Email":Email,
          "Phone":Phone,
          "Mobile":Mobile
           },
        //   "UserRole":{
        //     "Name":UserRole
        //   },
          "AddressId":{
            "Id":localStorage.getItem("AddressId"),
          "Street1":Street1,
          "Street2":Street2,
          "City":City,
          "State":State,
          "Country":Country,
          "PinCode":PinCode
          
          }        
         
 }
}

  
 console.log($scope.edit_data);

$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:51578/api/account/manageinfo',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.edit_data),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                $ionicHistory.goBack();
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
  
}
})


.factory('GetCategoryServices', function($http){

  var token = localStorage.getItem("token");
  
  return {
   
    GetAllCategory: function(){

    return  $http({
    method: "GET",
    url: "http://localhost:51578/api/category/getcategory",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
   console.log(response);
   category = response.Data;
   return category;

});

    }
  }
})

.controller('CategoryCtrl', function($scope, $ionicPopup, $ionicLoading, GetCategoryServices, $ionicHistory, $state, $http) {
    var token = localStorage.getItem("token");    

    
 $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

$scope.GetAllCategory = function(){
  $scope.show($ionicLoading);
        $http({
            method: "GET",
            url: "http://localhost:51578/api/category/getcategory",
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token}
        }).success(function (response) {
            console.log(response);
            $scope.hide($ionicLoading);
            $scope.category = response.Data;
          })
        }     

$scope.delete_category = function(Id) {

$scope.delete_data = {  
                "Data":{
                         "Id": Id
                       } 
              };
   var confirmPopup = $ionicPopup.confirm({
    
     template: 'Are you sure you want to delete plan?'
   });

   confirmPopup.then(function(res) {
     if(res) {

      $scope.show($ionicLoading);
       $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:51578/api/category/removecategory',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.delete_data),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                 xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
              
            
                $http({
                    method: "GET",
                    url: "http://localhost:51578/api/category/getcategory",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',
                              'Authorization': token}
                }).success(function (response) {
                   $scope.hide($ionicLoading);
                   alert('Category Deleted');  
                   $scope.category = response.Data;

                })
              // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
     } else {
       console.log('You are not sure');
     }
   });
 }

  $scope.edit_category = function(Id){
   
    $scope.show($ionicLoading);
    $http({
        method: "GET",
        url: "http://localhost:51578/api/category/getcategorybyid?categoryId="+Id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': token}
    }).success(function (response) {
       
        $scope.edit_category = response.Data;
        localStorage.setItem("Id", response.Data.Id);
        localStorage.setItem("Name", response.Data.Name);
        $scope.hide($ionicLoading);
        $state.go("app.category_edit");

    })

}
   $scope.Id = localStorage.getItem("Id"); 
   $scope.Name = localStorage.getItem("Name");

  $scope.add_new_category = function(){
    $state.go("app.add_category");
  }


        
        $scope.back_list_category = function(){
            $state.go("app.category_list");
        }

$scope.Edit_cat = function(Id, Name){
  $scope.show($ionicLoading);
  
 $scope.edit_cate =

   {
    "Data":{
          "Id":localStorage.getItem("Id"),
          "Name":Name,
     }
}

  
 console.log($scope.edit_cate);

$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:51578/api/category/savecategory',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.edit_cate),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                $ionicHistory.goBack();
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
  
}

$scope.Category = {};
  $scope.new_category = function(){
      if($scope.Category.Data.Name===undefined){
        alert("Enter Name");
      }
      else{

        $scope.show($ionicLoading);

         $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:51578/api/category/savecategory',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.Category),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
               xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                alert("Category Added");
                $state.go('app.category_list');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
      }
    } 
})

.factory('GetArticleServices', function($http){

  var token = localStorage.getItem("token");
  
  return {
   
    GetAllArticle: function(){

    return  $http({
    method: "GET",
    url: "http://localhost:51578/api/article/getarticle",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
   console.log(response);
   article = response.Data;
   return article;

});

    }
  }
})

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model, modelSetter;
            
            attrs.$observe('fileModel', function(fileModel){
                model = $parse(attrs.fileModel);
                modelSetter = model.assign;
            });
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope.$parent, element[0].files[0]);
                });
            });
        }
    };
}])

.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}])

.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.fileInputs = [1,2,3];
    $scope.uploadFile = function(filename){
        var file = $scope[filename];
        console.log('file is ' + JSON.stringify(file));
        console.dir(file);
        var uploadUrl = "http://localhost:51578/api/article/savefile";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
    
}])

.controller('ArticleCtrl', function($scope, $ionicPopup, GetCategoryServices, $ionicLoading, $cordovaCamera, $cordovaFileTransfer, $ionicHistory, $state, $http) {
    var token = localStorage.getItem("token");

        $scope.show = function(){
            $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
            });
        };
            $scope.hide = function(){
            $ionicLoading.hide();
            };
    
        $scope.GetAllArticle = function(){ 
           // $scope.show($ionicLoading);
           
                $http({
                method: "GET",
                url: "http://localhost:51578/api/article/getarticle",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token}
                }).success(function (response) {
                   // $scope.hide($ionicLoading);
                    $scope.article = response.Data;
                })
                
        }

         $scope.GetCategoryServices = function(){ 
            $scope.show($ionicLoading);

            $http({
            method: "GET",
            url: "http://localhost:51578/api/category/getcategory",
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token}
            }).success(function (response) {
                console.log(response);
                $scope.hide($ionicLoading);
                $scope.category = response.Data;
            })
        }

        $scope.edit_article = function(Id){
   
            $scope.show($ionicLoading);
            $http({
                method: "GET",
                url: "http://localhost:51578/api/article/getarticlebyid?articleId="+Id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token}
            }).success(function (response) {
            
                $scope.edit_article = response.Data;
                localStorage.setItem("ArticleId", response.Data.Id);
                localStorage.setItem("ArticleName", response.Data.Name);
                localStorage.setItem("Description", response.Data.Description);
                $scope.hide($ionicLoading);
                $state.go("app.article_edit");

            })
        }
            $scope.Id = localStorage.getItem("ArticleId"); 
            $scope.Name = localStorage.getItem("ArticleName");
            $scope.Description = localStorage.getItem("Description");

            $scope.Edit_art = function(Id, Name, Description){
                $scope.show($ionicLoading);
  
                $scope.edit_artic =

                {
                    "Data":{
                        "Id":localStorage.getItem("Id"),
                        "Name":Name,
                        "Description":Description,
                    }
                }

                
                console.log($scope.edit_artic);

                $.ajax(
                        { 
                            type: 'POST',
                            url: 'http://localhost:51578/api/article/savearticle',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify($scope.edit_artic),
                            beforeSend: function(xhr)
                            {
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.setRequestHeader("Authorization", token);
                            },
                            success: function(data, status)
                            {
                                console.log(data); // Contains the suite
                                $scope.hide($ionicLoading);
                                $ionicHistory.goBack();
                            },
                            error: function(error)
                            {
                                console.log(error);
                            }
                        });
                }

        $scope.selectPicture = function() { 


            var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.PNG
            };

    
                $cordovaCamera.getPicture(options).then(
                function(imageURI) {

                window.FilePath.resolveNativePath(imageURI, function(result) {
                // onSuccess code
                imageURI = 'file://' + result;
                console.log(imageURI);
            
                $scope.picData=imageURI;
                $scope.picData1=imageURI.substr(imageURI.lastIndexOf('/') + 1);
                document.getElementById("demo").innerHTML = $scope.picData1;
                var sFileExtension = $scope.picData1.split('.')[$scope.picData1.split('.').length - 1];
                localStorage.setItem("img_name",$scope.picData1);
                localStorage.setItem("img_ext",'.'+sFileExtension);
                $scope.ftLoad = true;
                var fileURL = $scope.picData;
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.chunkedMode = true;
                
                var success = function (r) {
                localStorage.setItem("img_size",r.bytesSent);
                    console.log("Successful upload...");
                    console.log("Code = " + r.responseCode);
                    // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
                }

                var fail = function (error) {
                    console.log("error");
                }

            
                var params = {};
                params.value1 = "test";
                params.value2 = "param";

                options.params = params;

                var ft = new FileTransfer();
                // SERVER must be a URL that can handle the request, like
                // http://some.server.com/upload.php
            
                ft.upload(fileURL, encodeURI("http://cssent.com/demo/bk/upload.php"), success, fail, options);

        },function (error) {
            console.log("error");
        })
            
        })
    }


            $scope.img_select = function(){
                var control = document.getElementById("external-files");
                console.log(control);
            
                control.addEventListener("change", function(event) {
                // When the control has changed, there are new files
                var files = control.files;
                for (var i = 0; i < files.length; i++) {
                
                    var sFileName = files[i].name;
                    var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1];
                    var dotPosition = sFileExtension.lastIndexOf(".");
                    var fileExt = sFileExtension.substring(dotPosition, sFileExtension.length);
                    localStorage.setItem("img_name", files[i].name);
                    localStorage.setItem("img_type", files[i].type);
                    localStorage.setItem("img_size", files[i].size);
                    localStorage.setItem("img_ext", '.'+fileExt);
                
                }
            }, false);
            }

        $scope.Article = {};
            $scope.new_Article = function(Name, Description, Id, Amount, Page){
                
                if(Name===undefined){
                    alert("Enter Name");
                }
                 else if(Description===undefined){
                    alert("Enter Description");
                }
                 else if($scope.Article.Data.CategoryId.Id===undefined){
                    alert("Select Category");
                }
                //  else if($scope.Article.Data.FileName===undefined){
                //     alert("Enter File Name");
                // }
                 else if($scope.Article.Data.Amount===undefined){
                    alert("Enter Amount");
                }
                 else if(Page===undefined){
                    alert("Enter Number of Pages");
                }
                else{

                    $scope.show($ionicLoading);

                    //var ComplainDate = $filter('date')(new Date(), 'yyyy-MM-dd'); 
                    var img_ext = localStorage.getItem("img_ext");
                    if(img_ext == '.png'){
                    var img_type = 'image/png'
                    }

                    else{
                    var img_type = 'image/jpeg'
                    }

                    $scope.Article = 
                    {
                        "Data" :{
                                "Name":"Unit-1",
                                "Description":"all topics",
                                "CategoryId":
                                {
                                    "Id":localStorage.getItem("CategoryId")
                                },
                                "Description":$scope.Article.Data.Description,
                                "FileId":{
                                        "Name":localStorage.getItem("img_name"),
                                        "MimeType":img_type,
                                        "Extension":localStorage.getItem("img_ext"),
                                        "Size":localStorage.getItem("img_size"),
                                        //"RelativePath":"/files/mca-sem1-unit1"    
                                },
                                "Amount":Amount,
                                "NumberOfPages":Page
                        }
                    }
                    



        

                    $.ajax(
                    { 
                        type: 'POST',
                        url: 'http://localhost:51578/api/article/savearticle',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify($scope.Article),
                        beforeSend: function(xhr)
                        {
                            xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader("Authorization", token);
                        },
                        success: function(data, status)
                        {
                            console.log(data); // Contains the suite
                            $scope.hide($ionicLoading);
                            alert("Article Added");
                            $state.go('app.Article_list');
                        },
                        error: function(error)
                        {
                            console.log(error);
                        }
                    });
                }
            }

            $scope.add_new_article = function(){
                $state.go("app.add_article");
            }

            $scope.back_article_list = function(){
                $state.go("app.article_list");
            }
})

.controller('ProfileListCtrl', function($scope, $ionicLoading, $ionicPopup, $http, $state, $ionicHistory) {

$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

 $scope.add_new_customer = function(){
    $state.go('add_customer');
  }


var token = localStorage.getItem("token");
$scope.GetUsers = function(){
    var Id = localStorage.getItem("userId");
$scope.show($ionicLoading);

 
$http({
    method: "GET",
    url: "http://localhost:51578/api/contact/getcontactbyrole",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.userlist = response.Data;
    $scope.hide($ionicLoading);
  })
}

$scope.showConfirm = function(Id) {

  

   $scope.user = {  
                "Data":{
                    "UserId":
                       { 
                        "Id": Id
                         
                       } 
                     } 
                  };
   var confirmPopup = $ionicPopup.confirm({
    
     template: 'Are you sure you want to delete profile?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log( $scope.user);
       $scope.show($ionicLoading);
       $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:51578/api/contact/removecontact',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.user),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
              
            $http({
                method: "GET",
                url: "http://localhost:51578/api/contact/getcontactbyrole",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          'Authorization': token}
            }).success(function (response) {
               
                $scope.hide($ionicLoading);
                alert("Profile Deleted");
                $scope.userlist = response.Data;
              })
              // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
     } else {
       console.log('You are not sure');
     }
   });
 }


})


.controller('RegisterCtrl', function($scope, $http, $cordovaToast, $state, $ionicLoading, $filter, $ionicPopup, $ionicHistory) {


         $scope.logout = function() {
            $state.go('login');
        }
    
     $scope.user = {};
        $scope.add_new_customer = function(){
          $state.go('add_customer');
        }

        $scope.add_new_user = function(){
          $state.go('add_users');
        } 
  
    $scope.user = {};
        $scope.new_customer = function(){

        if($scope.user.Data.Username==undefined){

          alert("Enter User Name");
          }
            
        else if($scope.user.Data.Password==undefined){

            alert("Enter Password");

          }

          else if($scope.user.Data.ContactId.FirstName==undefined){

            alert("Enter First Name");

          }

          else if($scope.user.Data.ContactId.LastName==undefined){

            alert("Enter Last Name");

          }

          else if($scope.user.Data.ContactId.BirthDate==undefined){

            alert("Enter Birth Date");

          }

          else if($scope.user.Data.ContactId.Email==undefined){

          alert("Enter Email");
          }

          else if($scope.user.Data.ContactId.Phone==undefined){

          alert("Enter Phone");  
          }

          else if($scope.user.Data.ContactId.Mobile==undefined){

            alert("Enter Mobile Number");

          }

          else if($scope.user.Data.ContactId.Mobile.length<10 || $scope.user.Data.ContactId.Mobile.length>10){
            alert("Mobile number must contain 10 digits only"); 
          }

          else if($scope.user.Data.AddressId.Street1===undefined){

            alert("Enter Address Street1");

          }


          else if($scope.user.Data.AddressId.Street2==undefined){

            alert("Enter Address Street2");

          }

          else if($scope.user.Data.AddressId.City==undefined){

            alert("Enter City");

          }

          else if($scope.user.Data.AddressId.State==undefined){

            alert("Enter State");

          }

          else if($scope.user.Data.AddressId.Country==undefined){

            alert("Enter Country");

          }

          else if($scope.user.Data.AddressId.PinCode==undefined){

            alert("Pincode must contain only 6 digits");

          }

          else if($scope.user.Data.AddressId.PinCode.length<6 || $scope.user.Data.AddressId.PinCode.length>6){

            alert("Enter Zipcode");
          
          }
          else if($scope.user.Data.UserRole.Name==undefined){

            alert("Enter User Role");

          }
          else{

          //$scope.show($ionicLoading); 
        //   $scope.user.Data.UserPlanMapId.StartDate = $filter('date')($scope.user.Data.UserPlanMapId.StartDate, 'MM-dd-yyyy');  
        //   $scope.user.Data.UserPlanMapId.EndDate = $filter('date')($scope.user.Data.UserPlanMapId.EndDate, 'MM-dd-yyyy'); 
          $scope.user.Data.ContactId.BirthDate = $filter('date')($scope.user.Data.ContactId.BirthDate, 'MM-dd-yyyy');

          
          
          


        //$scope.user.Data.UserRole.Name = "User";
        

              $.ajax(
                      { 
                          type: 'POST',
                          url: 'http://localhost:51578/api/account/register',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          data: JSON.stringify($scope.user),
                          beforeSend: function(xhr)
                          {
                              xhr.setRequestHeader("Content-Type", "application/json");
                            // xhr.setRequestHeader("Authorization", token);
                          },
                          success: function(data, status)
                          {
                              // console.log(data); // Contains the suite
                              //$scope.hide($ionicLoading);
                              alert("User Added");
                              $state.go('app.dashboard');
                          },
                          error: function(error)
                          {
                              console.log(error);
                          }
                      });
                }
              }
})


.controller('RechargeCtrl', function($scope, $filter, $cordovaToast, GetProfile, $ionicLoading, $http, $state) {

    $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
    }; 

var token = localStorage.getItem("token");

         $scope.GetAllUsers = function(){
            //var Id = localStorage.getItem("userId");
            $scope.show($ionicLoading);
               $http({
                method: "GET",
                url: "http://localhost:51578/api/contact/getcontactlist",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token}
            }).success(function (response) {
                console.log(response);
                $scope.userlist = response.Data;
                $scope.hide($ionicLoading);
            })
         }     

          $scope.goBack_Dashboard = function(){
            $state.go('app.dashboard');
          }

                 $scope.Recharge = {};
                    $scope.New_Recharge = function(Id, Type, Amount){
                           Id=Id.UserId.Id;             
                        if(Id===undefined){  
                            alert("Select User");
                        }
                        else if(Type===undefined){
                            alert("Select Recharge Type");
                        }
                        else if(Amount===undefined){
                            alert("Enter Amount");
                        }
                        else{
                            
                            $scope.show($ionicLoading);
                            var RefNo = Math.floor(Math.random()*90000) + 10000;

                            $scope.add_tran =

                                {
                                    "Data":
                                    {
                                        "RelatedContactId":
                                        {
                                            "Id":Id
                                        },
                                            "Type":Type,
                                            "Amount":Amount,
                                            "ReferenceNo":RefNo,
                                    }
                                };
                                                     

                        $.ajax(
                        { 
                            type: 'POST',
                            url: 'http://localhost:51578/api/contact/savetransaction',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify($scope.add_tran),
                            beforeSend: function(xhr)
                            {
                                xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.setRequestHeader("Authorization", token);
                            },
                            success: function(data, status)
                            {
                                console.log(data); // Contains the suite
                                $scope.hide($ionicLoading);
                                alert("Recharge Done");
                                $state.go('app.recharge');
                            },
                            error: function(error)
                            {
                                console.log(error);
                            }
                        });
                    }
            }

});

