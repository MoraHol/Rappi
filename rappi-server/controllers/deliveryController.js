const db = require('../db')

 
exports.checkIfValidPerson = async (req, res) => {
  if (req.session.user) {
    if (req.session.user.is_valid_for_work === false) 
    {
      res.render('pages/rt-landing', { user: req.session.user })
    }
    else
    {
      res.render('pages/login-rt', { message: 'Usted no esta habilitado para trabajar, por favor acerquese a una de nuestras oficinas a validar sus datos' })
    }
    
  } else {
    res.render('pages/login-rt', { message: 'Por favor inicie sesión' })
  }
}

exports.getUnassignedOrders = async (req, res) => {
  var lat =  4.7007205
  var long = -74.0358761
  var OrdersForAssign = await db.orderRepository.getOrdersForAssign()
  var initialDistance = Infinity
  var OrderForAssign
  for (let i = 0; i < OrdersForAssign.length; i++) {
    var order = OrdersForAssign[i]
    var store = await order.store()
    var distance = await db.addressRepository.getDistanceFromLatLonInKm(lat,long,store.latitude,store.longitude)
    if (distance < initialDistance) {
      OrderForAssign = order
      initialDistance = distance
    }
  }
  console.log("OrderForAssign")
  console.log(OrderForAssign)
  res.json(OrderForAssign)
}