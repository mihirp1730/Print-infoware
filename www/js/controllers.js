angular.module('starter.controllers', ['ionic', 'ngCordova', 'uiGmapgoogle-maps'])

.controller('AppCtrl', function($scope, $ionicLoading, $location, $cordovaToast, $ionicPlatform, GetArticleServices, $ionicPopup, $rootScope, $http, $state) {

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
            //$ionicHistory.goBack();
            //navigator.app.goBack();
        }
    }, 100);

    $scope.show = function() {

        $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
        });
    };


    $scope.hide = function() {
        $ionicLoading.hide();
    };

    $scope.GetEmail = function() {
        $scope.email = localStorage.getItem("Email");

        //Get page url
        var path = $location.path();
        //var baseLen = $location.absUrl().length - $location.url().length;
        function getPath(fullUrl) {
            return fullUrl.substring(path);
        }
        var url = $location.absUrl().split('?')[0]
        console.log(url);
        // Replace page with another page name.
        var oldstr = url;
        var newstr = oldstr.toString().replace("forgot", "reset");
        localStorage.setItem("CallBackUrl", newstr);
        console.log(newstr);

    }

    $scope.GotoReset = function(email) {

        if (email == undefined) {

            $cordovaToast.show('Enter Email', 'short', 'center');
        } else {

            $scope.show($ionicLoading);
            localStorage.setItem("Email", email);
            //var email = localStorage.getItem("Email");
            var newstr = localStorage.getItem("CallBackUrl");


            $scope.sendData = {
                "Data": {
                    "Email": email,
                    "CallBackUrl": newstr,
                }
            }
        }

        $.ajax({
            type: 'POST',
            url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/account/forgotpassword',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.sendData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
                // xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status) {
                console.log(data); // Contains the suite
                $cordovaToast.show('Mail Sent', 'short', 'center');
                //alert("Mail Sent");
                $scope.hide($ionicLoading);


            },
            error: function(error) {
                console.log(error);
            }
        });
    }



    $scope.back_forgot = function() {
        $state.go('forgot_password');
    }

    $scope.logout = function() {
        $state.go('login');
    }


    $scope.ResetPassword = function(password) {

        var path = $location.path();
        //var baseLen = $location.absUrl().length - $location.url().length;
        function getPath(fullUrl) {
            return fullUrl.substring(path);
        }
        var url = $location.absUrl()
        var code = $location.search()['code'];
        console.log(code);

        if (password == undefined) {

            $cordovaToast.show('Enter Password', 'short', 'center');
        } else {

            $scope.show($ionicLoading);

            var email = localStorage.getItem("Email");
            console.log(email);

            $scope.ResetData = {
                "Data": {
                    "Email": email,
                    "Password": password,
                    "Code": code,
                }
            }



            $.ajax({
                type: 'POST',
                url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/account/resetPassword',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify($scope.ResetData),
                //           ,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");

                },
                success: function(data, status) {

                    console.log(data.Message);
                    if (data.Message == 'Unregistered email') {

                        $cordovaToast.show('Your Email Address Is Not Registered', 'short', 'center');

                        $scope.hide($ionicLoading);

                        $state.go('forgot_password');

                    } else {

                        //$cordovaToast.show('Password Updated', 'short', 'center');
                        $scope.hide($ionicLoading);
                        $state.go('login');
                    }

                },
                error: function(error) {
                    console.log(error);
                }
            });

        }

    }
})

