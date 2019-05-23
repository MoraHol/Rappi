setInterval(verifyOrders, 10000)
let flagAddButton = false
function verifyOrders () {
  $.ajax({
    url: `/api/order/active/user/${userId}`,
    type: 'GET',
    success: function (result) {
      if (result.flag && !flagAddButton) {
        flagAddButton = true
        $('#nav-rappi').append('<a href="/myorder" class="btn btn-outline-danger">Ver mi orden</a>')
      }
    }
  })
}
