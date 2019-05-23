'use strict'
const db = require('../db')
module.exports = {

  getIndexPage: async (req, res) => {
    if (req.session.rappiTendero) {
      if (req.session.rappiTendero.is_valid_for_work === true) {
        res.render('pages/rt-page', { user: req.session.rappiTendero })
      } else {
        res.render('pages/login-rt', { message: 'Usted no esta habilitado para trabajar, por favor acerquese a una de nuestras oficinas a validar sus datos' })
      }
    } else {
      res.render('pages/login-rt')
    }
  },

  changeDeliveryPersonStatus: async (req, res) => {
    let id = JSON.parse(req.body.id)
    try {
      await db.deliveryPersonRepository.changeDeliveryPersonStatus(id)// cambiar el 1 por el id que traigo desde el html en el post que se evia

      let delivery_persons = await db.deliveryPersonRepository.getDeliveryPersons()
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

  logout: (req, res) => {
    req.session.regenerate((err) => {
      if (err) throw err
      res.json({
        sucess: true
      })
    })
  }
}