.controller('PrintjobCtrl', function($scope, $ionicLoading, $cordovaToast, $location, $filter, $ionicPlatform, GetArticleServices, $ionicPopup, $rootScope, $http, $state) {
    $scope.show = function() {

        $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
        });
    };


    $scope.hide = function() {
        $ionicLoading.hide();
    };

    $scope.back_Cdash = function() {
        $state.go('app.client_dashboard');
    }

    var token = localStorage.getItem("token");
    var UserId = localStorage.getItem("UserId");

    $scope.GetArticle_Category = function() {

        $scope.show($ionicLoading);

        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/category/getcategory",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        }).success(function(response) {
            $scope.hide($ionicLoading);
            console.log(response);
            $scope.category = response.Data;
        })


    }

    // $scope.selectPicture1 = function() {


    //     var options = {
    //         quality: 50,
    //         destinationType: Camera.DestinationType.FILE_URI,
    //         sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    //         encodingType: Camera.EncodingType.PNG
    //     };


    //     $cordovaCamera.getPicture(options).then(
    //         function(imageURI) {

    //             window.FilePath.resolveNativePath(imageURI, function(result) {
    //                 // onSuccess code
    //                 imageURI = 'file://' + result;
    //                 console.log(imageURI);

    //                 $scope.picData0 = imageURI;
    //                 $scope.picData2 = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    //                 document.getElementById("demo1").innerHTML = $scope.picData2;
    //                 var sFileExtension = $scope.picData2.split('.')[$scope.picData2.split('.').length - 1];
    //                 localStorage.setItem("img_name", $scope.picData2);
    //                 localStorage.setItem("img_ext", '.' + sFileExtension);
    //                 $scope.ftLoad = true;
    //                 var fileURL = $scope.picData0;
    //                 var options = new FileUploadOptions();
    //                 options.fileKey = "file";
    //                 options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    //                 options.mimeType = "image/jpeg";
    //                 options.chunkedMode = true;

    //                 var success = function(r) {
    //                     localStorage.setItem("img_size", r.bytesSent);
    //                     console.log("Successful upload...");
    //                     console.log("Code = " + r.responseCode);
    //                     // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
    //                 }

    //                 var fail = function(error) {
    //                     console.log("error");
    //                 }


    //                 var params = {};
    //                 params.value1 = "test";
    //                 params.value2 = "param";

    //                 options.params = params;

    //                 var ft = new FileTransfer();
    //                 // SERVER must be a URL that can handle the request, like
    //                 // http://some.server.com/upload.php

    //                 ft.upload(fileURL, encodeURI("http://cssent.com/demo/bk/upload.php"), success, fail, options);

    //             }, function(error) {
    //                 console.log("error");
    //             })

    //         })
    // }
    // $scope.img_select = function() {
    //     var control = document.getElementById("external-files");
    //     console.log(control);

    //     control.addEventListener("change", function(event) {
    //         // When the control has changed, there are new files
    //         var files = control.files;
    //         for (var i = 0; i < files.length; i++) {

    //             var sFileName = files[i].name;
    //             var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1];
    //             var dotPosition = sFileExtension.lastIndexOf(".");
    //             var fileExt = sFileExtension.substring(dotPosition, sFileExtension.length);
    //             localStorage.setItem("img_name", files[i].name);
    //             localStorage.setItem("img_type", files[i].type);
    //             localStorage.setItem("img_size", files[i].size);
    //             localStorage.setItem("img_ext", '.' + fileExt);

    //         }
    //     }, false);
    // }


    $scope.JobRequest = function() {
        $scope.show($ionicLoading);

        var RequestDate = $filter('date')(new Date(), 'yyyy-MM-dd');
        // var img_ext = localStorage.getItem("img_ext");
        // var img_ext = localStorage.getItem("img_ext");
        // if (img_ext == '.png') {
        //     var img_type = 'image/png'
        // } else {
        //     var img_type = 'image/jpeg'
        // }
        $scope.Job = {
            "Data": {
                "RequestDate": RequestDate,
                "ArticleId": {
                    "Id": localStorage.getItem("ArtId")
                },
                "FileId": {
                    "Id": localStorage.getItem("Imgid")
                },
                "RequestedBy": {
                    "Id": localStorage.getItem("userId")
                },
                "NumberOfCopies": localStorage.getItem("Pages"),
                "Status": "Pending",
                "TotalAmount": localStorage.getItem("Amount")
            }
        }
        console.log($scope.Job);

        $.ajax({
            type: 'POST',
            url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/printjob/saveprintjob',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.Job),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status) {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                $cordovaToast.show('Complete Submitted Successfully', 'short', 'center');
                // $scope.name = "";
                // $scope.Description = "";
            },
            error: function(error) {
                console.log(error);
            }
        });

    }

    $scope.Job = {}
    $scope.c_id = function(Name) {         //console.log($scope.Job);
                
        var Id = $scope.Job.Data.Id;
        localStorage.setItem("Id", Id);        
        localStorage.setItem("cname", Name);        
        $scope.show($ionicLoading);        
        $http({            
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/article/getarticlebycategoryid?categoryId=" + Id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                   'Authorization': token
            }          
        }).success(function(response) {          
            $scope.hide($ionicLoading);          
            $scope.articlename = response.Data;
            console.log(response.Data);
        })
    }

    $scope.a_id = function(Name) {         //console.log($scope.Job);
        var c_id = localStorage.getItem("Id");
        var a_id = $scope.Job.Article.Id;        
        $scope.show($ionicLoading);        
        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/article/getarticlebyid?articleId=" + a_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }          
        }).success(function(response) {

            $scope.ArticleId = response.Data.Id;
            $scope.Description = response.Data.Description;
            $scope.Pages = response.Data.NumberOfPages;
            $scope.Amount = response.Data.Amount;
            $scope.Imgid = response.Data.FileId.Id;
            $scope.Imgnm = response.Data.FileId.Name;
            $scope.hide($ionicLoading);
            localStorage.setItem("Artname", Name);
            localStorage.setItem("ArtId", response.Data.Id);
            localStorage.setItem("Imgid", response.Data.FileId.Id);
            localStorage.setItem("Pages", response.Data.NumberOfPages);
            localStorage.setItem("Amount", response.Data.Amount);
        })
    }

    // $scope.cate_id = function(Name) {

    //     localStorage.setItem("catename", Name);

    // }

    // $scope.art_id = function(Name) {

    //     localStorage.setItem("Articlename", Name);

    // }
})

