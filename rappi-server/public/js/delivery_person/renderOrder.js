function assignOrder (orderId) {
  $.ajax({
    url: `/api/order/${orderId}/assign/delivery-person/${deliveryPersonId}`,
    type: 'POST',
    success: function (result) {
      window.localStorage.setItem('orderAssingned', true)
      window.localStorage.setItem('orderAssingnedId', orderId)
      renderOrderAssigned(result)
    }
  })
}

function nextStep (orderId) {
  $.ajax({
    url: `/api/order/${orderId}/nextstep`,
    type: 'PUT',
    success: function (result) {
      window.localStorage.setItem('orderAssingned', true)
      window.localStorage.setItem('orderAssingnedId', orderId)
      renderOrderAssigned(result)
    }
  })
}

function renderOrderAssigned (order) {
  let orderHtml = `
  <div class="row">
    <div class="col-11">
      <h1>Orden Asignada</h1>
    </div>
    <div class="col-1">${order.generalInfo.ID}</div>
  </div>
  <div class="row">
    <div class="col">
      <i class="fas fa-map-marker-alt"></i> <span>Reconge en ${order.generalInfo.storeName}</span>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-1"></div>
    <div class="col-sm"><i class="fas fa-long-arrow-alt-right"></i> <span>${order.generalInfo.storeAddress}</span> </div>
  </div>
  <div class="row">
  <div class="col"><i class="fas fa-home"></i> <span> Entrega al cliente</span></div>
</div>
<div class="row">
  <div class="col-sm-1"></div>
  <div class="col-sm"><i class="fas fa-user"></i> <span>${order.generalInfo.clientFirstName} ${order.generalInfo.clientLastName}</span>
  </div>
</div>
<div class="row">
  <div class="col-sm-1"></div>
  <div class="col-sm"><i class="fas fa-long-arrow-alt-right"></i> <span>${order.generalInfo.clientAddress}</span>
  </div>
`
  let addressDatails = `<div class="row">
  <div class="col-sm-1"></div>
  <div class="col-sm"><i class="fas fa-angle-double-right"></i> <span>${order.generalInfo.clientAddressDetails}</span>
  </div>`
  let buttonOnDelivery = `</div>
  <div class="row">
  <div class="col">
    <button class="btn btn-primary btn-lg" onclick="nextStep(${order.generalInfo.ID})">Ya estoy en la tienda</button>
  </div>
</div>`
  let ButttonFinished = `</div>
  <div class="row">
  <div class="col">
    <button class="btn btn-primary btn-lg" onclick="nextStep(${order.generalInfo.ID})">Ya entrege al cliente</button>
  </div>
</div>`
  $('#order').html(orderHtml)
  if (order.generalInfo.addressDatails != '') {
    $('#order').append(addressDatails)
  }
  if (order.generalInfo.statusId == 2) {
    $('#order').append(buttonOnDelivery)
  }
  if (order.generalInfo.statusId == 3) {
    $('#order').append(ButttonFinished)
  }
  if (order.generalInfo.statusId == 4) {
    $('#order').fadeOut()
    $('#order').html('')
    alert('Has completado la orden con exito')
    window.localStorage.removeItem('orderAssingned')
    window.localStorage.removeItem('orderAssingnedId')
    navigator.geolocation.getCurrentPosition(getPosition, errorHandlerPosition)
  }

  $('#order').fadeIn()
}

function renderOrder (order, position) {
  let orderHtml = `
  <div class="row">
    <div class="col-sm-12">
      <h1 class="center">Nueva orden</h1>
    </div>
  </div>
  <hr>
  <div class="row  align-items-center">
    <div class="col"></div>
    <div class="col-5">Tienda:</div>
    <div class="col-6" id="store">${order.generalInfo.storeName}</div>
  </div>
  <div class="row">
    <div class="col"></div>
    <div class="col-5">Direcion:</div>
    <div class="col-6" id="address-store">${order.generalInfo.storeAddress}</div>
  </div>
  <hr>
  <div class="row">
    <div class="col"></div>
    <div class="col-5">Direcion de cliente:</div>
    <div class="col-6" id="">${order.generalInfo.clientAddress}</div>
  </div>
  <hr>
  <div class="row align-items-center" id="map">
    <div class="col center">
      <img
        src="http://maps.googleapis.com/maps/api/staticmap?center=${position.coords.latitude},${position.coords.longitude}&zoom=12&size=600x300&sensor=false&key=AIzaSyBsxH7FaWLwfr3g6TbFBtczdb2x-X3prkw&markers=color:blue%7Clabel:T%7C${position.coords.latitude},${position.coords.longitude}&markers=color:green%7Clabel:C%7C${order.generalInfo.clientLatitude},${order.generalInfo.clientLongitude}&markers=color:orange%7Clabel:S%7C${order.generalInfo.storeLatitude},${order.generalInfo.storeLongitude}" />
    </div>
  </div>
  <div class="row">
  <div class="col-11"></div>
  <div class="col-1"><button type="button" class="btn btn-primary btn-lg" onclick="assignOrder(${order.generalInfo.ID})">Aceptar</button></div>
</div>`
  $('#order').html(orderHtml)
  $('#order').fadeIn()
}
