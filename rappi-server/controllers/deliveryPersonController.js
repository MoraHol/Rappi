'use strict'
const db = require('../db')
module.exports = {


  testorder: async (req, res) =>{
    var lat =  4.7007205
    var long = -74.0358761
    
    //let test =  await db.orderRepository.getCloserOrderToLocation(lat,long)
    
    //await db.orderRepository.assignOrderToDeliveryPerson(1,1)
    
    let test =  await db.orderRepository.getOrder(1)
    await db.orderRepository.moveOrderToNextStatus(test)
    test =  await db.orderRepository.getOrder(1)
    res.json(test)
  },

  changeDeliveryPersonStatus: async (req, res) => {
    let id = JSON.parse(req.body.id)
    // console.log('esta en el controller de deliveryPerson Controller en ChangeDeliveryPersonStatus')
    // console.log(id)
    try {
      // console.log('entro al try del changedeliverypersonstats contrller de deliverypersoncontroller')
      await db.deliveryPersonRepository.changeDeliveryPersonStatus(id)//cambiar el 1 por el id que traigo desde el html en el post que se evia
      // console.log('ya hizo el update')

      let delivery_persons = await db.deliveryPersonRepository.getDeliveryPersons()
      // console.log(delivery_persons)
      res.render('pages/admin-deliveryPerson', {
        delivery_persons: delivery_persons
      }
      )
    } catch (error) {
      res.redirect('/')
    }
  },

  authenticateByGoogleStrategy: (req, accessToken, refreshToken, profile, done) => {
    db.deliveryPersonRepository.findByIdGoogleStrategy(profile).then((id) => {
      if (id) {
        req.session.newuser = false
        return done(null, profile)
      } else {
        db.deliveryPersonRepository.createUsingGoogleStrategy(profile).then((id) => {
          req.session.newuser = true
          return done(null, profile)
        })
      }
    })
  },

  authenticateByFacebookStrategy: (req, accessToken, refreshToken, profile, done) => {
    db.deliveryPersonRepository.findByIdFacebookStrategy(profile).then((id) => {
      if (id) {
        req.session.newuser = false
        return done(null, profile)
      } else {
        db.deliveryPersonRepository.createUsingFacebookStrategy(profile).then((id) => {
          req.session.newuser = true
          return done(null, profile)
        })
      }
    })
  },

  loginRedirectGoogleStrategy: async (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-rt', {
        user: req.user
      })
    } else {
      await db.deliveryPersonRepository.findByIdGoogleStrategy(req.user).then((row) => {
        req.session.rappiTendero = row
      })
      res.redirect('/soyrappi')
    }
  },

  loginRedirectFacebookStrategy: async (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-rt', {
        user: req.user
      })
    } else {
      await db.deliveryPersonRepository.findByIdFacebookStrategy(req.user).then((row) => {
        req.session.rappiTendero = row
      })
      res.redirect('/soyrappi')
    }
  },

  setAdditionalDataGoogleStrategy: async (req, res) => {
    req.user.personal_id = req.body.personal_id
    req.user.phone_number = req.body.phone_number
    await db.deliveryPersonRepository.registerAdditionalDataUsingGoogleStrategy(req.user).then()
    await db.deliveryPersonRepository.findByIdGoogleStrategy(req.user).then((rappiTendero) => {
      req.session.rappiTendero = rappiTendero
    })
    res.redirect('/soyrappi')
  },

  setAdditionalDataFacebookStrategy: async (req, res) => {
    req.user.personal_id = req.body.personal_id
    req.user.pclientshone_number = req.body.phone_number
    await db.deliveryPersonRepository.registerAdditionalDataUsingFacebookStrategy(req.user).then()
    await db.deliveryPersonRepository.findByIdFacebookStrategy(req.user).then((user) => {
      req.session.rappiTendero = user
    })
    res.redirect('/soyrappi')
  },
  getIndexPage: (req, res) => {
    if (req.session.rappiTendero) {
      res.render('pages/rt-page', {
        user: req.session.rappiTendero
      })
    } else {
      res.render('pages/login-rt')
    }
  },
  logout: (req, res) => {
    req.session.regenerate((err) => {
      if (err) throw err
      res.json({
        sucess: true
      })
    })
  }
}