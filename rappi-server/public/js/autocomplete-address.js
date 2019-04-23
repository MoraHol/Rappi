let autocomplete, marker

document.body.onload = () => {
  initMap()
  // create bounds of bogota
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(4.854327, -74.167517),
    new google.maps.LatLng(4.454136, -74.000425))
  // create options for autocomplete places API
  console.log(defaultBounds)
  let options = {
    types: ['address'],
    bounds: defaultBounds,
    componentRestrictions: { country: ['co'] }
  }
  // Create the autocomplete object, restricting the search
  // to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), options)
  autocomplete.setFields(['address_component', 'geometry'])
  autocomplete.addListener('place_changed', () => {
    marker.setVisible(false)
    var place = autocomplete.getPlace()
    if (!place.geometry) {
      console.log('error')
    }
    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      map.setZoom(17) // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location)
    marker.setVisible(true)
    document.getElementById('lat').value = marker.getPosition().lat()
      document.getElementById('lng').value = marker.getPosition().lng()
    marker.addListener('dragend', ()=>{
      document.getElementById('lat').value = marker.getPosition().lat()
      document.getElementById('lng').value = marker.getPosition().lng()
    })
  })
}
function initMap () {
  map = new google.maps.Map(document.getElementById('map'),
    {
      center: { lat: 4.667434, lng: -74.102309 },
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    })
  marker = new google.maps.Marker({
    map: map,
    icon: '/img/kisspng-computer-icons-location-clip-art-pushpin-5ac1f0d4af7529.1738840915226595407187.png',
    draggable: true
  })
}
