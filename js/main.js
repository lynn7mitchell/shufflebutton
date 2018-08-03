 // This example requires the Places library. Include the libraries=places
 // parameter when you first load the API. For example:
 // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

 window.onload = function () {
   document.getElementById("shuffleButton").addEventListener("click", getLocation());

   var placesApiResults = document.getElementById('placesApiResults')




   var options = {
     enableHighAccuracy: true,
     timeout: 5000,
     maximumAge: 0
   };

   function success(pos) {
     var crd = pos.coords;
     var service = new google.maps.places.PlacesService(placesApiResults);
     rightHere = {
       latitude: crd.latitude,
       longitude: crd.longitude,
     }
     //  console.log(`Latitude : ${crd.latitude}`);
     //  console.log(`Longitude: ${crd.longitude}`);
     console.log(crd.latitude, crd.longitude);

     service.nearbySearch({
       location: new google.maps.LatLng(crd.latitude, crd.longitude),
       radius: 500,
       type: ['restaurant']
     }, placesApiCallback);
   }

   function error(err) {
     console.warn(`ERROR(${err.code}): ${err.message}`);
   }

   function getLocation() {
     navigator.geolocation.getCurrentPosition(success, error, options);
   }



   function placesApiCallback(results, status) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       for (var i = 0; i < results.length; i++) {
         console.log(results[i]);
       }
     }
   }

   // end window.onload
 }

 // var map;
 // var infowindow;

 // function initMap() {
 //   var pyrmont = {lat: -33.867, lng: 151.195};

 //   map = new google.maps.Map(document.getElementById('map'), {
 //     center: pyrmont,
 //     zoom: 15
 //   });

 //   infowindow = new google.maps.InfoWindow();

 // function createMarker(place) {
 //   var placeLoc = place.geometry.location;
 //   var marker = new google.maps.Marker({
 //     map: map,
 //     position: place.geometry.location
 //   });

 //   google.maps.event.addListener(marker, 'click', function() {
 //     infowindow.setContent(place.name);
 //     infowindow.open(map, this);
 //   });
 // }