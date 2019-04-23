'use strict'

const client = require('./client')
const deliveryPerson = require('./delivery_person')
const admin = require('./admin')
const stores = require('./stores')
module.exports = {
  client,
  deliveryPerson,
  admin,
  stores
}
