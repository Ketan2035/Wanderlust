mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [85.2774, 25.7935], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});
