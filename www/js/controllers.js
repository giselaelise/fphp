var database = firebase.database();

angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$stateParams', '$location',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location) {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }

}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('findPetsNearMeCtrl', ['$scope', '$stateParams', '$location',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location) {
  var database = firebase.database();
  var markers = [];

  var center = {lat: 30.34, lng: -81.51};
  var map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: center});
  var geocoder = new google.maps.Geocoder();

  database.ref('pet').on('value', function(snapshot){
    console.log(snapshot.val());
    $scope.$evalAsync(function(){
      $scope.pets = snapshot.val();
    });

    for(var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];

    for (var pet in snapshot.val()){
      var petData = snapshot.val()[pet];
      console.log (petData.petType);
      database.ref('petOwner/' + petData.owner).once("value").then(function(owner){
        console.log(owner.val().address);
        geocoder.geocode({"address": owner.val().address + ' ' + owner.val().zipCode},
          function(results, status) {
            console.log(results[0].geometry.location)
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              icon: "https://s3.amazonaws.com/fphp/" + this.petData.petType + ".png"
            });
            console.log(petData.petType);
            markers.push(marker);
          }.bind({petData: this.petData}));
      }.bind({petData: petData}));
    }
  });

  $scope.goToPetProfile = function(){
    $location.path('/page16');
  }

}])

.controller('petOwnerSignupCtrl',
  ['$scope', '$stateParams', '$location',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $location) {
      $scope.signUp = function(data){
        console.log("signUp");
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function(user){
          database.ref("petOwner/" + user.uid).set({
            email: data.email,
            name: data.name,
            address: data.address,
            zipCode: data.zipCode
          })

          $scope.$apply(function(){
            $location.path('/page8');
          });
        }, function(error){
          alert(error);
        })
      }
    }
  ]
)

.controller('loginCtrl', ['$scope', '$stateParams', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location) {
   $scope.login = function(crendentials){
     console.log("login");
     firebase.auth().signInWithEmailAndPassword(crendentials.email, crendentials.password).then(function(user){
       $scope.$apply(function(){
         $location.path('/page4');
       });
     }, function(error){
       alert(error);
     });
   };


}])

.controller('page7Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('petOwnerSignup2Ctrl', ['$scope', '$stateParams', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location) {

  var type = 'cat';
  document.getElementById('dog-button').className = 'button button-loyal  button-block';
  document.getElementById('cat-button').className = 'button button-positive  button-block';

  $scope.signUp = function(data){
    console.log("signUp");
    var pet = database.ref("pet").push();
    pet.set({
      petType: type,
      petName: data.petName,
      petAge: data.petAge,
      petBreed: data.petBreed,
      availability: data.availability,
      owner: firebase.auth().currentUser.uid
    });
    $location.path('/page9');
  }

  $scope.cat = function() {
    type = 'cat';
    document.getElementById('dog-button').className = 'button button-loyal  button-block';
    document.getElementById('cat-button').className = 'button button-positive  button-block';
  }
  $scope.dog = function () {
    type = 'dog';
    document.getElementById('dog-button').className = 'button button-positive  button-block';
    document.getElementById('cat-button').className = 'button button-loyal  button-block';
  }
}])

.controller('registrationCompleteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('petSeekerSignupCtrl', ['$scope', '$stateParams', "$location", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location) {
  $scope.signUp = function(data){
    console.log("signUp");
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function(user){
      database.ref("petSeeker/" + user.uid).set({
        email: data.email,
        name: data.name,
        address: data.address,
        zipCode: data.zipCode
      });
      $scope.$apply(function(){
        $location.path('/page4');
      });
    }, function(error){
      alert(error);
    })
  }

}])

.controller('myProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('petProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('reminderCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('thankYouCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('reminder2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('petRequestsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