.controller('LoginCtrl', function($scope, $ionicLoading, $location, $cordovaToast, $ionicPlatform, $ionicPopup, $rootScope, $http, $state) {

    $scope.show = function() {

        $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
        });
    };


    $scope.hide = function() {
        $ionicLoading.hide();
    };

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

        if ($scope.LoginData.Email == undefined) {
            //alert("Enter Email");
            $cordovaToast.show('Enter Email', 'short', 'center');
        } else if ($scope.LoginData.Password == undefined) {
            //alert("Enter Password");
            $cordovaToast.show('Enter Password', 'short', 'center');
        } else {

            $scope.show($ionicLoading);

            $.ajax({
                type: 'POST',
                url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/account/token',
                contentType: "application/Body-x-www-form-urlencoded",
                dataType: "json",
                data: {
                    'grant_type': 'password',
                    'username': $scope.LoginData.Email,
                    'password': $scope.LoginData.Password,
                    'gcmString': localStorage.getItem("gcm")
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    // xhr.setRequestHeader("Authorization", token);
                },
                success: function(data, status) {
                    console.log(data);
                    localStorage.setItem("token", 'bearer ' + data.access_token); // Contains the suite
                    localStorage.setItem("userId", data.userId);
                    localStorage.setItem("userName", data.userName);
                    localStorage.setItem("name", data.name);
                    localStorage.setItem("balance", data.balance);
                    localStorage.setItem("userRole", data.userRole);

                    if (data.userRole == 'Admin') {

                        $state.go('app.dashboard');
                        $scope.hide($ionicLoading);
                        $rootScope.isShowNav = true;
                        $rootScope.isShowNav1 = true;
                        $rootScope.isShowNav2 = true;
                        $rootScope.isShowNav3 = true;
                        $rootScope.isShowNav4 = true;
                        $rootScope.isShowNav5 = true;
                        $rootScope.isShowNav6 = true;
                        $rootScope.isShowNav7 = true;
                        $rootScope.isShowNav8 = true;
                        $rootScope.isShowNav9 = false;
                        $rootScope.isShowNav10 = true;

                        $rootScope.isShowNavU1 = false;
                        $rootScope.isShowNavU2 = false;
                        $rootScope.isShowNav11 = true;
                        $rootScope.isShowNavU4 = true;
                    } else if (data.userRole == 'MasterAdmin') {

                        $state.go('app.dashboard');
                        $scope.hide($ionicLoading);
                        $rootScope.isShowNav = true;
                        $rootScope.isShowNav1 = true;
                        $rootScope.isShowNav2 = true;
                        $rootScope.isShowNav3 = true;
                        $rootScope.isShowNav4 = true;
                        $rootScope.isShowNav5 = true;
                        $rootScope.isShowNav6 = true;
                        $rootScope.isShowNav7 = true;
                        $rootScope.isShowNav8 = true;
                        $rootScope.isShowNav9 = false;
                        $rootScope.isShowNav10 = true;
                        $rootScope.isShowNav11 = true;

                        $rootScope.isShowNavU1 = false;
                        $rootScope.isShowNavU2 = false;
                        $rootScope.isShowNavU4 = true;
                    } else {

                        $state.go('app.client_dashboard');
                        $scope.hide($ionicLoading);
                        $rootScope.isShowNav = false;
                        $rootScope.isShowNav1 = false;
                        $rootScope.isShowNav2 = false;
                        $rootScope.isShowNav3 = false;
                        $rootScope.isShowNav4 = false;
                        $rootScope.isShowNav5 = false;
                        $rootScope.isShowNav6 = false;
                        $rootScope.isShowNav7 = false;
                        $rootScope.isShowNav8 = true;
                        $rootScope.isShowNav9 = true;
                        $rootScope.isShowNav10 = true;
                        $rootScope.isShowNav11 = false;

                        $rootScope.isShowNavU1 = true;
                        $rootScope.isShowNavU2 = true;
                        $rootScope.isShowNavU4 = true;

                    }

                },
                error: function(error) {

                    $cordovaToast.show(error.responseJSON.error_description, 'short', 'center');
                    $scope.hide($ionicLoading);
                }
            });

        }
    }
})

.controller('DashCtrl', function($scope, $ionicLoading, $location, $ionicPlatform, $cordovaToast, GetArticleServices, $filter, $ionicPopup, $rootScope, $http, $state) {

    $scope.show = function() {

        $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
        });
    };

    $scope.hide = function() {
        $ionicLoading.hide();
    };
    var token = localStorage.getItem("token");

    $http({
        method: "GET",
        url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/printjob/getprintjob",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        }
    }).success(function(response) {
        console.log(response);
        $scope.printId = function(Id) {
            localStorage.setItem("printId", Id);
            $scope.show($ionicLoading);
        }
        $scope.JobRequest = response.Data;
        //$scope.Jobre = $filter('filter')($scope.JobRequest, {'Status':'Confirm'}, true);
        //console.log(response.Data.Id);
        //localStorage.setItem("PrintJobId", Id);
    })
    $http({
        method: "GET",
        url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/printjob/getjobstatus",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        }
    }).success(function(response) {
        console.log(response);
        $scope.hide($ionicLoading);
        $scope.status = response.Data;
        //$scope.statusId = $scope.status[0];
    })

    $scope.selectIdPrintJob = new Array($scope.JobRequest);

    //$scope.PrintJobId = localStorage.getItem("printId");
    //console.log(printId);
    // $scope.statusId = localStorage.getItem("Statusname");
    $scope.Update_Status = function(Id, index) {

            console.log(Id);
            console.log(index);
            $scope.show($ionicLoading);

            $scope.RequestStatus = {
                "Data": {
                    "Id": Id,
                    "Status": index
                }
            }

            $.ajax({
                type: 'POST',
                url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/printjob/updateprintjobstatusbyid',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify($scope.RequestStatus),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Authorization", token);
                },

                // if (response.Message == 'No Records') {
                //     $scope.error = true;
                //     $scope.hide($ionicLoading);
                //     $scope.records = false;
                // } else {
                //     $scope.CompleteJob = response.Data;
                //     $scope.hide($ionicLoading);
                //     $scope.error = false;
                //     $scope.records = true;
                //}


                success: function(data, status) {
                    console.log(data); // Contains the suite
                    $scope.hide($ionicLoading);
                    $cordovaToast.show('Status Updated Successfully', 'short', 'center');
                    $state.go('app.dashboard');
                    $ionicHistory.goBack();
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
        //}
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



    $scope.GetAllProfile = function() {
        var Id = localStorage.getItem("userId");
        var balance = localStorage.getItem("balance");
        $scope.show($ionicLoading);
        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/contact/getcontactinfobyuserid?userId=" + Id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        }).success(function(response) {
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
            $scope.PinCode = response.Data.AddressId.PinCode;
            $scope.hide($ionicLoading);
        })
    }

    $scope.user_detail = function() {
        $state.go('app.profile_edit');
    }



    $scope.edit_user = function(UserId, UserName, FirstName, LastName, BirthDate, Email, Phone, Mobile, Street1, Street2, City, State, Country, PinCode) {
        $scope.show($ionicLoading);

        $scope.edit_data =

            {
                "Data": {
                    "Id": localStorage.getItem("userId"),
                    // "Username":UserName,
                    //"Password":Password,
                    "ContactId": {
                        "Id": localStorage.getItem("ContactId"),
                        "FirstName": FirstName,
                        "LastName": LastName,
                        "BirthDate": BirthDate,
                        "Email": Email,
                        "Phone": Phone,
                        "Mobile": Mobile
                    },
                    //   "UserRole":{
                    //     "Name":UserRole
                    //   },
                    "AddressId": {
                        "Id": localStorage.getItem("AddressId"),
                        "Street1": Street1,
                        "Street2": Street2,
                        "City": City,
                        "State": State,
                        "Country": Country,
                        "PinCode": PinCode

                    }

                }
            }


        console.log($scope.edit_data);

        $.ajax({
            type: 'POST',
            url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/account/manageinfo',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.edit_data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status) {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                $cordovaToast.show('Edit Successfully', 'short', 'center');
                $state.go('app.profile_edit');
                // $ionicHistory.goBack();
            },
            error: function(error) {
                console.log(error);
            }
        });


    }


})


