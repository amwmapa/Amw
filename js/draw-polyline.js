$(document).ready(function(){
var poly;
var map;


function initialize() {
    var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(15,0),
    draggableCursor: 'pointer',
    draggingCursor: 'pointer',
    panControl: true
};
map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
var polyOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
};
poly = new google.maps.Polyline(polyOptions);
google.maps.event.addListener(map, 'click', addLatLng);
}
function addLatLng(event) {
    poly.setMap(map);
    var path = poly.getPath();
    path.push(event.latLng);
    var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
    });
    var markerLat = (event.latLng.lat()).toFixed(6);
    var markerLng = (event.latLng.lng()).toFixed(6);
    $("#coordlist").append("Position (" + markerLat + ", " + markerLng + "), <br/>");
        var length = google.maps.geometry.spherical.computeLength(poly.getPath());
        var kmlength = (length * .001).toFixed(2);
        var milength = (length * 0.000621371).toFixed(2);
        if (kmlength > 0) {
            $("#lengthkm").html(kmlength);
            $("#lengthmi").html(milength);
        }
}
function deleteMarkers() {
        poly.setMap(null);
      }
google.maps.event.addDomListener(window, 'load', initialize);
});