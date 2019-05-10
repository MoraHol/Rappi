'use strict'

const knex = require('../knex')
const clientRepository = require('../Repositories/clientRepository')
const storeRepository = require('../Repositories/storeRepository')

 class ProductInOrder {
   constructor(product, quantity){
     this.product = product
     this.quantity = quantity
   }
 }

async function getOrderProducts (orderID){
  var products_in_order = await knex('products_in_orders')
                            .select()
                            .where('order_id', orderID)
  let productsToBuy = []
  products_in_order.forEach(
    async function (product) {
    var finalProduct = await knex('products_in_stores')
        .join('products', 'products_in_stores.product_id', 'products.id')
        .where('products_in_stores.id', product.products_in_stores_id)
        .select(
          {
            ID: 'products_in_stores.product_id',
            products_in_stores_id: 'products_in_stores.id',
            name: 'products.name',
            photo: 'products.photo',
            price: 'products.price',
          }
        )
    productsToBuy.push(new ProductInOrder(finalProduct,product.quantiy))
    })
  return productsToBuy
}

async function getStoreForOrder (orderID){
  var products_in_stores = await knex('products_in_orders')
      .where('order_id', orderID)
      .select({ID: 'products_in_stores_id'})
      .first()

  var store = await knex('products_in_stores')
      .where('id', products_in_stores.ID)
      .select({ID: 'store_id'})
      .first()

  var store = await storeRepository.findStoreById(store.ID)
  return store
}

module.exports =
  class {
    constructor (orderKnex) {
      this.id = orderKnex.id
      this.client = clientRepository.findById(orderKnex.client_id)
      this.products = getOrderProducts(orderKnex.id)
      //this.store = getStoreForOrder(orderKnex.id)
      //this.status_id = orderKnex.status_id
    }
    async store()
    {var store = await getStoreForOrder(this.id)
      return store

    }
  }

  
  