.controller('AdminCtrl', function($scope, $filter, $ionicLoading, $http, $state, $ionicPopup) {


    $scope.show = function() {

        $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
        });
    };


    $scope.hide = function() {
        $ionicLoading.hide();
    };

    var token = localStorage.getItem("token");


    $scope.GetServices = function() {
        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/category/getcategory",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        }).success(function(response) {
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

.factory('GetProfile', function($http) {

    var token = localStorage.getItem("token");

    return {

        GetAllProfile: function() {

            return $http({
                method: "GET",
                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/contact/getcontact",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                }
            }).success(function(response) {
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



    $scope.GetAllProfile = function() {
        var Id = localStorage.getItem("userId");
        $scope.show($ionicLoading);
        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/contact/getcontactinfobyuserid?userId=" + Id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        }).success(function(response) {
            console.log(response);
            $scope.hide($ionicLoading);
            $scope.profile = response.Data;
            console.log(response.Data)
        })
    }





    //var token = localStorage.getItem("token");
    $scope.show = function() {
        $ionicLoading.show({
            template: '<p>Please wait...</p><ion-spinner></ion-spinner>'
        });
    };

    $scope.hide = function() {
        $ionicLoading.hide();
    };


    $scope.back_dashboard = function() {
        $state.go('app.dashboard');
    }
    $scope.show($ionicLoading);



    $scope.GetUser = function() {

        var Id = localStorage.getItem("userId");

        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/contact/getcontactinfobyuserid?userId=" + Id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        }).success(function(response) {
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
            $scope.PinCode = response.Data.AddressId.PinCode;
            $scope.hide($ionicLoading);
        })
    }
    $scope.user_detail = function() {
        $state.go('app.profile_edit');
    }

    $scope.back_profile = function() {
        $state.go("app.dashboard");
    }


    $scope.edit_user = function(UserId, UserName, FirstName, LastName, BirthDate, Email, Phone, Mobile, Street1, Street2, City, State, Country, PinCode) {
        $scope.show($ionicLoading);

        $scope.edit_data =

            {
                "Data": {
                    "Id": localStorage.getItem("userId"),
                    // "Username":UserName,
                    //"Password":Password,
                    "ContactId": {
                        "Id": localStorage.getItem("ContactId"),
                        "FirstName": FirstName,
                        "LastName": LastName,
                        "BirthDate": BirthDate,
                        "Email": Email,
                        "Phone": Phone,
                        "Mobile": Mobile
                    },
                    //   "UserRole":{
                    //     "Name":UserRole
                    //   },
                    "AddressId": {
                        "Id": localStorage.getItem("AddressId"),
                        "Street1": Street1,
                        "Street2": Street2,
                        "City": City,
                        "State": State,
                        "Country": Country,
                        "PinCode": PinCode

                    }

                }
            }


        console.log($scope.edit_data);

        $.ajax({
            type: 'POST',
            url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/account/manageinfo',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.edit_data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status) {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                //$ionicHistory.goBack();
            },
            error: function(error) {
                console.log(error);
            }
        });


    }
})


.factory('GetCategoryServices', function($http) {

    var token = localStorage.getItem("token");

    return {

        GetAllCategory: function() {

            return $http({
                method: "GET",
                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/category/getcategory",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                }
            }).success(function(response) {
                console.log(response);
                category = response.Data;
                return category;

            });

        }
    }
})

