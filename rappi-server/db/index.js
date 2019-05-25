'use strict'

const clientRepository = require('./Repositories/clientRepository')
const deliveryPersonRepository = require('./Repositories/deliveryPersonRepository')
const adminRepository = require('./Repositories/adminRepository')
const storeRepository = require('./Repositories/storeRepository')
const orderRepository = require('./Repositories/orderRepository')
const addressRepository = require('./Repositories/addressRepository')
const orderValidityChecker = require('./Repositories/orderValidityCheckerRepositoy')
const orderBuilder = require('./Repositories/orderBuilderRepository')
module.exports = {
  clientRepository,
  deliveryPersonRepository,
  adminRepository,
  storeRepository,
  orderRepository,
  addressRepository,
  orderValidityChecker,
  orderBuilder
}
