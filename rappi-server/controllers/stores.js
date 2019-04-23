'use strict'
const db = require('../db')

function isOpen (store, today) {
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

exports.opened = () => {
    db.stores.getAll().then(stores => {
    var today = new Date()
    console.log(today)
    var opened = stores.filter(stores => isOpen(stores, today))
    console.log(opened)
  })
}