.controller('CategoryCtrl', function($scope, $ionicPopup, $ionicLoading, GetCategoryServices, $state, $http) {
    var token = localStorage.getItem("token");


    $scope.show = function() {

        $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
        });
    };


    $scope.hide = function() {
        $ionicLoading.hide();
    };

    $scope.GetAllCategory = function() {
        $scope.show($ionicLoading);
        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/category/getcategory",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        }).success(function(response) {
            console.log(response);
            $scope.hide($ionicLoading);
            $scope.category = response.Data;
        })
    }

    $scope.delete_category = function(Id) {

        $scope.delete_data = {
            "Data": {
                "Id": Id
            }
        };
        var confirmPopup = $ionicPopup.confirm({

            template: 'Are you sure you want to delete plan?'
        });

        confirmPopup.then(function(res) {
            if (res) {

                $scope.show($ionicLoading);
                $.ajax({
                    type: 'POST',
                    url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/category/removecategory',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify($scope.delete_data),
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader("Authorization", token);
                    },
                    success: function(data, status) {


                        $http({
                                method: "GET",
                                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/category/getcategory",
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Authorization': token
                                }
                            }).success(function(response) {
                                $scope.hide($ionicLoading);
                                $cordovaToast.show('Category Deleted', 'short', 'center');
                                //alert('Category Deleted');
                                $scope.category = response.Data;

                            })
                            // Contains the suite
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });

            } else {
                console.log('You are not sure');
            }
        });
    }

    $scope.edit_category = function(Id) {

        $scope.show($ionicLoading);
        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/category/getcategorybyid?categoryId=" + Id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        }).success(function(response) {

            $scope.edit_category = response.Data;
            localStorage.setItem("Id", response.Data.Id);
            localStorage.setItem("Name", response.Data.Name);
            $scope.hide($ionicLoading);
            $state.go("app.category_edit");

        })

    }
    $scope.Id = localStorage.getItem("Id");
    $scope.Name = localStorage.getItem("Name");

    $scope.add_new_category = function() {
        $state.go("app.add_category");
    }



    $scope.back_list_category = function() {
        $state.go("app.category_list");
    }

    $scope.Edit_cat = function(Id, Name) {
        $scope.show($ionicLoading);

        $scope.edit_cate =

            {
                "Data": {
                    "Id": localStorage.getItem("Id"),
                    "Name": Name,
                }
            }


        console.log($scope.edit_cate);

        $.ajax({
            type: 'POST',
            url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/category/savecategory',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.edit_cate),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status) {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                //$ionicHistory.goBack();
            },
            error: function(error) {
                console.log(error);
            }
        });


    }

    $scope.Category = {};
    $scope.new_category = function() {
        if ($scope.Category.Data.Name === undefined) {
            $cordovaToast.show('Enter Category Name', 'short', 'center');
            //alert("Enter Name");
        } else {

            $scope.show($ionicLoading);

            $.ajax({
                type: 'POST',
                url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/category/savecategory',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify($scope.Category),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Authorization", token);
                },
                success: function(data, status) {
                    console.log(data); // Contains the suite
                    $scope.hide($ionicLoading);
                    $cordovaToast.show('Category Added', 'short', 'center');
                    //alert("Category Added");
                    $state.go('app.category_list');
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }
})

.factory('GetArticleServices', function($http) {

    var token = localStorage.getItem("token");

    return {

        GetAllArticle: function() {

            return $http({
                method: "GET",
                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/article/getarticle",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                }
            }).success(function(response) {
                console.log(response);
                article = response.Data;
                return article;

            });

        }
    }
})

// .directive('fileModel', ['$parse', function($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var model, modelSetter;

//             attrs.$observe('fileModel', function(fileModel) {
//                 model = $parse(attrs.fileModel);
//                 modelSetter = model.assign;
//             });

//             element.bind('change', function() {
//                 scope.$apply(function() {
//                     modelSetter(scope.$parent, element[0].files[0]);
//                 });
//             });
//         }
//     };
// }])

// .service('fileUpload', ['$http', function($http) {
//     this.uploadFileToUrl = function(file, uploadUrl) {
//         var fd = new FormData();
//         fd.append('file', file);
//         $http.post(uploadUrl, fd, {
//                 transformRequest: angular.identity,
//                 headers: { 'Content-Type': undefined }
//             })
//             .success(function() {})
//             .error(function() {});
//     }
// }])

// .controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload) {
//     $scope.fileInputs = [1, 2, 3];
//     $scope.uploadFile = function(filename) {
//         var file = $scope[filename];
//         console.log('file is ' + JSON.stringify(file));
//         console.dir(file);
//         var uploadUrl = "http://aksharinfoware.aksharsoftwaresolutions.com/api/article/savefile";
//         fileUpload.uploadFileToUrl(file, uploadUrl);
//     };

// }])

.factory('GetArticleCategory', function($http) {

        var token = localStorage.getItem("token");

        return {

            GetAllArticleCategory: function() {

                return $http({
                    method: "GET",
                    url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/category/getcategory",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token
                    }
                }).success(function(response) {
                    console.log(response);
                    category = response.Data;
                    return category;

                });

            }
        }
    })
    .controller('ArticleCategoryCtrl', function($scope, $ionicPopup, GetArticleCategory, $ionicLoading, $cordovaCamera, $cordovaFileTransfer, $state, $http) {
        var token = localStorage.getItem("token");

        $scope.show = function() {
            $ionicLoading.show({
                template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 400,
                showDelay: 0
            });
        };
        $scope.hide = function() {
            $ionicLoading.hide();
        };

        var userRole = localStorage.getItem("userRole");
        
        $scope.jobreq = function(Id) {
            //console.log(Id);
            if (userRole == 'User') {
                $state.go('app.printjob');
                $scope.show($ionicLoading);
            }   else {
                    $state.go('app.category_article');
                }
        }

        $scope.GetAllArticleCategory = function() {
            $scope.show($ionicLoading);

            $http({
                method: "GET",
                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/category/getcategory",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                }
            }).success(function(response) {
                $scope.hide($ionicLoading);
                console.log(response);
                $scope.cat_article = response.Data;
            })
        }

        $scope.artcat = {}
        $scope.c_id = function(Name) {         //console.log($scope.Job);
                    
            var Id = $scope.artcat.Data.Id;
            console.log($scope.artcat.Data.Id);
            localStorage.setItem("Id", Id);        
            localStorage.setItem("cname", Name);        
            $scope.show($ionicLoading);        
            $http({            
                method: "GET",
                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/article/getarticlebycategoryid?categoryId=" + Id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                       'Authorization': token
                }          
            }).success(function(response) {          
                $scope.hide($ionicLoading);          
                $scope.articlename = response.Data;
                console.log(response.Data);
            })
        }
    })
    .controller('ArticleCtrl', function($scope, $ionicPopup, GetCategoryServices, $cordovaToast, $ionicLoading, $cordovaCamera, $cordovaFileTransfer, $state, $http) {
        var token = localStorage.getItem("token");

        $scope.show = function() {
            $ionicLoading.show({
                template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 400,
                showDelay: 0
            });
        };
        $scope.hide = function() {
            $ionicLoading.hide();
        };

        $scope.GetAllArticle = function() {
            // $scope.show($ionicLoading);

            $http({
                method: "GET",
                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/article/getarticle",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                }
            }).success(function(response) {
                // $scope.hide($ionicLoading);
                $scope.article = response.Data;
            })

        }

        $scope.GetCategoryServices = function() {
            $scope.show($ionicLoading);
            //        alert("hello");

            $http({
                method: "GET",
                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/category/getcategory",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                }
            }).success(function(response) {
                console.log(response);
                $scope.hide($ionicLoading);
                $scope.category = response.Data;
            })

        }

        $scope.delete_article = function(Id) {

            $scope.delete_data = {
                "Data": {
                    "Id": Id
                }
            };
            var confirmPopup = $ionicPopup.confirm({

                template: 'Are you sure you want to delete Article?'
            });

            confirmPopup.then(function(res) {
                if (res) {

                    $scope.show($ionicLoading);
                    $.ajax({
                        type: 'POST',
                        url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/article/removearticle',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify($scope.delete_data),
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.setRequestHeader("Authorization", token);
                        },
                        success: function(data, status) {


                            $http({
                                    method: "GET",
                                    url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/article/getarticle",
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'Authorization': token
                                    }
                                }).success(function(response) {
                                    $scope.hide($ionicLoading);
                                    $cordovaToast.show('Article Deleted', 'short', 'center');
                                    //alert('Article Deleted');
                                    $scope.article = response.Data;

                                })
                                // Contains the suite
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });

                } else {
                    console.log('You are not sure');
                }
            });
        }

        $scope.edit_article = function(Id) {

            $scope.show($ionicLoading);
            $http({
                method: "GET",
                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/article/getarticlebyid?articleId=" + Id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                }
            }).success(function(response) {
                console.log(response);
                $scope.edit_article = response.Data;

                localStorage.setItem("ArticleId", response.Data.Id);
                localStorage.setItem("ArticleName", response.Data.Name);
                localStorage.setItem("Description", response.Data.Description);
                localStorage.setItem("category_Id", response.Data.CategoryId.Id);
                localStorage.setItem("category_name", response.Data.CategoryId.Name);
                localStorage.setItem("edit_Amount", response.Data.Amount);
                localStorage.setItem("nop", response.Data.NumberOfPages);
                $scope.hide($ionicLoading);
                $state.go("app.article_edit");

            })
        }
        $scope.Id = localStorage.getItem("ArticleId");
        $scope.Name = localStorage.getItem("ArticleName");
        $scope.Description = localStorage.getItem("Description");
        $scope.CategoryId = localStorage.getItem("category_Id");
        $scope.Amount = localStorage.getItem("edit_Amount");
        $scope.NumberOfPages = localStorage.getItem("nop");

        $scope.Edit_art = function(Id, Name, Description, Amount, NumberOfPages) {
            $scope.show($ionicLoading);

            $scope.edit_artic =

                {
                    "Data": {
                        "Id": localStorage.getItem("ArticleId"),
                        "Name": Name,
                        "Description": Description,
                        "CategoryId": {
                            "Id": localStorage.getItem("category_Id")
                        },
                        // "FileId": {
                        //     "Name": localStorage.getItem("img_name"),
                        //     "MimeType": img_type,
                        //     "Extension": localStorage.getItem("img_ext"),
                        //     "Size": localStorage.getItem("img_size"),
                        //     //"RelativePath":"/files/mca-sem1-unit1"    
                        // },
                        "Amount": Amount,
                        "NumberOfPages": NumberOfPages,
                    }
                }


            console.log($scope.edit_artic);

            $.ajax({
                type: 'POST',
                url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/article/savearticle',
                //url: 'http://localhost:51578/api/article/savearticle',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify($scope.edit_artic),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Authorization", token);
                },
                success: function(data, status) {
                    console.log(data); // Contains the suite
                    $scope.hide($ionicLoading);
                    $cordovaToast.show('Article Edited', 'short', 'center');
                    $state.go(app.article_list);
                    //$ionicHistory.goBack();
                },
                error: function(error) {
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

                        $scope.picData = imageURI;
                        $scope.picData1 = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                        document.getElementById("demo").innerHTML = $scope.picData1;
                        var sFileExtension = $scope.picData1.split('.')[$scope.picData1.split('.').length - 1];
                        localStorage.setItem("img_name", $scope.picData1);
                        localStorage.setItem("img_ext", '.' + sFileExtension);
                        $scope.ftLoad = true;
                        var fileURL = $scope.picData;
                        var options = new FileUploadOptions();
                        options.fileKey = "file";
                        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                        options.mimeType = "image/jpeg";
                        options.chunkedMode = true;

                        var success = function(r) {
                            localStorage.setItem("img_size", r.bytesSent);
                            console.log("Successful upload...");
                            console.log("Code = " + r.responseCode);
                            // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
                        }

                        var fail = function(error) {
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

                    }, function(error) {
                        console.log("error");
                    })

                })
        }
        $scope.img_select = function() {
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
                    localStorage.setItem("img_ext", '.' + fileExt);

                }
            }, false);
        }
        $scope.Article = {};
        $scope.new_Article = function(Name, Description, Id, Amount, Page) {

            if (Name === undefined) {
                $cordovaToast.show('Enter Name', 'short', 'center');
                //alert("Enter Name");
            } else if (Description === undefined) {
                $cordovaToast.show('Enter Description', 'short', 'center');
                //alert("Enter Description");
            } else if ($scope.Article.Data.CategoryId.Id === undefined) {
                $cordovaToast.show('Select Category', 'short', 'center');
                //alert("Select Category");
            }
            //  else if($scope.Article.Data.FileName===undefined){
            //     alert("Enter File Name");
            // }
            else if (Amount === undefined) {
                $cordovaToast.show('Enter Amount', 'short', 'center');
                //alert("Enter Amount");
            } else if (Page === undefined) {
                $cordovaToast.show('Enter Number of Pages', 'short', 'center');
                //alert("Enter Number of Pages");
            } else {

                $scope.show($ionicLoading);

                //var ComplainDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                var img_ext = localStorage.getItem("img_ext");
                if (img_ext == '.png') {
                    var img_type = 'image/png'
                } else {
                    var img_type = 'image/jpeg'
                }
                //console.log("categoryid="+Id);
                $scope.Article = {
                    "Data": {
                        "Name": Name,
                        "Description": Description,
                        "CategoryId": {
                            "Id": Id
                        },
                        "FileId": {
                            "Name": localStorage.getItem("img_name"),
                            "MimeType": img_type,
                            "Extension": localStorage.getItem("img_ext"),
                            "Size": localStorage.getItem("img_size"),
                            //"RelativePath":"/files/mca-sem1-unit1"    
                        },
                        "Amount": Amount,
                        "NumberOfPages": Page
                    }
                }
                $.ajax({
                    type: 'POST',
                    url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/article/savearticle',
                    //url: 'http://localhost:51578/api/article/savearticle',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify($scope.Article),
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader("Authorization", token);
                    },
                    success: function(data, status) {
                        console.log(data); // Contains the suite
                        $scope.hide($ionicLoading);
                        $cordovaToast.show('Article Added', 'short', 'center');
                        //alert("Article Added");
                        $state.go('app.article_list');
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
            }
        }
        $scope.add_new_article = function() {
            $state.go("app.add_article");
        }

        $scope.back_article_list = function() {
            $state.go("app.article_list");
        }
    })

