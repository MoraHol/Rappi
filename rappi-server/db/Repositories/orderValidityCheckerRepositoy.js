'use strict'
const storeRepository = require('./storeRepository')
const orderRepository = require('./orderRepository')

class response {
  constructor (status, message) {
    this.sucess = status,
    this.message = message
  }
}

async function storeIsOpenChecker (storeID) {
  let store = await storeRepository.findStoreById(storeID)
  if (!store.isOpened()) {
    let status = false
    let message = 'Lo sentimos la tienda se encuentra cerrada'
    throw new response(status, message)
  } else {
    return store
  }
}

async function productsAvailabilityChecker (store, productsInBasket) {
  let products = await store.getProducts()
  for (let index = 0; index < productsInBasket.length; index++) {
    let productInBasket = productsInBasket[index]
    let productInInventory = products.find(product => product.products_in_stores_id === productInBasket.id_product)
    if (!await productInInventory.canSupply(productInBasket.quantity)) {
      let status = false
      let message = 'Lo sentimos no hay la cantidad solicitada de ' + productInInventory.name
      throw new response(status, message)
    }
  }
}

async function noActiveOrdersChecker (user) {
  if (await orderRepository.UserActiveOrders(user.id)) {
    let status = false
    let message = 'Ya tienes una orden creada'
    throw new response(status, message)
  }
}

module.exports = {
  isValidOrder: async (user, cart) => {
    try {
      let store = await storeIsOpenChecker(cart.id)

      await productsAvailabilityChecker(store, cart.basket)

      if (user) {
        await noActiveOrdersChecker(user)
      } else {
        let status = false
        let message = 'Por favor inicia sesion para comprar'
        throw new response(status, message)
      }
    } catch (error) {
      throw error
    }
  }
}
