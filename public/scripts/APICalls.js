'use strict';

$(document).ready(function ($) {

    let lat='';
    let long='';

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function getData() {
    //astronomy picture of the day request
    $.ajax({
      url: 'https://api.nasa.gov/planetary/apod?api_key=PgRhox3uHogMFEF8zpp5zkWiWWEGP0qlMU90vRrH',
      success: function(result){
        if("copyright" in result) {
          $("#copyright").text("Image Credits: " + result.copyright);
        } else {
          $("#copyright").text("Image Credits: " + "Public Domain");
        } if(result.media_type == "video") {
          $("#apod_img_id").css("display", "none");
          $("#apod_vid_id").attr("src", result.url);
        } else {
          $("#apod_vid_id").css("display", "none");
          $("#apod_img_id").attr("src", result.url);
        }
        $("#reqObject").text('https://api.nasa.gov/planetary/apod?api_key=PgRhox3uHogMFEF8zpp5zkWiWWEGP0qlMU90vRrH');
        $("#returnObject").text(JSON.stringify(result, null, 4));
        $("#apod_explaination").text(result.explanation);
        $("#apod_title").text(result.title);
      }
    })
    //wheretheiss API ISS coordinates request
    $.ajax({
      url: 'https://api.wheretheiss.at/v1/satellites/25544',
      success: function(result) {
        lat = result.latitude;
        long = result.longitude;
        sleep(2000);
      }
    })
    //request mapbox/leaflet APIs, add interactive map window and apply coords from previous request
    .then(function(){
      //leaflet/mapbox API map
      var mymap = L.map('mapid').setView([lat, long], 2);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 1,
        maxZoom: 14,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoicm9kLXMiLCJhIjoiY2p6YmNqYzl2MDViMzNjcGFhMWI3Y254eiJ9.iRyd5tlYddW2kGVLH9tJWg'
      }).addTo(mymap);
      var marker = L.marker([lat, long]).addTo(mymap);
      marker.bindPopup(`<b>ISS is directly above this spot!</b><br>Coordinates: ${lat}, ${long}.`).openPopup();
      });
    }

  getData();

});
