var database = firebase.database();

angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$stateParams', '$location',
function ($scope, $stateParams, $location) {
  // When anybody is in the Home page it automatically signs them out
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }
}])

.controller('findPetsNearMeCtrl', ['$scope', '$stateParams', '$location',
function ($scope, $stateParams, $location) {
  var database = firebase.database();
  var markers = [];

  // Shows Jacksonville on the map
  var center = {lat: 30.34, lng: -81.51};
  var map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: center});
  var geocoder = new google.maps.Geocoder();

  // Retrieve all the pets in Firebase
  database.ref('pet').on('value', function(snapshot){
    $scope.$evalAsync(function(){
      $scope.pets = snapshot.val();
    });

    // Clear the map as part of a full refresh
    for(var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];

    for (var pet in snapshot.val()){
      var petData = snapshot.val()[pet];
      // Retrieve data for pet owner
      database.ref('petOwner/' + petData.owner).once("value").then(function(owner){
        // Get latitude and longitude for the pet owner's address
        geocoder.geocode({"address": owner.val().address + ' ' + owner.val().zipCode},
          function(results, status) {
            // Put pet marker on map
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              // Use the type of animal (cat or dog) to choose which icon is displayed
              icon: "https://s3.amazonaws.com/fphp/" + this.petData.petType + ".png"
            });

            // When you click on cat or dog icon, show pet profile
            marker.addListener('click', function(){
              $scope.$apply(function(){
                console.log(this.pet);
                $location.path('/page16').search({pet: this.pet});
              }.bind({pet: this.pet}));
            }.bind({pet: this.pet}));

            // Add marker to list to use when refreshing
            markers.push(marker);
          }.bind({petData: this.petData, pet: this.pet}));
      }.bind({petData: petData, pet: pet}));
    }
  });

}])

.controller('petOwnerSignupCtrl',
  ['$scope', '$stateParams', '$location',
    function ($scope, $stateParams, $location) {
      $scope.signUp = function(data){
        console.log("signUp");

        // Create user in Firebase
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function(user){
          // Store pet owner data
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

.controller('loginCtrl', ['$scope', '$stateParams', '$location',
function ($scope, $stateParams, $location) {
  $scope.login = function(crendentials){
    console.log("login");
    // Sign in user in Firebase
    firebase.auth().signInWithEmailAndPassword(crendentials.email, crendentials.password).then(function(user){
      // Try to find the current user as a pet owner
      database.ref("petOwner/" + user.uid).once("value").then(function(owner){
        // If the current user is not a pet owner then it is a seeker
        if (owner.val() == null) {
          $scope.$apply(function() {
            // Go to Find Pets Near Me
            $location.path('/page4');
          });
        } else {
          $scope.$apply(function() {
            $location.path('/page19');
          });
        }
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

.controller('petOwnerSignup2Ctrl', ['$scope', '$stateParams', '$location',
function ($scope, $stateParams, $location) {

  var type = 'cat';
  // Change button color to blue and tan
  document.getElementById('dog-button').className = 'button button-loyal  button-block';
  document.getElementById('cat-button').className = 'button button-positive  button-block';

  $scope.signUp = function(data){
    console.log("signUp");
    //
    var pet = database.ref("pet").push();
    pet.set({
      petType: type,
      petName: data.petName,
//      petAge: data.petAge,
      petBreed: data.petBreed,
      availability: data.availability,
      owner: firebase.auth().currentUser.uid,
//      petSize: data.size,
      photo: $scope.photo
    });
    $location.path('/page18');
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

  document.getElementById("photo-upload").addEventListener('change', function(e){
    var file = e.target.files[0];
    console.log(file);
    var img = firebase.storage().ref().child(firebase.auth().currentUser.uid + "/" + file.name);
    document.getElementById("addPhoto").style.display = 'none';
    img.put(file).then(function(snapshot) {
      $scope.photo = this.file.name;
      document.getElementById("photo").src = URL.createObjectURL(this.file);
    }.bind({file: file}));
  }, false);
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
    // Create user in Firebase
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function(user){
      // Get seeker data from Firebase
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

.controller('myProfileCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])

.controller('petProfileCtrl', ['$scope', '$stateParams', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location) {
  console.log("petProfile");
  console.log($location.search().pet);
  database.ref('pet/' + $location.search().pet).once("value").then(function(pet){
    $scope.name = pet.val().petName;
//    $scope.age = pet.val().petAge;
    $scope.breed = pet.val().petBreed;
    $scope.availability = pet.val().availability;
//    $scope.size = pet.val().petSize;
    $scope.type = pet.val().petType;
    $scope.petOwner = pet.val().owner;
    firebase.storage().ref($scope.petOwner + "/" + pet.val().photo).getDownloadURL().then(function(url) {
      $scope.photo = url;
    });
  })

  $scope.requestVisit = function() {
    // Find who requested your pet and which pet (if you have more than one pet in Firebase)
    var request = database.ref("request/" + $scope.petOwner).push();
    request.set({
      seeker: firebase.auth().currentUser.uid,
      pet: $location.search().pet
    });
    $location.path('/page17');
  }
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

.controller('petRequestsCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {
  database.ref('request/' + firebase.auth().currentUser.uid).on("value", function(snapshot){
    $scope.$evalAsync(function(){
      $scope.requests = snapshot.val();
      for (request in $scope.requests) {
        database.ref('pet/' + $scope.requests[request].pet).once("value").then(function(pet){
          $scope.requests[this.request].petName = pet.val().petName;
        }.bind({request: request}));

        // Make the seeker id readable
        database.ref('petSeeker/' + $scope.requests[request].seeker).once("value").then(function(seeker){
          $scope.requests[this.request].seekerName = seeker.val().name;
          $scope.requests[this.request].seekerEmail = seeker.val().email;
        }.bind({request: request}));
      }
    });
  });

}])