.controller('ProfileListCtrl', function($scope, $ionicLoading, $ionicPopup, $http, $state) {

    $scope.show = function() {

        $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
        });
    };


    $scope.hide = function() {
        $ionicLoading.hide();
    };

    $scope.add_new_customer = function() {
        $state.go('add_customer');
    }

    $scope.add_new_user = function() {
        $state.go('app.createuser');
    }

    var token = localStorage.getItem("token");
    $scope.GetUsers = function() {
        var Id = localStorage.getItem("userId");
        $scope.show($ionicLoading);


        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/contact/getcontactbyrole",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        }).success(function(response) {
            console.log(response);
            $scope.userlist = response.Data;
            $scope.hide($ionicLoading);
        })
    }

    $scope.user_detail = function(Id) {
        $state.go('app.profile_edit');
    }

    $scope.showConfirm = function(Id) {



        $scope.user = {
            "Data": {
                "UserId": {
                    "Id": Id

                }
            }
        };
        var confirmPopup = $ionicPopup.confirm({

            template: 'Are you sure you want to delete profile?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                console.log($scope.user);
                $scope.show($ionicLoading);
                $.ajax({
                    type: 'POST',
                    url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/contact/removecontact',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify($scope.user),
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader("Authorization", token);
                    },
                    success: function(data, status) {

                        $http({
                                method: "GET",
                                url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/contact/getcontactbyrole",
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Authorization': token
                                }
                            }).success(function(response) {

                                $scope.hide($ionicLoading);
                                $cordovaToast.show('Profile Deleted', 'short', 'center');
                                //alert("Profile Deleted");
                                $scope.userlist = response.Data;
                            })
                            // Contains the suite
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });

            } else {
                console.log('You are not sure');
            }
        });
    }


})


