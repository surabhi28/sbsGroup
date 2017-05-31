'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
var app=angular
  .module('webapp', ['ngRoute','ngCookies']);
  app.config(['$routeProvider', function($routeProvider){
                $routeProvider
                
                .when('/index',{templateurl:'/',controller :'loginCtrl'})
                .when('/dashboard',{templateUrl:'dashboard.html',controller :'dashboardCtrl',authenticated: true})
                .when('/buttons',{templateUrl:'views/buttons.html'})
                .when('/charts',{templateUrl:'views/charts.html'})
                .when('/add-service',{templateUrl:'views/add-service.html'})
                  .when('/update-service',{templateUrl:'views/update-service.html' ,controller:'updateCtrl'})
                .when('/gallery-with-filters',{templateUrl:'views/gallery-with-filters.html' })
                .when('/image-gallery',{templateUrl:'views/image-gallery.html'})
                .when('/notifications',{templateurl:'views/notifications.html'})
                .when('/table',{templateUrl:'views/table.html'})
                .when('/typography',{templateUrl:'views/typography.html'})
                .when('/show-service',{templateUrl:'views/show-service.html',controller:'serviceCtrl'})
                .when('/add-testimonial',{templateUrl:'views/add-testimonial.html'})
                .when('/show-testimonial',{templateUrl:'views/show-testimonial.html'})
                .when('/show-portfolio',{templateUrl:'views/show-portfolio.html'})
                .when('/add-portfolio',{templateUrl:'views/add-portfolio.html', controller:'MyCtrl'})
                
                .otherwise({redirectTo:'/'});
            }]);
   




  app.controller('MyCtrl',['Upload','$window',function(Upload,$window){
    alert("hi");
 /*   var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    }
    
    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };*/
}]);







app.controller('serviceCtrl',function($scope,$http){
   // var parameter = JSON.stringify({ $scope.service_id: _id})

    $http.get('/show-service').success(function(response){
         $scope.name=response;


        $scope.remove = function(_id) {     
        alert('Are you sure you want to delete?' + _id);
        $http({
            url: 'http://localhost:3000/manage-service',
            method: 'POST',
            data:{service_id:_id} 

        }).success(function(res) {
            alert('another success');
        }, function(error) {
            console.log(error);
            alert('here');
        });

    }
       

    })


   

})





// app.controller('updateCtrl',function($scope,$http){
  
// // var getParameterByName=function(name, url) {
// //     if (!url) url = window.location.href;
// //     name = name.replace(/[\[\]]/g, "\\$&");
// //     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
// //         results = regex.exec(url);
// //     if (!results) return null;
// //     if (!results[2]) return '';
// //     return decodeURIComponent(results[2].replace(/\+/g, " "));
// // }
// // var a=function;(){
// //   var v = getParameterByName('val')
// //   document.getElementById("mytext").value = v;

// // }
   
// //   $http.get("http://localhost:3000/show-service"+getParameterByName('val')).then
// //   (
// //     function(res){
// //       $scope.data = res.data;
// //     },
// //     function (res) {
// //       $scope.name = "error"+res.status+" ";
// //     }
// //     );

// })




// app.controller('loginCtrl' ,['$scope','$authFact','$location','$cookieStore' , function($scope,$authFact,$location,$cookieStore){
    
//     $scope.name='login please';

//     $scope.adlogin=function(){
//        ad.login(function(response){
//         if(response.authResponse){
//            console.log('welcome! fetching your info');
//         ad.api('/me',function(response){
//             console.log("good to see you"+ response.name +'.');
//             console.log(response);
//             $cookieStore.put('userObj',response);
//             var accessToken =ad.getAuthResponse().accessToken;
//             console.log(accessToken);
//             authFact.setAccessToken(accessToken);

//             $location.path('/dashboard');
//             $scope.$apply();

//         });
//     }
//     else{
//         console.log('user cancelled login  or die');
//     }
//             });

//     };





// }]);


// app.controller('dashboardCtrl',['$scope','$cookieStore' ,function($scope,$cookieStore){
     
//      var userObj =$cookieStore.get('userObj');
//      console.log(userObj);


// }]);