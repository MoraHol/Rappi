'use strict'
const knex = require('../knex')
const addressRepository = require('../Repositories/addressRepository')
const OrderModel = require('../Models/orderModel')

async function getOrderProducts (orderID) {
  let dbOrderProducts = await knex
    .select({
      ID: 'ProdStor.product_id'
    }, {
      productsInStoresID: 'ProdStor.id'
    }, {
      name: 'Prod.name'
    }, {
      photo: 'Prod.photo'
    }, {
      unitPrice: 'Prod.price'
    }, {
      quantity: 'OrdProd.quantity'
    })
    .from('products_in_orders AS OrdProd')
    .join('products_in_stores AS ProdStor', 'OrdProd.products_in_stores_id', 'ProdStor.id')
    .join('products AS Prod', 'ProdStor.product_id', 'Prod.id')
    .where('order_id', orderID)
  return dbOrderProducts
}

module.exports = {
  getOrder: async (orderID) => {
    let dbOrderBasicData = await knex
      .select({
        ID: 'Ord.id'
      }, {
        statusId: 'Ord.status_id'
      }, {
        status: 'OrdStat.status'
      }, {
        clientID: 'Cli.id'
      }, {
        clientEmail: 'Cli.email'
      }, {
        clientFirstName: 'Cli.first_name'
      }, {
        clientLastName: 'Cli.last_name'
      }, {
        clientAddress: 'Cli.address'
      }, {
        clientAddressDetails: 'Cli.address_details'
      }, {
        clientLatitude: 'Cli.latitude'
      }, {
        clientLongitude: 'Cli.longitude'
      }, {
        delivPersID: 'DevPer.id'
      }, {
        delivPersFirstName: 'DevPer.first_name'
      }, {
        delivPersLastName: 'DevPer.last_name'
      }, {
        delivPersPhoto: 'DevPer.photo'
      }, {
        delivPersPhoneNumber: 'DevPer.phone_number'
      }, {
        storeID: 'ProdStor.store_id'
      }, {
        storeName: 'Store.name'
      }, {
        storePhoneNumber: 'Store.phone_number'
      }, {
        storeAddress: 'Store.address'
      }, {
        storeAddressDetails: 'Store.address_details'
      }, {
        storePhoto: 'Store.photo'
      }, {
        storeLatitude: 'Store.latitude'
      }, {
        storeLongitude: 'Store.longitude'
      })
      .from('orders AS Ord')
      .join('orders_status AS OrdStat', 'Ord.status_id', 'OrdStat.id')
      .join('clients AS Cli', 'Ord.client_id', 'Cli.id')
      .leftJoin('delivery_persons AS DevPer', 'Ord.delivery_person_id', 'DevPer.id')
      .join('products_in_orders AS OrdProd', 'OrdProd.order_id', 'Ord.id')
      .join('products_in_stores AS ProdStor', 'OrdProd.products_in_stores_id', 'ProdStor.id')
      .join('stores AS Store', 'ProdStor.store_id', 'Store.id')
      .where('Ord.id', orderID)
      .first()

    if (!dbOrderBasicData) throw new Error('order not exist')
    let dbOrderProducts = await getOrderProducts(dbOrderBasicData.ID)
    let order = new OrderModel(dbOrderBasicData, dbOrderProducts)
    return order
  },

  getCloserOrderToLocation: async (lat, long) => {
    let dbOrdersBasicData = await knex
      .select({
        ID: 'Ord.id'
      }, {
        statusId: 'Ord.status_id'
      }, {
        status: 'OrdStat.status'
      }, {
        clientID: 'Cli.id'
      }, {
        clientEmail: 'Cli.email'
      }, {
        clientFirstName: 'Cli.first_name'
      }, {
        clientLastName: 'Cli.last_name'
      }, {
        clientAddress: 'Cli.address'
      }, {
        clientAddressDetails: 'Cli.address_details'
      }, {
        clientLatitude: 'Cli.latitude'
      }, {
        clientLongitude: 'Cli.longitude'
      }, {
        delivPersID: 'DevPer.id'
      }, {
        delivPersFirstName: 'DevPer.first_name'
      }, {
        delivPersLastName: 'DevPer.last_name'
      }, {
        delivPersPhoto: 'DevPer.photo'
      }, {
        delivPersPhoneNumber: 'DevPer.phone_number'
      }, {
        storeID: 'ProdStor.store_id'
      }, {
        storeName: 'Store.name'
      }, {
        storePhoneNumber: 'Store.phone_number'
      }, {
        storeAddress: 'Store.address'
      }, {
        storeAddressDetails: 'Store.address_details'
      }, {
        storePhoto: 'Store.photo'
      }, {
        storeLatitude: 'Store.latitude'
      }, {
        storeLongitude: 'Store.longitude'
      })
      .from('orders AS Ord')
      .join('orders_status AS OrdStat', 'Ord.status_id', 'OrdStat.id')
      .join('clients AS Cli', 'Ord.client_id', 'Cli.id')
      .leftJoin('delivery_persons AS DevPer', 'Ord.delivery_person_id', 'DevPer.id')
      .join('products_in_orders AS OrdProd', 'OrdProd.order_id', 'Ord.id')
      .join('products_in_stores AS ProdStor', 'OrdProd.products_in_stores_id', 'ProdStor.id')
      .join('stores AS Store', 'ProdStor.store_id', 'Store.id')
      .where('Ord.status_id', 1)
      .distinct()
    var initialDistance = Infinity
    var closerOrder
    for (let i = 0; i < dbOrdersBasicData.length; i++) {
      const tempOrder = dbOrdersBasicData[i]
      var distance = await addressRepository.getDistanceFromLatLonInKm(lat, long, tempOrder.storeLatitude, tempOrder.storeLongitude)
      if (distance < initialDistance) {
        closerOrder = tempOrder
        initialDistance = distance
      }
    }
    let dbOrderProducts = await getOrderProducts(closerOrder.ID)
    let order = new OrderModel(closerOrder, dbOrderProducts)
    return order
  },

  changeOrderStatus: async (orderID, statusID) => {
    return knex('orders')
      .where('id', orderID)
      .update({
        status_id: statusID
      })
  },

  assignOrderToDeliveryPerson: async (orderID, deliveryPersonID) => {
    return knex('orders')
      .where('id', orderID)
      .update({
        delivery_person_id: deliveryPersonID
      })
      .then(module.exports.changeOrderStatus(orderID, 2))
  },

  moveOrderToNextStatus: async (order) => {
    if (order.generalInfo.statusId === 4) {

    } else {
      let newStatus = (order.generalInfo.statusId + 1)
      await module.exports.changeOrderStatus(order.generalInfo.ID, newStatus)
    }
  },
  UserActiveOrders: async (userId) => {
    const query = await knex('orders').select('id').where({
      client_id: userId
    }).andWhereRaw('status_id <> 4')
    if (query.length > 0) {
      return true
    }
    return false
  },
  findOrderIdActiveUser: async (userId) => {
    const query = await knex('orders').select('id').where({
      client_id: userId
    }).andWhereRaw('status_id <> 4').first()
    return query.id
  }

}
