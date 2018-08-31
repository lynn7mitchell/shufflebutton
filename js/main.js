 // This example requires the Places library. Include the libraries=places
 // parameter when you first load the API. For example:
 // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

 window.onload = init;


 var placesApiResults = document.getElementById('placesApiResults')



 var options = {
   enableHighAccuracy: true,
   timeout: 5000,
   maximumAge: 0,
   radius: 8000,
   price: 2,
   website: 0
 };

 function init() {
   console.log('window.onload');
   document.getElementById("shuffleButton").addEventListener("click", getLocation);

   //  radius
   document.getElementById("fiveMiles").addEventListener("click", setRadius);
   document.getElementById("tenMiles").addEventListener("click", setRadius);
   document.getElementById("fifteenMiles").addEventListener("click", setRadius);

   // price
   document.getElementById("oneDollarSign").addEventListener("click", setPrice);
   document.getElementById("twoDollarSign").addEventListener("click", setPrice);
   document.getElementById("threeDollarSign").addEventListener("click", setPrice);
   document.getElementById("fourDollarSign").addEventListener("click", setPrice);
 }

 function setRadius(e) {
   console.log(e);
   options.radius = e.srcElement.attributes[0].value;
   console.log(e.srcElement.attributes[0].value)
 }

 function setPrice(e) {
   console.log(e);
   options.price = e.srcElement.attributes[0].value;
   console.log(e.srcElement.attributes[0].value)
 }

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
     radius: options.radius,
     type: ['restaurant'],
     website: options.website,
     minprice: options.price
   }, placesApiCallback);
   console.log(options.website)
 }

 function error(err) {
   console.warn(`ERROR(${err.code}): ${err.message}`);
 }

 function getLocation() {
   console.log('button clicked');
   navigator.geolocation.getCurrentPosition(success, error, options);

   var element = document.getElementById("hide-me");
   element.classList.add("hide");
 }



 function placesApiCallback(results, status) {
   if (status === google.maps.places.PlacesServiceStatus.OK) {
     for (var i = 0; i < results.length; i++) {
       //  console.log(results[i]);
     }
     var buttonChoice = results[Math.floor(Math.random() * results.length)];
     console.log(buttonChoice);
     var photoURL = buttonChoice.photos[0].getUrl({
       'maxWidth': 100,
       'maxHeight': 100
     });
     console.log(photoURL);
     var myObject = JSON.stringify(buttonChoice);
     document.getElementById("demo").innerHTML = myObject;

     detailCall()
     
    //  logoFinder()


     

    
     //  document.getElementById('result')


   }

   //  function detailCall(){
   //   buttonChoice.place_id;
   //  }

   function detailCall() {
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function () {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
         if (xmlhttp.status == 200) {
           var responseJSON = JSON.parse(xmlhttp.responseText);
           console.log(xmlhttp.responseText)
           detailWebsite(responseJSON);
         } else if (xmlhttp.status == 400) {
           console.log('There was an error 400');
         } else {
           console.log('something else other than 200 was returned');
         }
       }
     };

     xmlhttp.open("GET", "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + buttonChoice.place_id + "&fields=name,price_level,website,formatted_phone_number&key=AIzaSyApROm5N-ZR1NUw6TavOxm76FTWMVkYq3k", true);
     xmlhttp.send();
     

     
   }

   function detailWebsite(responseText){
     //console.log(responseText.result.website)
     var requestText = responseText.result.website;
     
     var hostname = extractHostname(requestText);
    var imageURL = buildImageUrl(hostname);
    updateImageSource(imageURL);
   }
  

   function buildImageUrl(hostname){
    return "https://logo.clearbit.com/" + hostname
   }

   function updateImageSource(imageURL){
     document.getElementById('img').src = imageURL;
   }




   function extractHostname(url) {
    console.log(url)
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
  
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
  
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    console.log(hostname)
    return hostname;
  
  }
  
  


  

 }



