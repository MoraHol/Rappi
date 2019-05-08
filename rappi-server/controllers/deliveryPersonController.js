'use strict'
const db = require('../db')
module.exports = {
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
      res.render('pages/form-rt', { user: req.user })
    } else {
      await db.deliveryPersonRepository.findByIdGoogleStrategy(req.user).then((row) => {
        req.session.user = row
      })
      res.redirect('/')
    }
  },

  loginRedirectFacebookStrategy: async (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-rt', { user: req.user })
    } else {
      await db.deliveryPersonRepository.findByIdFacebookStrategy(req.user).then((row) => {
        req.session.user = row
      })
      res.redirect('/')
    }
  },

  setAdditionalDataGoogleStrategy: async (req, res) => {
    req.user.personal_id = req.body.personal_id
    req.user.phone_number = req.body.phone_number
    await db.deliveryPersonRepository.registerAdditionalDataUsingGoogleStrategy(req.user).then()
    await db.deliveryPersonRepository.findByIdGoogleStrategy(req.user).then((rappiTendero) => {
      req.session.user = rappiTendero
    })
    res.redirect('/')
  },

  setAdditionalDataFacebookStrategy: async (req, res) => {
    req.user.personal_id = req.body.personal_id
    req.user.pclientshone_number = req.body.phone_number
    await db.deliveryPersonRepository.registerAdditionalDataUsingFacebookStrategy(req.user).then()
    await db.deliveryPersonRepository.findByIdFacebookStrategy(req.user).then((user) => {
      req.session.user = user
    })
    res.redirect('/')
  }
}
