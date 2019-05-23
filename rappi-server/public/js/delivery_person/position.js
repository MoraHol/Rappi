function getPosition(position) {
  if (JSON.parse(window.localStorage.getItem('orderAssingned')) === null){
    window.localStorage.setItem('orderAssingned', false)
  }
  if (JSON.parse(window.localStorage.getItem('orderAssingned')) === false) {
    $.ajax({
      url: `/api/order/unassigned/${position.coords.latitude}/${position.coords.longitude}`,
      type: 'get',

      success: (result) => {
        renderOrder(result, position)
      }
    })
  }
}

function errorHandlerPosition(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('No podras activarte se denegó el permiso para la Geolocalización.')
      break
    case error.POSITION_UNAVAILABLE:
      alert('La ubicación no está disponible.')
      break
    case error.TIMEOUT:
      alert('Se ha excedido el tiempo para obtener la ubicación.')
      break
    case error.UNKNOWN_ERROR:
      alert('Un error desconocido.')
      break
  }
  $('#toggle-one').bootstrapToggle('off')
}
$(function () {
  if (JSON.parse(window.localStorage.getItem('orderAssingned')) == true) {
    $('#toggle-one').bootstrapToggle('on')
  } else {
    $('#toggle-one').bootstrapToggle('off')
  }
})
$(function () {
  $('#toggle-one').change(function () {
    if ($(this).prop('checked')) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, errorHandlerPosition)
      }
    } else {
      if (JSON.parse(window.localStorage.getItem('orderAssingned')) == true) {
        alert('No puedes desactivarte hasta no terminar esta orden')
        $('#toggle-one').bootstrapToggle('on')
      } else {
        $('#order').fadeOut()
        $('#order').html('')
      }
    }
  })
})