'use strict'

const clientRepository = require('./Repositories/clientRepository')
const deliveryPersonRepository = require('./Repositories/deliveryPersonRepository')
const adminRepository = require('./Repositories/adminRepository')
const storeRepository = require('./Repositories/storeRepository')
const orderRepository = require('./Repositories/orderRepository')
const addressRepository = require('./Repositories/addressRepository')
module.exports = {
  clientRepository,
  deliveryPersonRepository,
  adminRepository,
  storeRepository,
  orderRepository,
  addressRepository
}