.controller('RegisterCtrl', function($scope, $http, $cordovaToast, $state, $ionicLoading, $filter, $ionicPopup) {


    $scope.logout = function() {
        $state.go('login');
    }

    $scope.user = {};
    $scope.add_new_customer = function() {
        $state.go('add_customer');
    }

    $scope.add_new_user = function() {
        $state.go('add_users');
    }

    $scope.user = {};
    $scope.new_customer = function() {

        if ($scope.user.Data.Username == undefined) {
            $cordovaToast.show('Enter User Name', 'short', 'center');
            //alert("Enter User Name");
        } else if ($scope.user.Data.Password == undefined) {
            $cordovaToast.show('Enter Password', 'short', 'center');
            //alert("Enter Password");

        } else if ($scope.user.Data.ContactId.FirstName == undefined) {
            $cordovaToast.show('Enter First Name', 'short', 'center');
            //alert("Enter First Name");

        } else if ($scope.user.Data.ContactId.LastName == undefined) {
            $cordovaToast.show('Enter Last Name', 'short', 'center');
            //alert("Enter Last Name");

        } else if ($scope.user.Data.ContactId.BirthDate == undefined) {
            $cordovaToast.show('Set Birthdate', 'short', 'center');
            //alert("Enter Birth Date");

        } else if ($scope.user.Data.ContactId.Email == undefined) {
            $cordovaToast.show('Enter Email', 'short', 'center');
            //alert("Enter Email");

        } else if ($scope.user.Data.ContactId.Phone == undefined) {
            $cordovaToast.show('Enter Phone Number', 'short', 'center');
            //alert("Enter Phone");

        } else if ($scope.user.Data.ContactId.Mobile == undefined) {
            $cordovaToast.show('Enter Mobile Number', 'short', 'center');
            //alert("Enter Mobile Number");

        } else if ($scope.user.Data.ContactId.Mobile.length < 10 || $scope.user.Data.ContactId.Mobile.length > 10) {
            $cordovaToast.show('Must have 10 digits', 'short', 'center');
            //alert("Mobile number must contain 10 digits only");

        } else if ($scope.user.Data.AddressId.Street1 == undefined) {
            $cordovaToast.show('Enter Street1', 'short', 'center');
            //alert("Enter Address Street1");

        } else if ($scope.user.Data.AddressId.Street2 == undefined) {
            $cordovaToast.show('Enter Street2', 'short', 'center');
            //alert("Enter Address Street2");

        } else if ($scope.user.Data.AddressId.City == undefined) {
            $cordovaToast.show('Enter City', 'short', 'center');
            //alert("Enter City");

        } else if ($scope.user.Data.AddressId.State == undefined) {
            $cordovaToast.show('Enter State', 'short', 'center');
            //alert("Enter State");

        } else if ($scope.user.Data.AddressId.Country == undefined) {
            $cordovaToast.show('Enter Country', 'short', 'center');
            //alert("Enter Country");

        } else if ($scope.user.Data.AddressId.PinCode == undefined) {
            $cordovaToast.show('Enter Pincode', 'short', 'center');
            //alert("Pincode must contain only 6 digits");

        } else if ($scope.user.Data.AddressId.PinCode.length < 6 || $scope.user.Data.AddressId.PinCode.length > 6) {
            $cordovaToast.show('Must have 6 digits', 'short', 'center');
            //alert("Enter Zipcode");

        } else if ($scope.user.Data.UserRole.Name == undefined) {
            $cordovaToast.show('Enter Role', 'short', 'center');
            //alert("Enter User Role");

        } else {

            //$scope.show($ionicLoading); 
            //   $scope.user.Data.UserPlanMapId.StartDate = $filter('date')($scope.user.Data.UserPlanMapId.StartDate, 'MM-dd-yyyy');  
            //   $scope.user.Data.UserPlanMapId.EndDate = $filter('date')($scope.user.Data.UserPlanMapId.EndDate, 'MM-dd-yyyy'); 
            $scope.user.Data.ContactId.BirthDate = $filter('date')($scope.user.Data.ContactId.BirthDate, 'MM-dd-yyyy');







            //$scope.user.Data.UserRole.Name = "User";


            $.ajax({
                type: 'POST',
                url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/account/register',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify($scope.user),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    // xhr.setRequestHeader("Authorization", token);
                },
                success: function(data, status) {
                    // console.log(data); // Contains the suite
                    $scope.hide($ionicLoading);
                    $cordovaToast.show('Account Created Successfully', 'short', 'center');
                    $state.go('app.dashboard');
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }
})


.controller('RechargeCtrl', function($scope, $filter, $cordovaToast, GetProfile, $ionicLoading, $http, $state) {

    $scope.show = function() {

        $ionicLoading.show({
            template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 400,
            showDelay: 0
        });
    };

    $scope.hide = function() {
        $ionicLoading.hide();
    };
    $scope.Back_Dash = function() {
        $state.go('app.dashboard');
    }

    var token = localStorage.getItem("token");

    $scope.GetAllUsers = function() {
        //var Id = localStorage.getItem("userId");
        $scope.show($ionicLoading);
        $http({
            method: "GET",
            url: "http://aksharinfoware.aksharsoftwaresolutions.com/api/contact/getcontactlist",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        }).success(function(response) {
            console.log(response);
            $scope.userlist = response.Data;
            $scope.hide($ionicLoading);
        })
    }

    

    $scope.Recharge = {};
    $scope.New_Recharge = function(Id, Type, Amount) {
        Id = Id.UserId.Id;
        if (Id === undefined) {
            $cordovaToast.show('Select User', 'short', 'center');
            //alert("Select User");
        } else if (Type === undefined) {
            $cordovaToast.show('Select Recharge Type', 'short', 'center');
            //alert("Select Recharge Type");
        } else
        if (Amount === undefined) {
            $cordovaToast.show('Enter Amount', 'short', 'center');
            //alert("Enter Amount");
        } else {

            $scope.show($ionicLoading);
            var RefNo = Math.floor(Math.random() * 90000) + 10000;

            $scope.add_tran =

                {
                    "Data": {
                        "RelatedContactId": {
                            "Id": Id
                        },
                        "Type": Type,
                        "Amount": Amount,
                        "ReferenceNo": RefNo,
                    }
                };


            $.ajax({
                type: 'POST',
                url: 'http://aksharinfoware.aksharsoftwaresolutions.com/api/contact/savetransaction',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify($scope.add_tran),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Authorization", token);
                },
                success: function(data, status) {
                    console.log(data); // Contains the suite
                    //alert("Recharge Done");
                    $cordovaToast.show('Recharge Done Successfully', 'short', 'center');
                    $state.go('app.recharge');
                    $scope.hide($ionicLoading);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }

})

.controller('ContactCtrl', function($scope, $ionicSideMenuDelegate, $cordovaGeolocation) {
    $ionicSideMenuDelegate.canDragContent(false)
    $scope.map = { center: { latitude: 40.1451, longitude: -99.6680 }, zoom: 8 };
    $scope.options = { scrollwheel: false, mapTypeId: "roadmap" };
    $scope.markericon = "img/akshar_trans.png";
    $scope.markers = []
        // get position of user and then set the center of the map to that position
    $cordovaGeolocation
        .getCurrentPosition()
        .then(function(position) {
            var lat = position.coords.latitude
            var long = position.coords.longitude
            $scope.map = { center: { latitude: lat, longitude: long }, zoom: 16 };
            //just want to create this loop to make more markers
            for (var i = 0; i < 3; i++) {
                $scope.markers.push({
                    id: $scope.markers.length,
                    latitude: lat + (i * 0.002),
                    longitude: long + (i * 0.002),
                    icon: $scope.markericon,
                    content: "I am located at " + lat + " ," + long
                });
            }
            $scope.onMarkerClick = function(marker, eventName, model) {
                model.show = !model.show;
            }

        }, function(err) {
            // error
        });
});