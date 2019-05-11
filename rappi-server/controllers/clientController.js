'use strict'
const db = require('../db')
module.exports = {
  authenticateByGoogleStrategy: (req, accessToken, refreshToken, profile, done) => {
    db.clientRepository.findByIdGoogleStrategy(profile).then((id) => {
      if (id) {
        req.session.newuser = false
        return done(null, profile)
      } else {
        db.clientRepository.createUsingGoogleStrategy(profile)
          .then(function (id) {
            req.session.newuser = true
            return done(null, profile)
          })
      }
    })
  },

  authenticateByFacebookStrategy: (req, accessToken, refreshToken, profile, done) => {
    db.clientRepository.findByIdFacebookStrategy(profile).then((id) => {
      if (id) {
        req.session.newuser = false
        return done(null, profile)
      } else {
        db.client.createUsingFacebookStrategy(profile)
          .then(function (id) {
            req.session.newuser = true
            return done(null, profile)
          })
      }
    })
  },

  loginRedirectGoogleStrategy: async (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-client', {
        user: req.user
      })
    } else {
      await db.clientRepository.findByIdGoogleStrategy(req.user).then((row) => {
        req.session.user = row
      })
      res.redirect('/stores')
    }
  },

  loginRedirectFacebookStrategy: async (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-client', {
        user: req.user
      })
    } else {
      await db.clientRepository.findByIdFacebookStrategy(req.user).then((row) => {
        req.session.user = row
      })
      res.redirect('/stores')
    }
  },

  setAddressGoogleStrategy: async (req, res) => {
    req.user.address = req.body.address
    req.user.address_details = req.body.address_details
    req.user.latitude = req.body.lat
    req.user.longitude = req.body.lng
    await db.clientRepository.registerAdressUsingGoogleStrategy(req.user).then()
    await db.clientRepository.findByIdGoogleStrategy(req.user).then((user) => {
      req.session.user = user
    })
    res.redirect('/stores')
  },

  setAddressFacebookStrategy: async (req, res) => {
    req.user.address = req.body.address
    req.user.address_details = req.body.address_details
    req.user.latitude = req.body.lat
    req.user.longitude = req.body.lng
    await db.clientRepository.registerAdressUsingFacebookStrategy(req.user).then()
    await db.clientRepository.findByIdFacebookStrategy(req.user).then((user) => {
      req.session.user = user
    })
    res.redirect('/stores')
  }

}