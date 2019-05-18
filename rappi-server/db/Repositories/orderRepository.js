'use strict'
const knex = require('../knex')
const addressRepository = require('../Repositories/addressRepository')
const OrderModel = require('../Models/orderModel')

async function getOrderProducts (orderID){
  let dbOrderProducts = await knex
    .select({ID: 'ProdStor.product_id'},
            {productsInStoresID: 'ProdStor.id'},
            {name: 'Prod.name'},
            {photo: 'Prod.photo'},
            {unitPrice: 'Prod.price'},
            {quantity: 'OrdProd.quantity'}
            )
    .from('products_in_orders AS OrdProd')
    .join('products_in_stores AS ProdStor','OrdProd.products_in_stores_id','ProdStor.id')
    .join('products AS Prod', 'ProdStor.product_id', 'Prod.id')
    .where('order_id', orderID)
  return dbOrderProducts
}

module.exports = {
  createOrder: async (user, cart) => {
    let id = await knex('orders')
      .insert({
        client_id: user.id,
        status_id: 1
      })
      .returning('id')
    id = id[0]
    cart.basket.forEach(product => {
      console.log(product)
      knex('products_in_orders').insert({
        order_id: id,
        products_in_stores_id: product.id_product,
        quantity: product.quantity
      }).then(result => {

      })
    })
  },

  getOrder: async (orderID) =>{
    let dbOrderBasicData = await knex
            .select({ID: 'Ord.id'},
                    {statusId: 'Ord.status_id'},
                    {status: 'OrdStat.status'},
                    {clientID:'Cli.id'},
                    {clientEmail:'Cli.email'},
                    {clientFirstName:'Cli.first_name'},
                    {clientLastName:'Cli.last_name'},
                    {clientAddress:'Cli.address'},
                    {clientAddressDetails:'Cli.address_details'},
                    {clientLatitude:'Cli.latitude'},
                    {clientLongitude:'Cli.longitude'},
                    {delivPersID:'DevPer.id'},
                    {delivPersFirstName:'DevPer.first_name'},
                    {delivPersLastName:'DevPer.last_name'},
                    {delivPersPhoto:'DevPer.photo'},
                    {delivPersPhoneNumber:'DevPer.phone_number'},
                    {storeID:'ProdStor.store_id'},
                    {storeName: 'Store.name'},
                    {storePhoneNumber: 'Store.phone_number'},
                    {storeAddress: 'Store.address'},
                    {storeAddressDetails: 'Store.address_details'},
                    {storeLatitude: 'Store.latitude'},
                    {storeLongitude: 'Store.longitude'}
                    )
            .from('orders AS Ord')
            .join('orders_status AS OrdStat','Ord.status_id','OrdStat.id')
            .join('clients AS Cli','Ord.client_id','Cli.id')
            .leftJoin('delivery_persons AS DevPer','Ord.delivery_person_id','DevPer.id')
            .join('products_in_orders AS OrdProd','OrdProd.order_id','Ord.id')
            .join('products_in_stores AS ProdStor','OrdProd.products_in_stores_id','ProdStor.id')
            .join('stores AS Store','ProdStor.store_id','Store.id')
            .where('Ord.id', orderID)
            .first()
    
    if (!dbOrderBasicData) throw "order not exist"
    let dbOrderProducts = await getOrderProducts(dbOrderBasicData.ID)
    let order = new OrderModel(dbOrderBasicData, dbOrderProducts)
    return order    
  },

  getCloserOrderToLocation : async(lat, long) => {
    let dbOrdersBasicData = await knex
            .select({ID: 'Ord.id'},
                    {statusId: 'Ord.status_id'},
                    {status: 'OrdStat.status'},
                    {clientID:'Cli.id'},
                    {clientEmail:'Cli.email'},
                    {clientFirstName:'Cli.first_name'},
                    {clientLastName:'Cli.last_name'},
                    {clientAddress:'Cli.address'},
                    {clientAddressDetails:'Cli.address_details'},
                    {clientLatitude:'Cli.latitude'},
                    {clientLongitude:'Cli.longitude'},
                    {delivPersID:'DevPer.id'},
                    {delivPersFirstName:'DevPer.first_name'},
                    {delivPersLastName:'DevPer.last_name'},
                    {delivPersPhoto:'DevPer.photo'},
                    {delivPersPhoneNumber:'DevPer.phone_number'},
                    {storeID:'ProdStor.store_id'},
                    {storeName: 'Store.name'},
                    {storePhoneNumber: 'Store.phone_number'},
                    {storeAddress: 'Store.address'},
                    {storeAddressDetails: 'Store.address_details'},
                    {storeLatitude: 'Store.latitude'},
                    {storeLongitude: 'Store.longitude'}
                    )
            .from('orders AS Ord')
            .join('orders_status AS OrdStat','Ord.status_id','OrdStat.id')
            .join('clients AS Cli','Ord.client_id','Cli.id')
            .leftJoin('delivery_persons AS DevPer','Ord.delivery_person_id','DevPer.id')
            .join('products_in_orders AS OrdProd','OrdProd.order_id','Ord.id')
            .join('products_in_stores AS ProdStor','OrdProd.products_in_stores_id','ProdStor.id')
            .join('stores AS Store','ProdStor.store_id','Store.id')
            .where('Ord.status_id', 1)
            .distinct()
    var initialDistance = Infinity
    var closerOrder
    console.log("data")
    console.log(dbOrdersBasicData)
    for (let i = 0; i < dbOrdersBasicData.length; i++) {
      const tempOrder = dbOrdersBasicData[i]
      var distance = await addressRepository.getDistanceFromLatLonInKm(lat,long,tempOrder.storeLatitude,tempOrder.storeLongitude)
      if (distance < initialDistance) {
        closerOrder = tempOrder
        initialDistance = distance
      }
    }
    let dbOrderProducts = await getOrderProducts(closerOrder.ID)
    let order = new OrderModel(closerOrder, dbOrderProducts)
    return order
  }, 

  changeOrderStatus: async (orderID, statusID) =>{
    return knex('orders')
    .where('id',orderID)
    .update(
      {status_id: statusID}
    )
  },

  assignOrderToDeliveryPerson: async (orderID, deliveryPersonID) =>{
    return knex('orders')
    .where('id',orderID)
    .update(
      {delivery_person_id: deliveryPersonID}
    )
    .then(module.exports.changeOrderStatus(orderID,2))
  },

  moveOrderToNextStatus: async (order) => {
    if (order.generalInfo.statusId === 4) {
      return
    }
    else
    {
      let newStatus = (order.generalInfo.statusId + 1)
      await module.exports.changeOrderStatus(order.generalInfo.ID, newStatus)
    }
  }



}