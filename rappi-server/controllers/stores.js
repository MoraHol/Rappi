'use strict'
const db = require('../db')

function getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

function deg2rad (deg) {
  return deg * (Math.PI / 180)
}

exports.isOpen = (store, today) => {
  var dayNumber = today.getDay() + 1
  var workingDay = store.working_hours.find(workingHour => workingHour.day_id === dayNumber)
  if (workingDay == null) {
    return false
  }
  var openFrom = new Date(workingDay.time_open)
  var closedAt = new Date(workingDay.time_closed)
  var todayNormalization = new Date(2000, 0, 1, today.getHours(), today.getMinutes())
  if (todayNormalization < openFrom || todayNormalization > closedAt) {
    return false
  }
  return true
}

exports.getOpenByDistance = async (req, res) => {
  var stores = await db.stores.getAll()
  const today = new Date()
  var opened = stores.filter(stores => exports.isOpen(stores, today))
  for (let i = 0; i < opened.length; i++) {
    var store = opened[i]
    store.distance = getDistanceFromLatLonInKm(store.latitude, store.longitude, req.session.user.latitude, req.session.user.longitude)
    opened[i] = store
  }
  opened.sort((a, b) => {
    if (a.distance > b.distance) {
      return 1
    }
    if (a.distance < b.distance) {
      return -1
    }
    return 0
  })
  res.json(opened)
}

exports.updateProductQuantities = (productsToBuy) => {
  productsToBuy.forEach(async product => {
    await db.stores.updateQuantityOfProduct(product)
  })
}
