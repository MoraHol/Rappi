// 'use strict'

// const knex = require('../knex')

// module.exports =
//   class {
//     constructor (generalInfo, products) {
//       this.generalInfo = generalInfo
//       this.products = products
//     }

//   getTotalPrice () {
//     let totalPrice = 0
//     for (let i = 0; i < this.products.length; i++) {
//       const product = this.products[i];
//       totalPrice += (product.quantity * product.unitPrice)
//     }
//     return totalPrice
//   }
// }

// module.exports =
//   class {
//     constructor (generalInfo, products) {
//       this.generalInfo = generalInfo
//       this.products = products
//     }

//   getTotalPrice () {
//     let totalPrice = 0
//     for (let i = 0; i < this.products.length; i++) {
//       const product = this.products[i];
//       totalPrice += (product.quantity * product.unitPrice)
//     }
//     return totalPrice
//   }
// }


// changeDeliveryPersonStatus: async (req, res) => {
//     console.log('esta en el router.get admin/deliveryPerson')
//     try {
//       let delivery_persons = await db.deliveryPersonRepository.getDeliveryPersons()
//       console.log(delivery_persons)
//       res.render('pages/admin-deliveryPerson', {
//         delivery_persons: delivery_persons
//       }
//       )
//     } catch (error) {
//       res.redirect('/')
//     }
//   }